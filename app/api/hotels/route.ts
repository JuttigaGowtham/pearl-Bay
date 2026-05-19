import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data, error } = await supabaseAdmin
        .from("hotels")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ hotels: data });
}

export async function POST(request: Request) {
    const { name, location, price, description, image_url, website_url } = await request.json();

    if (!name || !location || !price || !description || !image_url) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
    });

    // Generate simple slug
    const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

    const { data, error } = await supabaseAdmin
        .from("hotels")
        .insert([{ name, location, price, description, image_url, website_url, slug }])
        .select()
        .single();

    if (error) {
        console.error("Supabase POST Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, hotel: data });
}

export async function PUT(request: Request) {
    const { id, name, location, price, description, image_url, website_url } = await request.json();

    if (!id || !name || !location || !price || !description) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
    });

    // Update slug if name changes
    const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

    // Update object
    const updates: any = { name, location, price, description, website_url, slug };
    if (image_url) updates.image_url = image_url;

    const { data, error } = await supabaseAdmin
        .from("hotels")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("Supabase PUT Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, hotel: data });
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "Missing hotel ID" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
    });

    const { error } = await supabaseAdmin
        .from("hotels")
        .delete()
        .eq("id", id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
