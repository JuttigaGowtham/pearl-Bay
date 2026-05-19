import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
    const body = await request.json();
    const { fullName, email, phone } = body;

    if (!fullName || !email) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
    });

    try {
        const { data, error } = await supabaseAdmin
            .from("founding_requests")
            .insert([
                { full_name: fullName, email, phone, status: "pending" }
            ])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ success: true, id: data.id });
    } catch (error: any) {
        console.error("Submit Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
