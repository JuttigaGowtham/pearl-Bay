"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxSectionProps {
    children: React.ReactNode;
    offset?: number;
    className?: string;
    speed?: number; // small factor like 0.5 or -0.5
}

export default function ParallaxSection({
    children,
    offset = 50,
    className = "",
    speed = 0.5,
}: ParallaxSectionProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // map scroll progress 0..1 to -offset..offset
    // adjusting based on speed. speed > 0 moves it slower/against scroll (parallax depth)
    const y = useTransform(scrollYProgress, [0, 1], [-offset * speed, offset * speed]);

    return (
        <div ref={ref} className={`relative ${className}`}>
            <motion.div style={{ y }} className="w-full h-full">
                {children}
            </motion.div>
        </div>
    );
}
