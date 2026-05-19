"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Services() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const cards = [
    { title: "WELLBEING", img: "/wellbeing.jpg", link: "/Wellbeing" },
    { title: "POOL", img: "/pool.jpg", link: "/Pool" },
    { title: "BEACH", img: "/beach.jpg", link: "/Beach" },
    { title: "DINING", img: "/dining.jpg", link: "/Dinning" },
    { title: "SUITES", img: "/suite.jpg", link: "/Suites" },
    { title: "EXPERIENCE", img: "/experience.jpg", link: "/Experience" },
  ];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* 🔹 Reduce slide distance on mobile */
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["100%", "-120%"]
  );

  const descY = useTransform(scrollYProgress, [0.85, 1], [40, 0]);
  const descOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  const pearlText = "PEARL BAY".split("");

  return (
    <div ref={ref} className="relative h-[300vh] md:h-[350vh] w-full">
      <section className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: "url('/service.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/40 -z-10" />

        {/* ⭐ PEARL BAY */}
        <motion.div className="absolute bottom-6 md:bottom-16 left-4 md:left-10 z-30 flex gap-1 md:gap-2">
          {pearlText.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.12 }}
              className="text-gray-200
                         text-4xl md:text-7xl
                         font-[cursive]
                         tracking-[4px] md:tracking-[8px]"
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        {/* ⭐ SLIDING CARDS */}
        <motion.div
          style={{ x }}
          className="
            flex gap-6 md:gap-10
            px-4 md:px-10
            py-32 md:py-40
            w-max h-full items-center
          "
        >
          {cards.map((item, idx) => {
            const isHorizontal = (idx + 1) % 2 === 0;

            return (
              <motion.div
                key={idx}
                className={`
                  relative rounded-xl overflow-hidden
                  ${
                    isHorizontal
                      ? "h-[220px] w-[320px] md:h-[320px] md:w-[450px]"
                      : "h-[320px] w-[220px] md:h-[450px] md:w-[320px]"
                  }
                `}
                whileHover={{ scale: 1.05 }}
              >
                {/* Image */}
                <motion.img
                  src={item.img}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.6 }}
                />

                {/* 🔘 CLICK BUTTON */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(item.link);
                  }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    absolute top-3 right-3 md:top-4 md:right-4
                    z-30
                    h-10 w-10 md:h-12 md:w-12
                    rounded-full
                    border border-white/70
                    backdrop-blur-md
                    flex items-center justify-center
                    text-white text-lg md:text-xl
                  "
                >
                  ➜
                </motion.button>

                {/* Title */}
                <div className="absolute bottom-[-16px] left-[-8px] z-20">
                  <h2
                    className={`
                      text-white/90
                      font-[cursive]
                      tracking-[4px] md:tracking-[6px]
                      text-4xl md:text-6xl
                      ${isHorizontal ? "horizontal-title" : "vertical-title"}
                    `}
                  >
                    {item.title}
                  </h2>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* ⭐ DESCRIPTION */}
        <motion.p
          style={{ y: descY, opacity: descOpacity }}
          className="
            absolute bottom-6 md:bottom-10
            right-4 md:right-10
            text-white/90
            text-sm md:text-lg
            max-w-xs md:max-w-md
            text-center md:text-right
            leading-relaxed
            font-[cursive]
          "
        >
          Discover the essence of tranquility at Pearl Bay.
          A perfect blend of luxury, wellness, and immersive experiences.
        </motion.p>
      </section>

      <style jsx>{`
        .vertical-title {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
        .horizontal-title {
          writing-mode: horizontal-tb;
        }
      `}</style>
    </div>
  );
}
