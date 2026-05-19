"use client";

import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { WiCloudy, WiTsunami } from "react-icons/wi";

export default function Footer() {
  const [showWeather, setShowWeather] = useState(false);
  const [colorProgress, setColorProgress] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(true);

      const footer = document.getElementById("footer-section");
      if (!footer) return;

      const rect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const visible = Math.min(
        Math.max(windowHeight - rect.top, 0),
        rect.height
      );
      const progress = visible / rect.height;
      setColorProgress(progress);

      if (window.scrollY < 50) setShowWeather(true);
      if (window.scrollY > 150) setShowWeather(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      id="footer-section"
      className="relative w-full min-h-screen text-white overflow-hidden"
    >
      {/* ================= BACKGROUND IMAGE ================= */}
      <div
        className={`
          absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms]
          ease-[cubic-bezier(0.16,1,0.3,1)]
          ${showWeather ? "translate-x-[100%]" : "translate-x-0"}
        `}
        style={{
          backgroundImage: "url('/footer.jpg')",
          filter: `grayscale(${hasScrolled ? 1 - colorProgress : 1})`,
          transition: "filter 0.6s linear",
        }}
      />

      {/* ================= MAIN FOOTER ================= */}
      <div
        className={`
          absolute inset-0 z-20 transition-opacity duration-700
          ${showWeather ? "opacity-0" : "opacity-100"}
          px-6 py-12 sm:px-12 sm:py-16 md:px-20 md:py-20
        `}
      >
        <div className="absolute inset-0 bg-black/20" />

        {/* LEFT CONTENT */}
        <div className="relative z-20 max-w-md">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-[cursive] mb-8">
            pearl bay
          </h1>

          <div className="space-y-1 text-sm sm:text-base md:text-lg leading-relaxed">
            <p>Via Capriglione, 147</p>
            <p>84010 Praiano</p>
            <p>Amalfi Coast, SA</p>
            <p>ITALY</p>
          </div>

          <div className="mt-6 space-y-1 text-sm sm:text-base md:text-lg">
            <p>ph +39 089 8131333</p>
            <p>fax +39 089 874266</p>
          </div>

          <p className="mt-6 text-sm sm:text-base">
            CIN: IT065102A14H5PUG5R
          </p>
        </div>

        {/* SOCIAL ICONS */}
        <div className="
          absolute right-6 bottom-20
          sm:right-10 sm:bottom-28
          md:right-12 md:bottom-32
          flex flex-row sm:flex-col gap-6 text-2xl z-20
        ">
          <FaFacebookF className="hover:opacity-70 transition" />
          <FaInstagram className="hover:opacity-70 transition" />
          <FaTwitter className="hover:opacity-70 transition" />
        </div>

        {/* COPYRIGHT */}
        <div className="absolute bottom-6 left-0 w-full text-center z-20">
          <p className="text-xs tracking-wider opacity-80">
            © Pearl Bay 2025 | all rights reserved
          </p>
        </div>
      </div>

      {/* ================= WEATHER SECTION ================= */}
      <div
        className={`
          absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms]
          ease-[cubic-bezier(0.16,1,0.3,1)]
          ${showWeather ? "translate-x-0" : "translate-x-[-100%]"}
        `}
        style={{ backgroundImage: "url('/')" }}
      >
        <div className="absolute inset-0 bg-white/40" />

        <div
          className={`
            absolute inset-0 z-20 transition-opacity duration-700
            ${showWeather ? "opacity-100" : "opacity-0"}
            px-6 py-10 sm:px-12 md:px-20
            text-[#6f665c]
          `}
        >
          {/* DATE */}
          <div className="flex flex-col sm:flex-row justify-between gap-8">
            <div>
              <h1 className="text-[22vw] sm:text-[10vw] font-light leading-none">
                2025
              </h1>
              <p className="text-base sm:text-xl mt-2">Wednesday</p>
              <p className="text-xl sm:text-3xl font-light">
                10th December
              </p>
            </div>

            <button className="self-start px-6 py-2 rounded-full bg-[#b5a27a] text-white">
              book now ↗
            </button>
          </div>

          {/* ICONS */}
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-12 sm:gap-28 text-center">
            <div>
              <FiWind className="text-4xl mx-auto" />
              <p className="mt-2 text-sm">weak</p>
            </div>
            <div>
              <WiCloudy className="text-5xl mx-auto" />
              <p className="mt-2 text-sm">partly cloudy</p>
            </div>
            <div>
              <WiTsunami className="text-5xl mx-auto" />
              <p className="mt-2 text-sm">calm (rippled)</p>
            </div>
          </div>

          {/* TEMP */}
          <div className="w-full text-center mt-10">
            <h1 className="text-5xl sm:text-7xl font-light">13°</h1>
          </div>
        </div>
      </div>
    </footer>
  );
}
