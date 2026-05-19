"use client";

import { motion } from "framer-motion";

export default function Waitlist() {
  return (
    <div className="min-h-screen bg-white text-black px-6 sm:px-8 pt-28 pb-20 flex flex-col items-center overflow-x-hidden">

      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl w-full text-center mb-14 sm:mb-20"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-thin tracking-widest mb-8">
          JOIN WAITLIST
        </h1>

        <p className="text-base sm:text-lg md:text-2xl font-light text-neutral-600 leading-relaxed">
          Access is exclusive. Submit your inquiry for personalized
          recommendations and priority booking assistance.
        </p>
      </motion.div>

      {/* ================= FORM CONTAINER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="w-full max-w-4xl rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-50 backdrop-blur-sm"
      >
        {/* 🔗 Replace with your actual Google Form embed URL */}
        <iframe
          src="https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform?embedded=true"
          className="w-full h-[900px] sm:h-[950px] md:h-[1000px]"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
        >
          Loading…
        </iframe>
      </motion.div>

    </div>
  );
}
