"use client";

import HotelDetailsTemplate from "./HotelDetailsTemplate";

export default function KisawaSanctuary() {
    return (
        <HotelDetailsTemplate
            name="Kisawa Sanctuary"
            location="Benguerra Island, Mozambique"
            rating={4.9}
            reviewCount={85}
            price="3,500"
            originalPrice="3,800"
            description="Kisawa Sanctuary is a new standard in luxury, pairing cultural celebration with environmental conservation on Benguerra Island. Experience the first-ever 3D-printed resort, merging innovation with tradition. Each residence has its own private beach, open-air deck, and infinity pool, blurring the lines between the indoors and the natural world outside."
            images={[
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2574&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2574&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
            ]}
            amenities={[
                "Private Beach",
                "3D Printed Architecture",
                "Spa",
                "Marine Conservation",
                "Private Pool",
                "Diving",
                "Fine Dining"
            ]}
        />
    );
}
