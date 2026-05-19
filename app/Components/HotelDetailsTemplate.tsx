"use client";

import { motion } from "framer-motion";
import {
    FaStar,
    FaMapMarkerAlt,
    FaUtensils,
    FaGlassMartiniAlt,
    FaWifi,
    FaBolt,
    FaArrowUp,
    FaBroom,
    FaCheck,
    FaImages
} from "react-icons/fa";
import Link from "next/link";

interface HotelDetailsProps {
    name: string;
    location: string;
    description: string;
    images: string[]; // [Main, TopRight, BottomRight]
    price: string;
    originalPrice?: string; // e.g. "6,199"
    rating: number; // e.g. 4.0
    reviewCount: number;
    amenities: string[];
}

import { useState } from "react";
import FoundingModal from "./FoundingModal";

export default function HotelDetailsTemplate({
    name,
    location,
    description,
    images,
    price,
    originalPrice,
    rating,
    reviewCount,
    amenities
}: HotelDetailsProps) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="bg-[#f2f2f2] min-h-screen text-gray-800 font-sans pb-0">
            {/* Modal */}
            <FoundingModal isOpen={showModal} onClose={() => setShowModal(false)} />

            <div className="max-w-7xl mx-auto px-4 py-6 pt-32">
                {/* ... existing content ... */}

                {/* ================= HEADER ================= */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-black">{name}</h1>
                        <div className="flex text-yellow-500 text-sm">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < Math.floor(rating) ? "text-black" : "text-gray-300"} />
                            ))}
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        <span className="bg-[#f2f2f2] text-blue-600 font-semibold text-xs px-1 rounded ml-2 border border-blue-200">
                            {location}
                        </span>
                    </p>
                </div>

                {/* ================= GALLERY (GRID) ================= */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 h-[400px] md:h-[500px] mb-8 rounded-xl overflow-hidden relative">
                    {/* Main Image (Left, 2 cols) */}
                    <div className="md:col-span-2 relative h-full bg-gray-200 group">
                        <img src={images[0]} alt="Main View" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 text-sm rounded-full backdrop-blur-sm flex items-center gap-2">
                            <FaImages /> +24 Property Photos
                        </div>
                    </div>

                    {/* Side Images (Right, 1 col, stacked) */}
                    <div className="hidden md:flex flex-col gap-2 h-full">
                        <div className="h-1/2 relative bg-gray-200 overflow-hidden group">
                            <img src={images[1] || images[0]} alt="Room View" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute bottom-4 left-4 text-white text-shadow font-medium text-sm">Room Photos</div>
                        </div>
                        <div className="h-1/2 relative bg-gray-200 overflow-hidden group">
                            <img src={images[2] || images[0]} alt="Guest View" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute bottom-4 left-4 text-white text-shadow font-medium text-sm">Guest Photos</div>
                        </div>
                    </div>
                </div>


                {/* ================= CONTENT GRID ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN (Details) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* About Property */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-black mb-4">About Property</h2>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {description}
                            </p>
                            <button className="text-blue-600 text-sm font-medium mt-2 hover:underline">...Read more</button>
                        </section>

                        {/* Amenities */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-black mb-6">Amenities</h2>
                            <div className="flex flex-wrap gap-x-8 gap-y-6">
                                {amenities.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-gray-700 text-sm">
                                        <span className="text-gray-400 text-xl">
                                            {getAmenityIcon(item)}
                                        </span>
                                        {item}
                                    </div>
                                ))}
                            </div>
                            <button className="text-blue-600 text-sm font-medium mt-6 block">+ More Amenities</button>
                        </section>

                        {/* Ratings & Reviews */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="bg-[#2441a6] text-white text-xl font-bold px-3 py-2 rounded-lg">
                                    {rating.toFixed(1)}
                                </div>
                                <div>
                                    <div className="text-blue-700 font-bold text-lg">Very Good</div>
                                    <div className="text-gray-500 text-sm">({reviewCount} ratings)</div>
                                </div>
                            </div>
                            <button className="text-blue-600 text-sm font-bold">All Reviews</button>
                        </section>

                        {/* Location Map Placeholder */}
                        <section className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                                <FaMapMarkerAlt className="text-2xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-black text-sm">{location}</h3>
                                <p className="text-xs text-gray-400">1.9 km drive to Main Center</p>
                            </div>
                            <button className="ml-auto text-blue-600 text-sm font-medium">See on Map</button>
                        </section>

                    </div>

                    {/* RIGHT COLUMN (Booking Card) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 sticky top-24">

                            <h3 className="font-bold text-lg text-black mb-1">Superior Double Room</h3>
                            <p className="text-sm text-gray-500 mb-4">Fits 2 Adults</p>

                            <ul className="space-y-2 mb-6 text-sm">
                                <li className="flex gap-2 items-start">
                                    <span className="mt-1"><img src="https://promos.makemytrip.com/Hotels_product/Gift_icon.png" className="w-4 h-4" alt="" /></span>
                                    <span className="text-green-700">15% off on Food & Beverages</span>
                                </li>
                                <li className="flex gap-2 items-start">
                                    <FaCheck className="text-gray-400 text-xs mt-1" />
                                    <span className="text-green-700">Guaranteed Early check-in</span>
                                </li>
                                <li className="flex gap-2 items-start">
                                    <FaCheck className="text-green-500 text-xs mt-1" />
                                    <span className="text-green-700">Free Cancellation till check-in</span>
                                </li>
                            </ul>

                            <div className="mb-6">
                                {originalPrice && (
                                    <div className="text-gray-400 text-sm line-through">₹{originalPrice}</div>
                                )}
                                <div className="flex items-end gap-1">
                                    <span className="text-3xl font-bold text-black">₹{price}</span>
                                    <span className="text-gray-500 text-xs mb-1">+ ₹895 taxes & fees</span>
                                </div>
                                <div className="text-xs text-gray-400 mt-1">Per Night</div>
                            </div>

                            <div className="flex gap-4">
                                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full uppercase text-sm tracking-wide transition-colors">
                                    Book This Now
                                </button>
                            </div>
                            <div className="text-center mt-3">
                                <span className="text-blue-600 text-sm cursor-pointer hover:underline">15 More Options</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            {/* Join Membership Section */}
            <section className="bg-white py-16 px-4 text-center border-t border-gray-100 mt-8">
                <div className="max-w-2xl mx-auto space-y-6">
                    <h2 className="text-3xl font-[cursive] text-black">Join as Founding Member</h2>
                    <p className="text-gray-600 leading-relaxed font-light">
                        Unlock a world of unparalleled luxury and exclusive privileges.
                        Become a founding member today and experience the extraordinary.
                    </p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-[#bfa87c] text-white px-10 py-3 rounded-full uppercase tracking-widest text-sm font-medium hover:bg-[#a38b60] transition-colors"
                    >
                        Join Membership
                    </button>
                </div>
            </section>
        </div>
    );
}

function getAmenityIcon(amenity: string) {
    const lower = amenity.toLowerCase();
    if (lower.includes("restaurant") || lower.includes("dining")) return <FaUtensils />;
    if (lower.includes("bar")) return <FaGlassMartiniAlt />;
    if (lower.includes("wifi") || lower.includes("lan")) return <FaWifi />;
    if (lower.includes("power")) return <FaBolt />;
    if (lower.includes("elevator") || lower.includes("lift")) return <FaArrowUp />;
    if (lower.includes("housekeeping")) return <FaBroom />;
    return <FaCheck />;
}
