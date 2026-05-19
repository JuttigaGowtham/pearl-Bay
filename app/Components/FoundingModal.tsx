"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaSpinner, FaCheckCircle, FaHotel } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface FoundingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function FoundingModal({ isOpen, onClose }: FoundingModalProps) {
    const router = useRouter();
    const [step, setStep] = useState<"form" | "submitting" | "pending" | "approved">("form");
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
    });
    const [requestId, setRequestId] = useState<string | null>(null);
    const [error, setError] = useState("");

    // Polling Effect
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (step === "pending" && requestId) {
            interval = setInterval(async () => {
                try {
                    const res = await fetch(`/api/founding-member/status?id=${requestId}`);
                    const data = await res.json();
                    if (data.status === "approved") {
                        setStep("approved");
                        localStorage.setItem("foundingMemberApproved", "true");
                        clearInterval(interval);
                        // Stay on approved state
                    } else if (data.status === "rejected") {
                        setError("Your application has been declined.");
                        setStep("form"); // Or a rejected state
                    }
                } catch (err) {
                    console.error("Polling error", err);
                }
            }, 3000);
        }

        return () => clearInterval(interval);
    }, [step, requestId, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setStep("submitting");

        try {
            const res = await fetch("/api/founding-member/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Submission failed");
            }

            // Immediate redirect as per user request (removed)
            localStorage.setItem("foundingMemberApproved", "true");
            setStep("approved");

            // Stay on approved screen

        } catch (err: any) {
            setError(err.message);
            setStep("form");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-md bg-[#1a1a1a] border border-[#bfa87c]/30 rounded-2xl p-8 shadow-2xl overflow-hidden"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/50 hover:text-white transition"
                >
                    <FaTimes />
                </button>

                <AnimatePresence mode="wait">

                    {step === "form" && (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h2 className="text-2xl font-[cursive] text-[#bfa87c] mb-2">Join as Founding Member</h2>
                            <p className="text-white/60 text-sm mb-6">Fill in your details to request exclusive access.</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-white/70 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#bfa87c] focus:outline-none transition"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-white/70 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#bfa87c] focus:outline-none transition"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-white/70 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#bfa87c] focus:outline-none transition"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>

                                {error && <p className="text-red-400 text-xs">{error}</p>}

                                <button
                                    type="submit"
                                    className="w-full bg-[#bfa87c] text-black font-medium py-3 rounded-lg hover:bg-[#a38b60] transition mt-2"
                                >
                                    Submit Request
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {step === "submitting" && (
                        <motion.div
                            key="submitting"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-10"
                        >
                            <FaSpinner className="text-4xl text-[#bfa87c] animate-spin mb-4" />
                            <p className="text-white/70">Processing request...</p>
                        </motion.div>
                    )}

                    {step === "pending" && (
                        <motion.div
                            key="pending"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-6"
                        >
                            <div className="w-16 h-16 bg-[#bfa87c]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaSpinner className="text-3xl text-[#bfa87c] animate-spin" />
                            </div>
                            <h3 className="text-xl text-white font-medium mb-2">Request Sent</h3>
                            <p className="text-white/60 text-sm max-w-xs mx-auto mb-6">
                                Your request has been sent to the admin dashboard. Please wait while we verify your details.
                            </p>
                            <div className="text-xs text-[#bfa87c] py-2 px-4 bg-[#bfa87c]/10 rounded-full inline-block animate-pulse">
                                Waiting for admin approval...
                            </div>
                        </motion.div>
                    )}

                    {step === "approved" && (
                        <motion.div
                            key="approved"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-6"
                        >
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaCheckCircle className="text-3xl text-green-500" />
                            </div>
                            <h3 className="text-xl text-white font-medium mb-2">Approved!</h3>
                            <p className="text-white/60 text-sm max-w-xs mx-auto mb-6">
                                Welcome to Pearl Bay. You are now a Founding Member.
                            </p>
                        </motion.div>
                    )}

                </AnimatePresence>
            </motion.div>
        </div>
    );
}
