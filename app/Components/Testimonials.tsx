"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Slide {
    id: number;
    image: string;
}

const SLIDES: Slide[] = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop",
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop",
    },
    {
        id: 7,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 8,
        image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074&auto=format&fit=crop",
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-scroll logic
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
        }, 4000); // Change every 4 seconds for faster carousel

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[60vh] md:h-screen overflow-hidden bg-white text-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 w-full h-full"
                >
                    {/* Background Image */}
                    <Image
                        src={SLIDES[currentIndex].image}
                        alt={`Slide ${currentIndex + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                    {/* Subtle gradient for depth, but no heavy overlay since text is gone */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
                </motion.div>
            </AnimatePresence>

            {/* Dots Navigation */}
            <div className="absolute bottom-6 md:bottom-10 left-0 right-0 flex justify-center gap-3 md:gap-4 z-20">
                {SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-500 border border-white/50 ${index === currentIndex ? "bg-white border-white scale-125" : "bg-transparent hover:bg-white/30"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
