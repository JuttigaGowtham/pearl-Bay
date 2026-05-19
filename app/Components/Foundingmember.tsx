"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FoundingModal from "./FoundingModal";

export default function FoundingMember() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   if (localStorage.getItem("foundingMemberApproved") === "true") {
  //     router.push("/hotel-details");
  //   }
  // }, [router]);

  return (
    <section className="w-full bg-white text-black">

      <FoundingModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* ================= FULLSCREEN VIDEO ================= */}
      <div className="relative h-[70vh] md:h-screen w-full overflow-hidden">
        <video
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Text on video */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute bottom-10 right-6 md:bottom-16 md:right-16 text-right"
        >
          <h1 className="text-3xl md:text-6xl font-[cursive] tracking-widest text-white">
            JOIN AS
          </h1>
          <h2 className="text-4xl md:text-7xl font-[cursive] text-[#bfa87c]">
            FOUNDING MEMBER
          </h2>
        </motion.div>
      </div>

      {/* ================= DESCRIPTION SECTION ================= */}
      <section className="py-20 md:py-32 px-6 flex justify-center bg-white">
        <div className="max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-[cursive] mb-6 md:mb-8 text-[#bfa87c]"
          >
            Become a Founding Member
          </motion.h2>

          <p className="text-neutral-600 text-sm md:text-lg leading-relaxed">
            Our founding membership is intentionally limited to a select few who
            believe in long-term value, early access, and lasting recognition.
            This is a one-time opportunity to be part of the foundation —
            membership will never be offered again under these terms.
          </p>
        </div>
      </section>

      {/* ================= MEMBERSHIP CARD ================= */}
      <section className="pb-20 md:pb-40 px-6 flex justify-center bg-white">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="
            max-w-3xl w-full
            rounded-3xl
            border border-[#bfa87c]/40
            bg-neutral-50 backdrop-blur-xl
            p-8 md:p-16
            shadow-[0_0_80px_#bfa87c22]
          "
        >
          <h3 className="text-2xl md:text-5xl font-[cursive] text-center mb-8 md:mb-10 text-[#bfa87c]">
            Founding Membership
          </h3>

          {/* Benefits */}
          <ul className="space-y-6 mb-10 md:mb-12">
            {benefits.map((item, index) => (
              <li
                key={index}
                className="border-l-2 border-[#bfa87c] pl-4 md:pl-6"
              >
                <h4 className="text-base md:text-lg text-[#bfa87c] mb-1">
                  {item.title}
                </h4>
                <p className="text-neutral-600 text-xs md:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </li>
            ))}
          </ul>

          {/* Price */}
          <div className="text-center mb-8 md:mb-10">
            <p className="text-xs md:text-sm tracking-widest text-neutral-400 mb-2">
              LIFETIME ACCESS
            </p>
            <p className="text-3xl md:text-5xl text-[#bfa87c] font-light">
              $25,000
            </p>
          </div>

          {/* CTA */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="
                px-8 py-3 md:px-10 md:py-4 rounded-full
                bg-[#bfa87c] text-white
                tracking-widest text-xs md:text-sm font-medium
                hover:scale-105 transition-transform
                w-full md:w-auto
              "
            >
              JOIN AS FOUNDING MEMBER FOR PEARL BAY
            </button>
          </div>
        </motion.div>
      </section>
    </section>
  );
}

/* ================= DATA ================= */

const benefits = [
  {
    title: "Exclusive Lifetime Access",
    desc: "Permanent access to all premium features, future launches, and member-only services.",
  },
  {
    title: "Priority Invitations",
    desc: "Early access to private events, experiences, and confidential announcements.",
  },
  {
    title: "Founding Recognition",
    desc: "Your name will be permanently recognized as a founding member.",
  },
  {
    title: "White-Glove Support",
    desc: "Priority assistance with a dedicated support channel.",
  },
];
