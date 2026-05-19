"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function DebugEnvPage() {
    const [status, setStatus] = useState("Checking...");
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (msg: string) => setLogs((prev) => [...prev, msg]);

    useEffect(() => {
        checkEnv();
    }, []);

    const checkEnv = async () => {
        try {
            addLog("--- 1. Checking Environment Variables ---");
            const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

            if (!url) addLog("❌ NEXT_PUBLIC_SUPABASE_URL is MISSING");
            else addLog(`✅ NEXT_PUBLIC_SUPABASE_URL found: ${url.substring(0, 15)}...`);

            if (!key) addLog("❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is MISSING");
            else addLog(`✅ NEXT_PUBLIC_SUPABASE_ANON_KEY found: ${key.substring(0, 10)}... (Length: ${key.length})`);

            if (!url || !key) {
                setStatus("FAILED: Missing Keys");
                return;
            }

            addLog("--- 2. Testing Connection ---");
            const supabase = createClient(url, key);

            // Test Auth Endpoint (simplest test)
            const { data, error } = await supabase.auth.getSession();

            if (error) {
                addLog(`❌ Auth Connection Failed: ${error.message}`);
                addLog(`Technical Detail: ${JSON.stringify(error)}`);
                // 401 here confirms the Key is invalid for this URL
            } else {
                addLog("✅ Auth Connection Successful (Supabase is reachable)");
            }

            addLog("--- 3. Testing Database Table (profiles) ---");
            const { error: dbError } = await supabase.from('profiles').select('count', { count: 'exact', head: true });

            if (dbError) {
                addLog(`❌ Transaction Error: ${dbError.message}`);
                addLog(`Hint: If code is '42P01', user forgot to run SQL.`);
            } else {
                addLog("✅ 'profiles' table exists and is readable.");
            }

            setStatus("Complete");

        } catch (err: any) {
            addLog(`CRITICAL EXCEPTION: ${err.message}`);
            setStatus("Crashed");
        }
    };

    return (
        <div className="p-10 bg-black text-white min-h-screen font-mono text-sm whitespace-pre-wrap">
            <h1 className="text-xl text-[#bfa87c] mb-4">Supabase Connection Debugger</h1>
            <div className="border border-gray-700 p-4 rounded bg-gray-900">
                {logs.map((L, i) => <div key={i} className="mb-1 border-b border-gray-800 pb-1">{L}</div>)}
            </div>
            <div className="mt-4 text-lg font-bold">Status: {status}</div>
        </div>
    );
}
