"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaUser, FaFacebookF, FaInstagram, FaCalendarAlt, FaHotel } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import FlowingMenu from "./FlowingMenu";
import { supabase } from "@/lib/supabase";



export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const [userInitial, setUserInitial] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isHotelPage, setIsHotelPage] = useState(false);

  // Ensure client-only logic runs after mount
  useEffect(() => {
    setMounted(true);
    // Make detection case-insensitive and robust
    const lowerPath = pathname.toLowerCase();
    const hotelSlugs = [
      "/hotels",
      "/hotel-details",
      "/amanpuri",
      "/amanzoe",
      "/amargani",
      "/jademountain",
      "/kisawasanctuary",
      "/matakaurilodge",
      "/nihisumba",
      "/northisland",
      "/oneandonlyreethirah",
      "/passalacqua",
      "/rosewoodhongkong",
      "/royalmansour",
      "/sixsenseszighybay",
      "/sonevafushi",
      "/sonevasecret",
      "/thepoint",
      "/twinfarm",
      "/waldorfastoriamaldives",
      "/beach",
      "/experience",
      "/explorapatagonia",
      "/pool",
      "/suites",
      "/wellbeing",
    ];
    let hotelPage = hotelSlugs.some((slug) => lowerPath.startsWith(slug));
    // Fallback: check sessionStorage flag (for Hotels.tsx direct mount)
    if (!hotelPage && typeof window !== "undefined" && sessionStorage.getItem("forceHotelNavbar") === "true") {
      hotelPage = true;
    }

    // Explicitly force Gold for specific pages
    if (lowerPath.includes("urgencybanner") || lowerPath.includes("foundingmember") || lowerPath.includes("waitlist")) {
      hotelPage = false;
    }

    setIsHotelPage(hotelPage);
  }, [pathname]);

  useEffect(() => {
    const supabaseClient = supabase;
    if (!supabaseClient) return;

    // Fetch initial session
    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        if (error) throw error;

        if (session?.user) {
          const name = session.user.user_metadata?.name || session.user.email || "?";
          setUserInitial(name[0].toUpperCase());
        } else {
          setUserInitial(null); // Explicitly reset if no user
        }
      } catch (e) {
        console.warn("Navbar: Supabase session check failed", e);
      }
    };
    checkUser();

    // Listen for changes (login/logout)
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const name = session.user.user_metadata?.name || session.user.email || "?";
        setUserInitial(name[0].toUpperCase());
      } else {
        setUserInitial(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const demoItems = [
    { link: "#", text: "Home", image: "https://picsum.photos/600/400?random=1" },
    { link: "#", text: "Aboutus", image: "https://picsum.photos/600/400?random=2" },
    { link: "#", text: "Rooms & Suites", image: "https://picsum.photos/600/400?random=3" },
    { link: "#", text: "Dining", image: "https://picsum.photos/600/400?random=4" },
    { link: "#", text: "Gallery", image: "https://picsum.photos/600/400?random=5" },
    { link: "#", text: "Experience", image: "https://picsum.photos/600/400?random=6" },
    { link: "#", text: "Contact", image: "https://picsum.photos/600/400?random=7" }
  ];

  // Prevent hydration mismatch: render nothing until mounted
  if (!mounted) return null;

  return (
    <>
      {/* TOP NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-2000 flex items-center justify-between py-4 px-4 md:py-5 md:px-8 bg-transparent">
        <div className="flex items-center gap-4 md:gap-6">
          {/* <button
            onClick={() => setOpen(true)}
            className="flex flex-col gap-1.5 z-5000 cursor-pointer group"
          >
            <span className={`w-8 h-[2px] ${isHotelPage ? "bg-black" : "bg-[#b5a27a]"} transition-colors duration-500 group-hover:w-10`}></span>
            <span className={`w-6 h-[2px] ${isHotelPage ? "bg-black" : "bg-[#b5a27a]"} transition-colors duration-500 group-hover:w-8`}></span>
            <span className={`w-4 h-[2px] ${isHotelPage ? "bg-black" : "bg-[#b5a27a]"} transition-colors duration-500 group-hover:w-6`}></span>
          </button> */}

          <p
            className={`text-xl md:text-2xl font-[cursive] ${isHotelPage ? "text-black" : "text-[#b5a27a]"} transition-colors duration-500`}
          >
            pearlbay
          </p>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          {/* SEARCH BUTTON (Example - if needed, otherwise keeping layout) */}

          {/* HOTELS BUTTON */}
          <button
            className={`flex items-center gap-2 px-3 py-1 md:px-5 md:py-2 border ${isHotelPage ? "border-black text-black" : "border-[#b5a27a] text-[#b5a27a]"} rounded-full hover:bg-[#b5a27a] hover:text-white hover:border-[#b5a27a] transition-all duration-500 group`}
            onClick={() => router.push("/country")}
          >
            <FaHotel className="group-hover:text-white transition-colors duration-500 text-xs md:text-base" />
            <span className="group-hover:text-white transition-colors duration-500 text-[10px] md:text-sm font-medium">Hotels</span>
          </button>

          {/* USER or INITIAL */}
          <button
            className={`flex items-center gap-2 px-3 py-1 md:px-5 md:py-2 border ${isHotelPage ? "border-black text-black" : "border-[#b5a27a] text-[#b5a27a]"} rounded-full hover:bg-[#b5a27a] hover:text-white hover:border-[#b5a27a] transition-all duration-500 group`}
            onClick={() => router.push("/profile")}
          >
            {userInitial ? (
              <span className="group-hover:text-white transition-colors duration-500 font-bold text-xs md:text-base">{userInitial}</span>
            ) : (
              <FaUser className="group-hover:text-white transition-colors duration-500 text-xs md:text-base" />
            )}
            <span className="group-hover:text-white transition-colors duration-500 text-[10px] md:text-sm font-medium"></span>
          </button>

          {/* BOOK NOW */}
          <button
            className="px-3 py-1 md:px-6 md:py-2 bg-[#b5a27a] text-white rounded-full text-[10px] md:text-base whitespace-nowrap hover:bg-[#b5a27a] transition-colors duration-500"
            onClick={() => router.push("/membership")}
          >
            Join Plus ↗
          </button>
        </div>
      </header>

      {/* ---------------------------------------- */}
      {/* FULLSCREEN MENU (LEFT → RIGHT) */}
      {/* ---------------------------------------- */}
      <div
        className={`fixed top-0 left-0 w-full h-full z-3000 bg-[#f8f4eb]/95 backdrop-blur-xl transition-transform duration-900 ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* SOCIAL ICONS */}
        <div className={`absolute top-6 right-6 md:top-8 md:right-16 flex gap-4 md:gap-6 text-2xl md:text-3xl ${isHotelPage ? "text-black" : "text-[#b5a27a]"} z-4000`}>
          <FaFacebookF className="hover:opacity-70 transition" />
          <FaInstagram className="hover:opacity-70 transition" />
          <MdOutlineAlternateEmail className="hover:opacity-70 transition" />
        </div>
        {/* ...existing code... */}
      </div>

      {/* ---------------------------------------- */}
      {/* FULLSCREEN CALENDLY OVERLAY */}
      {/* ---------------------------------------- */}
      <div
        className={`fixed top-0 left-0 w-full h-full z-4000 bg-black/90 backdrop-blur-xl transition-all duration-700 ${calendlyOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setCalendlyOpen(false)}
          className="absolute top-8 right-8 text-4xl text-white z-5000"
        >
          ✕
        </button>

        {/* FULLSCREEN CALENDLY PAGE */}
        <iframe
          src="https://cal.com/YOUR_USERNAME/YOUR_EVENT"
          className="w-full h-full border-none"
        />
      </div>
    </>
  );
}
