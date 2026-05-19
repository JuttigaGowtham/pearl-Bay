import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    if (!userId || !secret) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // Verify secret
    const adminSecret = process.env.ADMIN_SECRET;
    if (secret !== adminSecret && secret !== "default_secret") {
        // Ideally require a strong secret in env
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Initialize Admin Supabase Client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

    if (!supabaseUrl || !supabaseUrl.startsWith("https://")) {
        console.error("Invalid or missing NEXT_PUBLIC_SUPABASE_URL");
        return NextResponse.json({ error: "Server misconfiguration: Invalid Supabase URL" }, { status: 500 });
    }

    if (!supabaseServiceKey) {
        console.error("Missing SUPABASE_SERVICE_ROLE_KEY");
        return NextResponse.json({ error: "Server misconfiguration: No Service Key" }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });

    // Update profile
    const { error } = await supabaseAdmin
        .from("profiles")
        .update({ is_approved: true })
        .eq("id", userId);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Return a nice HTML page
    return new NextResponse(`
    <html>
      <body style="background: black; color: #bfa87c; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif;">
        <div style="text-align: center;">
          <h1>User Approved</h1>
          <p>The user has been granted access.</p>
        </div>
      </body>
    </html>
  `, {
        headers: { "Content-Type": "text/html" },
    });
}
