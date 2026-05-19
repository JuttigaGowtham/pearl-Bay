import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  /* ================= ENV CHECK ================= */
  if (!supabaseUrl || !serviceRoleKey) {
    console.error("❌ Missing Supabase environment variables");
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    );
  }

  /* ================= DEBUG ================= */
  const projectId = supabaseUrl.split("//")[1]?.split(".")[0];
  console.log("✅ Supabase Project:", projectId);
  console.log("🔑 Service Role Key:", serviceRoleKey.slice(0, 10) + "...");

  /* ================= ADMIN CLIENT ================= */
  const supabaseAdmin = createClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  /* ================= QUERY ================= */
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ Supabase Admin Error:", error);
    return NextResponse.json(
      {
        error: "Database query failed",
        message: error.message,
      },
      { status: 500 }
    );
  }

  /* ================= SUCCESS ================= */
  return NextResponse.json({
    success: true,
    count: data.length,
    users: data,
  });
}
