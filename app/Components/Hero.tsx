"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiMail,
  FiChevronDown,
  FiVolume2,
  FiVolumeX,
} from "react-icons/fi";

export default function Hero() {
  const router = useRouter();
  const [showIntro, setShowIntro] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [introClass, setIntroClass] = useState("opacity-100 scale-100");
  const [heroClass, setHeroClass] = useState("opacity-0");
  const [navbarClass, setNavbarClass] = useState("opacity-0");

  /* 🔊 SOUND STATE */
  const [muted, setMuted] = useState(true);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const introVideoRef = useRef<HTMLVideoElement>(null);

  /* 🖱️ CURSOR (DESKTOP ONLY) */
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  /* ================= SCROLL LOGIC ================= */
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY && currentY > 50) {
        setIntroClass("opacity-0 scale-110");
        setHeroClass("opacity-100");
        setNavbarClass("opacity-100");
        setTimeout(() => setShowIntro(false), 700);
      }

      if (currentY < lastScrollY && currentY < 10) {
        setShowIntro(true);
        setTimeout(() => setIntroClass("opacity-100 scale-100"), 50);
        setHeroClass("opacity-0");
        setNavbarClass("opacity-0");
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  /* ================= CURSOR TRACKING (DESKTOP ONLY) ================= */
  useEffect(() => {
    if (!showIntro || isTouch) return;

    const moveCursor = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [showIntro, isTouch]);

  /* ================= SOUND TOGGLE ================= */
  const toggleSound = () => {
    if (!introVideoRef.current) return;
    introVideoRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <section className="relative w-full bg-white overflow-hidden">

      {/* ===================== INTRO VIDEO ===================== */}
      {showIntro && (
        <div
          className={`fixed inset-0 bg-black z-[999] transition-all duration-700 ${introClass}`}
        >
          <video
            ref={introVideoRef}
            src="/hero.mp4"
            autoPlay
            playsInline
            muted={muted}
            className="w-full h-full object-cover"
          />

          {/* 🔊 SOUND BUTTON (DESKTOP ONLY) */}
          {!isTouch && !isHoveringButton && (
            <button
              onClick={toggleSound}
              style={{
                transform: `translate(${cursor.x}px, ${cursor.y}px)`,
              }}
              className="
                fixed top-0 left-0 z-[1000]
                -translate-x-1/2 -translate-y-1/2
                w-12 h-12 md:w-14 md:h-14
                rounded-full border border-white/40
                bg-white/10 backdrop-blur-md
                flex items-center justify-center
              "
            >
              {muted ? (
                <FiVolumeX className="text-white text-xl md:text-2xl" />
              ) : (
                <FiVolume2 className="text-white text-xl md:text-2xl" />
              )}
            </button>
          )}

          {/* CENTER TEXT */}

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-[cursive] tracking-[0.2em] md:tracking-[0.3em]">
              PEARL BAY
            </h1>

            <button
              onClick={() => router.push("/hotels")}
              onMouseEnter={() => setIsHoveringButton(true)}
              onMouseLeave={() => setIsHoveringButton(false)}
              className="mt-4 text-sm sm:text-lg tracking-[0.15em] opacity-80 hover:opacity-100 hover:text-[#b5a27a] transition-all duration-300 uppercase cursor-pointer"
            >
              Book Your Hotel Now
            </button>

            <p className="mt-4 text-sm sm:text-lg tracking-[0.15em] opacity-80">
              Scroll Down
            </p>

            <FiChevronDown className="text-3xl mt-6 animate-bounce" />
          </div>
        </div>
      )}

      {/* ===================== HERO CONTENT ===================== */}
      <div className={`transition-opacity duration-700 pt-32 md:pt-40 ${heroClass}`}>

        
        {/* <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-10">

          <div className="text-center">
            <div className="flex justify-center">
              {"LOOK".split("").map((char, index) => (
                <span
                  key={index}
                  className={`
                    text-[18vw] sm:text-[14vw] md:text-[12vw]
                    font-light text-[#e6dfd3]
                    opacity-0 translate-y-[40px]
                    transition-all duration-700
                    ${heroClass === "opacity-100" ? "opacity-100 translate-y-0" : ""}
                  `}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {char}
                </span>
              ))}
            </div>

            <p className="text-[#8f847b] tracking-[0.3em] mt-2 text-xs sm:text-sm">
              BEYOND LIMITS.
            </p>
          </div>

          <video
            src="/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="
              w-full max-w-md md:max-w-none
              md:w-[45vw]
              h-[220px] sm:h-[260px] md:h-[180px]
              object-cover rounded-sm shadow-md
            "
          />
        </div> */}

        
        {/* <div className="flex flex-col md:flex-row items-center gap-8 mt-16 px-6 md:px-10">
          <img
            src="/hero.jpg"
            alt="wide view"
            className="w-full md:w-[75%] h-[220px] sm:h-[300px] md:h-[180px] object-cover"
          />

          <h2 className="text-[18vw] sm:text-[10vw] md:text-[6vw] text-[#e6dfd3] font-light tracking-widest">
            FIND
          </h2>
        </div> */}

        
        {/* <div className="text-center mt-20 mb-24 px-4">
          <h1 className="text-[12vw] sm:text-[9vw] md:text-[7vw] font-light text-[#8f847b] tracking-[0.1em]">
            TRUE PERFECTION.
          </h1>
        </div> */}

        
        {/* <div className="hidden md:flex absolute left-10 top-[65%] flex-col gap-10 text-[#8f847b]">
          <FiMail className="text-2xl" />
          <FiChevronDown className="text-3xl" />
        </div> */}
      </div>
    </section>
  );
}
