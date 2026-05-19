"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function MembershipPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">

      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-[55%] md:w-[35%] bg-gradient-to-b from-[#b5a27a22] to-transparent blur-3xl opacity-40" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 md:px-12 py-24 md:py-32 text-center">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="
            text-4xl sm:text-5xl md:text-8xl
            font-[cursive]
            tracking-[0.12em] md:tracking-[0.18em]
            mb-10 md:mb-12
            text-black
          "
        >
          FOUNDING <br className="sm:hidden" />
          <span className="text-[#b5a27a]">MEMBERSHIP</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="
            text-base sm:text-lg md:text-2xl
            font-light text-neutral-600
            mb-14 md:mb-20
            leading-relaxed md:leading-loose
            tracking-wide
            font-[cursive]
          "
        >
          The private circle of the world’s most exclusive addresses.
          <br />
          First refusal on sold-out dates. Direct access to off-market residences.
          <br />
          One membership. One lifetime of privilege.
        </motion.p>

        {/* Price Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-16 md:mb-20"
        >
          <p className="text-4xl sm:text-5xl md:text-7xl font-thin tracking-[0.1em] text-[#b5a27a]">
            $25,000
          </p>
          <p className="text-sm sm:text-base tracking-widest text-neutral-500 mt-3">
            per year · founding rate
          </p>
          <p className="text-[10px] sm:text-xs tracking-widest text-neutral-400 mt-4">
            Limited to 75 founding members · price increases at 50
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          whileHover={{ scale: 1.03 }}
          onClick={() => router.push("/Foundingmember")}
          className="
            w-full sm:w-auto
            px-10 sm:px-16
            py-5 sm:py-6
            text-sm sm:text-lg
            tracking-widest
            border border-[#b5a27a]
            text-[#b5a27a]
            hover:bg-[#b5a27a]
            hover:text-white
            transition-all duration-300
          "
        >
          JOIN AS FOUNDING MEMBER →
        </motion.button>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-[10px] sm:text-xs tracking-widest mt-10 sm:mt-12 text-black"
        >
          Billed annually · cancel anytime · private & secure
        </motion.p>

      </div>
    </div>
  );
}
