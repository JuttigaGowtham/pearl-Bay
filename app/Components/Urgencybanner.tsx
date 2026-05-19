"use client";

import { motion } from "framer-motion";

export default function UrgencyBanner() {
  return (
    <section className="w-full min-h-[65vh] flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="
          relative max-w-4xl w-full mx-6
          rounded-3xl px-12 py-16
          bg-white/80 backdrop-blur-2xl
          border border-[#bfa87c]/40
          shadow-[0_0_80px_#bfa87c22]
          text-center
        "
      >
        {/* Gold ambient glow */}
        <span className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-[#bfa87c1a] to-transparent pointer-events-none" />

        {/* Small label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs tracking-[0.35em] text-[#bfa87c] mb-6"
        >
          FOUNDING MEMBER ACCESS
        </motion.p>

        {/* Main headline */}
        <h2 className="text-3xl md:text-5xl font-light tracking-wide text-black mb-6">
          Only <span className="text-[#bfa87c]">11 Seats</span> Remaining
        </h2>

        {/* Divider */}
        <div className="w-20 h-px bg-[#bfa87c]/40 mx-auto mb-6" />

        {/* Supporting text */}
        <p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
          Our founding membership is intentionally limited to preserve quality,
          access, and long-term value. Once we reach
          <span className="text-[#bfa87c]"> 50 founding members</span>, pricing
          will permanently increase and early privileges will be locked.
        </p>

        {/* Footer emphasis */}
        <p className="mt-10 text-xs tracking-[0.3em] text-neutral-400">
          THIS OPPORTUNITY WILL NOT REOPEN
        </p>
      </motion.div>
    </section>
  );
}
