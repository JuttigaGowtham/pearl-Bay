"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function About() {
  return (
    <div className="w-full bg-white text-black overflow-hidden font-sans border-t border-neutral-200">

      {/* 4-Column Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-[600px]">

        {/* 1st Column: Text (Matter) */}
        <div className="flex flex-col justify-center px-10 py-20 bg-white border-r border-neutral-200">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-3xl font-[cursive] text-black">
              About us
            </h1>
            <p className="text-neutral-600 text-sm leading-relaxed font-light tracking-wide">
              PearlBay is the world's leading lifestyle management group. We take the concept
              of luxury concierge to an entirely new level. A single touchpoint with a dedicated
              lifestyle manager allows unprecedented responsiveness.
            </p>
            <p className="text-neutral-600 text-sm leading-relaxed font-light tracking-wide">
              Whether you are looking for a last-minute booking at a Michelin-starred restaurant,
              access to a sold-out event, or a bespoke travel itinerary, our team is here to make
              it happen. We pride ourselves on our ability to anticipate your needs and exceed
              your expectations.
            </p>
            <Link href="/membership">
              <span className="inline-block border-b border-[#b5a27a] text-[#b5a27a] text-xs uppercase tracking-widest pb-1 hover:text-black hover:border-black transition-colors cursor-pointer">
                Join PearlBay
              </span>
            </Link>
          </motion.div>
        </div>

        {/* 2nd Column: Image */}
        <div className="relative h-[400px] lg:h-auto min-h-[400px] overflow-hidden group">
          <Image
            src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Yacht Lifestyle"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* 3rd Column: Image */}
        <div className="relative h-[400px] lg:h-auto min-h-[400px] overflow-hidden group">
          <Image
            src="https://www.theleela.com/prod/content/2025-04/Hero%201_1920x950_9.jpg?VersionId=GmlinNR6Pgorgb1VpraWyqx_5LTfnfNZ"
            alt="Luxury Camping"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* 4th Column: Text (Matter) */}
        <div className="flex flex-col justify-center px-10 py-20 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-[cursive] text-black">
              Welcome
            </h2>
            <h3 className="italic font-serif text-sm text-neutral-500">
              Pioneering the concept of lifestyle management.
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed font-light">
              Built around the singular proposition of bestowing back upon our members the invaluable gift of time.
              We provide a connection to the best on offer across the globe.
            </p>
            <p className="text-neutral-600 text-sm leading-relaxed font-light">
              From private aviation and yacht charters to exclusive real estate and education consultancy,
              our expertise spans every aspect of the luxury lifestyle. Let us curate your world,
              crafting moments that are as unique as they are unforgettable.
            </p>
            <Link href="/contact">
              <span className="inline-block border-b border-[#b5a27a] text-[#b5a27a] text-xs uppercase tracking-widest pb-1 hover:text-black hover:border-black transition-colors cursor-pointer">
                Enquire Now
              </span>
            </Link>
          </motion.div>
        </div>

      </div>
    </div>
  );
}