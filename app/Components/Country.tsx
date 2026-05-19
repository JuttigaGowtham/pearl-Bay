"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

interface Country {
    name: string;
    code: string; // ISO 2-letter code for flagcdn
    image_url?: string; // Optional nice background image of the country
    description?: string;
}

const MOCK_COUNTRIES: Country[] = [
    { name: "United States", code: "us", description: "Land of diverse landscapes and opportunities." },
    { name: "Australia", code: "au", description: "Vibrant cities and distinct wildlife." },
    { name: "New Zealand", code: "nz", description: "Breathtaking landscapes and adventure." },
    { name: "Canada", code: "ca", description: "Stunning mountains and friendly cities." },
];

export default function Country() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCountries = MOCK_COUNTRIES.filter((country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-neutral-50 text-black font-sans selection:bg-[#b5a27a] selection:text-white">

            {/* DECORATIVE BACKGROUND */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.05 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"
                />
                <div className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-[#b5a27a]/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[50vh] h-[50vh] bg-[#b5a27a]/5 rounded-full blur-[100px]" />
            </div>


            {/* HEADER */}
            <div className="relative pt-20 px-6 md:px-20 pb-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col md:flex-row justify-between items-end gap-6"
                >
                    <div>
                        <h4 className="text-[#b5a27a] tracking-[0.2em] text-sm uppercase font-bold mb-2">Discover</h4>
                        <h1 className="text-5xl md:text-7xl font-light tracking-tight text-neutral-900 font-[cursive]">
                            Destinations
                        </h1>
                    </div>

                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-neutral-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search countries..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border-b-2 border-neutral-200 focus:border-[#b5a27a] outline-none transition-colors duration-300 placeholder:text-neutral-300 font-light"
                        />
                    </div>
                </motion.div>
            </div>

            {/* GRID */}
            <div className="px-6 md:px-20 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCountries.map((country, index) => (
                        <Link
                            href="/hotels"
                            key={country.code}
                            className={`block ${index === 0 ? "md:col-span-2 lg:col-span-3" : ""}`}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative bg-white border border-neutral-100 p-6 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
                            >
                                {/* GOLD ACCENT ON HOVER */}
                                <div className="absolute top-0 left-0 w-1 h-full bg-[#b5a27a] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />

                                <div className="flex items-start justify-between mb-6">
                                    <div className="relative w-16 h-12 shadow-md overflow-hidden bg-neutral-100">
                                        <Image
                                            src={`https://flagcdn.com/w160/${country.code}.png`}
                                            alt={`${country.name} flag`}
                                            fill
                                            className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            unoptimized
                                        />
                                    </div>
                                    <FaMapMarkerAlt className="text-neutral-200 group-hover:text-[#b5a27a] transition-colors duration-300 text-2xl" />
                                </div>

                                <h2 className="text-2xl font-normal text-neutral-900 mb-2 group-hover:text-[#b5a27a] transition-colors duration-300 font-[cursive]">
                                    {country.name}
                                </h2>

                                <p className="text-neutral-500 text-sm font-light leading-relaxed">
                                    {country.description}
                                </p>

                                <div className="mt-6 pt-6 border-t border-neutral-100 flex justify-end">
                                    <button className="text-xs uppercase tracking-widest font-bold text-neutral-400 group-hover:text-black transition-colors flex items-center gap-2">
                                        Explore <span className="text-[#b5a27a] transform group-hover:translate-x-1 transition-transform">→</span>
                                    </button>
                                </div>

                            </motion.div>
                        </Link>
                    ))}
                </div>

                {filteredCountries.length === 0 && (
                    <div className="text-center py-20 text-neutral-400 font-light">
                        No destinations found matching "{searchQuery}"
                    </div>
                )}
            </div>
        </div>
    );
}
