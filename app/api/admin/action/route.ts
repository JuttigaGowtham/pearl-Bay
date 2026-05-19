import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
    const { userId, action } = await request.json();

    /* ================= ENV CHECK ================= */
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    if (!userId || !action) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    /* ================= ADMIN CLIENT ================= */
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });

    try {
        if (action === "approve") {
            const { error } = await supabaseAdmin
                .from("profiles")
                .update({ is_approved: true })
                .eq("id", userId);

            if (error) throw error;
            return NextResponse.json({ success: true, message: "User approved" });
        }

        if (action === "reject") {
            // 1. Delete from profiles
            await supabaseAdmin.from("profiles").delete().eq("id", userId);

            // 2. Delete from Auth Users
            const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

            if (error) throw error;
            return NextResponse.json({ success: true, message: "User rejected and deleted" });
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });

    } catch (error: any) {
        console.error("Admin Action Error:", error);
        return NextResponse.json({
            error: error.message || "Action failed"
        }, { status: 500 });
    }
}
