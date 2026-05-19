"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FaSpinner, FaArrowLeft, FaSearch } from "react-icons/fa";

interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  image_url: string;
  price?: string;
  website_url?: string;
  slug: string;
}


function HotelCard({ hotel, index }: { hotel: Hotel; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]); // Parallax effect

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
    >
      {/* LEFT IMAGE */}
      <div className="relative w-full h-[280px] md:h-[360px] overflow-hidden rounded-xl">
        <motion.div style={{ y }} className="relative w-full h-[120%] -top-[10%]">
          <Image
            src={hotel.image_url}
            alt={hotel.name}
            fill
            className="object-cover"
            unoptimized
          />
        </motion.div>
      </div>

      {/* RIGHT TEXT */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <p className="text-sm tracking-widest uppercase text-black/70 mb-3 font-[cursive]">
          {hotel.location} {hotel.price && <span>• {hotel.price}</span>}
        </p>

        <h2 className="text-3xl font-light tracking-widest text-black mb-3 font-[cursive]">
          {hotel.name}
        </h2>

        <p className="text-black/70 text-sm tracking-widest mb-6 font-[cursive]">
          {hotel.description}
        </p>

        <div className="flex gap-6">
          <Link
            href={
              ["amangiri", "amargani"].includes(hotel.slug) ||
                ["amangiri", "amargani"].includes(hotel.name.toLowerCase())
                ? "/amargani"
                : ["twin farms", "twinfarm"].includes(hotel.slug) ||
                  hotel.name.toLowerCase().includes("twin farms")
                  ? "/Twinfarm"
                  : ["the point", "thepoint"].includes(hotel.slug) ||
                    hotel.name.toLowerCase().includes("the point")
                    ? "/Thepoint"
                    : ["jade mountain", "jademountain"].includes(hotel.slug) ||
                      hotel.name.toLowerCase().includes("jade mountain")
                      ? "/Jademountain"
                      : ["explora patagonia", "explorapatagonia"].includes(hotel.slug) ||
                        hotel.name.toLowerCase().includes("explora patagonia")
                        ? "/Explorapatagonia"
                        : ["royal mansour", "royalmansour"].includes(hotel.slug) ||
                          hotel.name.toLowerCase().includes("royal mansour")
                          ? "/Royalmansour"
                          : ["amanzoe"].includes(hotel.slug) ||
                            hotel.name.toLowerCase().includes("amanzoe")
                            ? "/Amanzoe"
                            : ["sonevafushi", "soneva-fushi"].includes(hotel.slug) ||
                              hotel.name.toLowerCase().includes("soneva fushi") ||
                              hotel.name.toLowerCase().includes("sonevafushi")
                              ? "/Sonevafushi"
                              : ["nihi sumba", "nihisumba"].includes(hotel.slug) ||
                                hotel.name.toLowerCase().includes("nihi sumba") ||
                                hotel.name.toLowerCase().includes("nihisumba")
                                ? "/Nihisumba"
                                : ["amanpuri"].includes(hotel.slug) ||
                                  hotel.name.toLowerCase().includes("amanpuri")
                                  ? "/Amanpuri"
                                  : ["matakauri lodge", "matakaurilodge"].includes(hotel.slug) ||
                                    hotel.name.toLowerCase().includes("matakauri lodge") ||
                                    hotel.name.toLowerCase().includes("matakaurilodge") ||
                                    hotel.name.toLowerCase().includes("matakauri")
                                    ? "/Matakaurilodge"
                                    : ["rosewood hong kong", "rosewoodhongkong"].includes(hotel.slug) ||
                                      hotel.name.toLowerCase().includes("rosewood hong kong") ||
                                      hotel.name.toLowerCase().includes("rosewoodhongkong")
                                      ? "/Rosewoodhongkong"
                                      : ["passalacqua"].includes(hotel.slug) ||
                                        hotel.name.toLowerCase().includes("passalacqua")
                                        ? "/Passalacqua"
                                        : ["soneva secret", "sonevasecret"].includes(hotel.slug) ||
                                          hotel.name.toLowerCase().includes("soneva secret") ||
                                          hotel.name.toLowerCase().includes("sonevasecret")
                                          ? "/Sonevasecret"
                                          : ["six senses zighy bay", "sixsenseszighybay"].includes(hotel.slug) ||
                                            hotel.name.toLowerCase().includes("six senses zighy bay") ||
                                            hotel.name.toLowerCase().includes("sixsenseszighybay")
                                            ? "/Sixsenseszighybay"
                                            : ["north island", "northisland"].includes(hotel.slug) ||
                                              hotel.name.toLowerCase().includes("north island") ||
                                              hotel.name.toLowerCase().includes("northisland")
                                              ? "/Northisland"
                                              : ["kisawa sanctuary", "kisawasanctuary", "kisawa"].includes(hotel.slug) ||
                                                hotel.name.toLowerCase().includes("kisawa")
                                                ? "/KisawaSanctuary"
                                                : ["waldorf astoria maldives ithaafushi", "waldorfastoriamaldives", "waldorf astoria", "waldorfastoria"].includes(hotel.slug) ||
                                                  hotel.name.toLowerCase().includes("waldorf astoria")
                                                  ? "/WaldorfAstoriaMaldives"
                                                  : ["north island", "northisland"].includes(hotel.slug) ||
                                                    hotel.name.toLowerCase().includes("north island") ||
                                                    hotel.name.toLowerCase().includes("northisland")
                                                    ? "/Northisland"
                                                    : ["one&only reethi rah", "oneandonlyreethirah", "reethi rah", "reethirah"].includes(hotel.slug) ||
                                                      hotel.name.toLowerCase().includes("one&only reethi rah") ||
                                                      hotel.name.toLowerCase().includes("reethi rah")
                                                      ? "/OneAndOnlyReethiRah"
                                                      : "/"
            }
            className="inline-flex items-center justify-center px-6 py-3 bg-black text-white text-xs tracking-widest uppercase rounded-lg hover:bg-opacity-80 transition-all font-[cursive]"
          >
            Book Now
          </Link>
          {hotel.website_url && (
            <a
              href={hotel.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-black text-black text-xs tracking-widest uppercase rounded-lg hover:bg-black hover:text-white transition-all font-[cursive]"
            >
              View Website
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hotel() {
  const ref = useRef<HTMLDivElement>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Force hotel navbar style for this page
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("forceHotelNavbar", "true");
    }
    return () => {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("forceHotelNavbar");
      }
    };
  }, []);

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    async function fetchHotels() {
      try {
        const res = await fetch("/api/hotels");
        const data = await res.json();
        if (data.hotels) {
          setHotels(data.hotels);
        }
      } catch (error) {
        console.error("Failed to fetch hotels", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#b5a27a]">
        <FaSpinner className="text-4xl text-white animate-spin" />
      </div>
    );
  }

  return (
    <div ref={ref} className="relative min-h-screen w-full overflow-x-hidden">

      {/* FIXED HALF-GOLD HALF-WHITE BACKGROUND */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div
          initial={{ height: "0%" }}
          animate={{ height: "50%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full bg-[#b5a27a]"
        />
        <motion.div
          initial={{ height: "0%" }}
          animate={{ height: "50%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-full bg-white"
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 pt-20 pb-32">

        {/* ⭐ HEADING MOVED TO TOP RIGHT ⭐ */}
        <div className="w-full flex justify-end pr-10">
          <motion.h1
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            className="text-right text-4xl md:text-7xl font-[cursive] tracking-[0.15em] text-black mb-10"
          >
            HOTELS
          </motion.h1>
        </div>

        {/* SEARCH BAR */}
        <div className="w-[90%] md:w-[80%] mx-auto mb-16 relative">
          <input
            type="text"
            placeholder="Search hotels, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white/80 backdrop-blur-sm border border-black/10 rounded-full focus:outline-none focus:ring-2 focus:ring-[#b5a27a] transition-all font-[cursive] text-lg placeholder:text-gray-400 text-black shadow-sm"
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 z-10 text-xl" />
        </div>

        <div className="space-y-20 w-[90%] md:w-[80%] mx-auto">

          {filteredHotels.length === 0 ? (
            <div className="text-center text-2xl font-[cursive] text-black/50 py-20">
              {hotels.length === 0 ? "No hotels available at the moment." : "No hotels match your search."}
            </div>
          ) : (
            filteredHotels.map((hotel, index) => (
              <HotelCard key={hotel.id} hotel={hotel} index={index} />
            ))
          )}

        </div>
      </div>
    </div>
  );
}
