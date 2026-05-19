"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export default function SuitesPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [imgY, setImgY] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sideY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const sideOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.8, 1],
    [0, 1, 1, 0]
  );

  const descOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const descY = useTransform(scrollYProgress, [0.3, 0.6], [40, 0]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!hovered) return;
    e.preventDefault();

    setImgY((prev) => {
      const next = prev - e.deltaY * 0.35;
      return Math.max(Math.min(next, 0), -220);
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[160vh] bg-white text-[#7b6a5a] overflow-x-hidden"
    >
      {/* ================= LEFT SIDEBAR (DESKTOP ONLY) ================= */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: sideY, opacity: sideOpacity }}
        className="
          hidden lg:flex
          fixed left-0 top-[80px]
          h-[calc(100vh-80px)]
          w-[200px]
          bg-[#efebe5]
          z-10
          items-start justify-center
          pt-20
        "
      >
        <span className="text-[#8c7a66] text-lg tracking-wide lowercase font-[cursive]">
          guest services
        </span>
      </motion.div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="lg:ml-[230px] px-6 lg:px-0 pt-28 lg:pt-32 lg:pr-20">
        {/* Heading */}
        <div className="mb-12 lg:mb-16">
          <h1 className="text-4xl lg:text-5xl font-[cursive] mb-3">
            Suites
          </h1>
          <p className="text-xs lg:text-sm tracking-[3px] uppercase text-[#b5a27a] font-[cursive]">
            Me Time in Style
          </p>
        </div>

        {/* IMAGE + DESCRIPTION */}
        <div className="relative max-w-[1050px] ml-auto">
          {/* IMAGE */}
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
              setHovered(false);
              setImgY(0);
            }}
            onWheel={handleWheel}
            className="h-[320px] sm:h-[420px] lg:h-[520px] overflow-hidden cursor-grab mb-16 lg:mb-24"
          >
            <motion.img
              src="/suite.jpg"
              alt="Suite"
              animate={{ y: imgY }}
              transition={{ ease: "easeOut", duration: 0.35 }}
              className="w-full h-[520px] sm:h-[620px] lg:h-[760px] object-cover"
            />
          </div>

          {/* DESCRIPTION */}
          <motion.div
            style={{ opacity: descOpacity, y: descY }}
            className="
              grid grid-cols-1 lg:grid-cols-[1fr_260px]
              gap-10 lg:gap-16
              items-start
            "
          >
            <div className="max-w-xl text-lg lg:text-2xl leading-relaxed font-[cursive]">
              <p className="mb-6">
                Suites at Pearl Bay are designed as private sanctuaries,
                balancing spacious comfort with refined elegance and
                thoughtful detail.
              </p>

              <p className="mb-6">
                Natural textures, calming tones, and seamless indoor-outdoor
                flow create an atmosphere of quiet luxury.
              </p>

              <p className="mb-6">
                Every suite invites guests to slow down, unwind, and live
                beautifully in complete privacy.
              </p>
            </div>

            {/* SIDE IMAGE */}
            <div className="w-full sm:w-[280px] h-[200px] sm:h-[240px] lg:h-[270px] overflow-hidden">
              <img
                src="/suite.jpg"
                alt="Suite detail"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
