"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export default function Wellbeing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [imgY, setImgY] = useState(0);

  /* ================= PAGE SCROLL ================= */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Sidebar animation */
  const sideY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const sideOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.8, 1],
    [0, 1, 1, 0]
  );

  /* Description reveal */
  const descOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const descY = useTransform(scrollYProgress, [0.3, 0.6], [40, 0]);

  /* Parallax */
  const heroParallaxY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const detailParallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textParallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  /* Image scroll (desktop only) */
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!hovered || window.innerWidth < 768) return;
    e.preventDefault();

    setImgY((prev) => {
      const next = prev - e.deltaY * 0.35;
      return Math.max(Math.min(next, 0), -220);
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-white text-[#7b6a5a] overflow-hidden"
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
      <div className="lg:ml-[230px] px-6 sm:px-10 lg:pr-20 pt-24 lg:pt-32">
        {/* Heading */}
        <motion.div style={{ y: textParallaxY }} className="mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-[cursive] mb-2">
            Wellbeing
          </h1>
          <p className="text-xs sm:text-sm tracking-[3px] uppercase text-[#b5a27a] font-[cursive]">
            Me Time in Style
          </p>
        </motion.div>

        {/* IMAGE + DESCRIPTION */}
        <div className="relative max-w-[1050px] mx-auto lg:ml-auto">
          {/* ================= HERO IMAGE ================= */}
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
              setHovered(false);
              setImgY(0);
            }}
            onWheel={handleWheel}
            className="h-[320px] sm:h-[420px] lg:h-[520px] overflow-hidden mb-16 lg:mb-24"
          >
            <motion.img
              src="/wellbeing.jpg"
              alt="Wellbeing"
              animate={{ y: imgY }}
              style={{ y: heroParallaxY }}
              transition={{ ease: "easeOut", duration: 0.35 }}
              className="w-full h-[520px] sm:h-[640px] lg:h-[760px] object-cover"
            />
          </div>

          {/* ================= DESCRIPTION ================= */}
          <motion.div
            style={{ opacity: descOpacity, y: descY }}
            className="
              grid grid-cols-1
              lg:grid-cols-[1fr_260px]
              gap-10 lg:gap-16
              items-start
            "
          >
            {/* TEXT */}
            <motion.div
              style={{ y: textParallaxY }}
              className="text-base sm:text-lg lg:text-2xl leading-relaxed font-[cursive]"
            >
              <p className="mb-5">
                Designed to promote rejuvenation, relaxation, and holistic health
                in the most soothing of settings, Pearl Bay’s wellness experiences
                are crafted with care, intention, and timeless elegance.
              </p>

              <p className="mb-5">
                From restorative therapies to serene spaces that invite stillness,
                wellbeing here is about living beautifully and slowly.
              </p>

              <p className="mb-5">
                Each moment is designed to reconnect mind, body, and spirit.
              </p>

              <p>
                Wellness at Pearl Bay is not an activity — it is a way of being.
              </p>
            </motion.div>

            {/* DETAIL IMAGE (STACKS BELOW ON MOBILE) */}
            <motion.div
              style={{ y: detailParallaxY }}
              className="w-full sm:w-[280px] h-[220px] sm:h-[270px] overflow-hidden"
            >
              <img
                src="/wellbeing.jpg"
                alt="Wellbeing detail"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
