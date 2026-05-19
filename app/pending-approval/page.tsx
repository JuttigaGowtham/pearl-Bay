"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { FaClock, FaCheckCircle, FaSignOutAlt, FaPaperPlane } from "react-icons/fa";

export default function PendingApproval() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [emailSending, setEmailSending] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    // Check if user is already approved (in case they reload)
    // Auto-poll status every 3 seconds
    useEffect(() => {
        checkStatus();
        const interval = setInterval(() => {
            checkStatus(true); // true = background check (no spinner)
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const checkStatus = async (isBackground = false) => {
        if (!supabase) return;
        if (!isBackground) setLoading(true);

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            router.push("/signin");
            return;
        }

        const { data: profile } = await supabase
            .from("profiles")
            .select("is_approved")
            .eq("id", session.user.id)
            .single();

        if (profile?.is_approved) {
            router.push("/book-now");
        } else {
            if (!isBackground) setLoading(false);
        }
    };

    const handleResendEmail = async () => {
        if (!supabase) return;
        setEmailSending(true);
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
            try {
                const res = await fetch('/api/notify-admin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: session.user.email,
                        userId: session.user.id
                    })
                });

                if (res.ok) {
                    setEmailSent(true);
                    setTimeout(() => setEmailSent(false), 5000); // Reset after 5s
                } else {
                    const data = await res.json();
                    console.error("Failed to send email:", data.error || "Unknown error");
                }
            } catch (err) {
                console.error("Error sending email:", err);
            }
        }
        setEmailSending(false);
    };

    const handleSignOut = async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-md"
            >
                <div className="mb-6 flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-[#bfa87c]/20 flex items-center justify-center border-2 border-[#bfa87c]">
                        <FaClock className="text-4xl text-[#bfa87c]" />
                    </div>
                </div>

                <h1 className="text-3xl font-serif mb-4 text-[#bfa87c]">Approval Pending</h1>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    Your account has been created and is currently awaiting administrator approval.
                    You will receive an email once your access is confirmed.
                </p>

                <div className="space-y-4">
                    <button
                        onClick={() => checkStatus(false)}
                        disabled={loading}
                        className="w-full py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition flex items-center justify-center gap-2"
                    >
                        {loading ? "Checking..." : "Check Status Now"}
                    </button>

                    <button
                        onClick={handleResendEmail}
                        disabled={emailSending || emailSent}
                        className="w-full py-3 rounded-full bg-[#bfa87c]/20 text-[#bfa87c] font-bold border border-[#bfa87c] hover:bg-[#bfa87c] hover:text-black transition flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {emailSending ? "Sending..." : emailSent ? "Request Sent!" : (
                            <>
                                <FaPaperPlane /> Resend Approval Request
                            </>
                        )}
                    </button>

                    <button
                        onClick={handleSignOut}
                        className="w-full py-3 rounded-full border border-white/20 text-gray-400 hover:text-white hover:border-white transition flex items-center justify-center gap-2"
                    >
                        <FaSignOutAlt /> Sign Out
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
