"use client";

import HotelDetailsTemplate from "./HotelDetailsTemplate";

export default function Sonevasecret() {
    return (
        <HotelDetailsTemplate
            name="Soneva Secret"
            location="Haa Dhaalu Atoll, Maldives"
            rating={5.0}
            reviewCount={25}
            price="4,500"
            originalPrice="5,000"
            description="Soneva Secret 2024 is the ultimate expression of hospitality. Located in the Maldives' only private island resort with just 14 villas, each designed to offer the utmost privacy and seclusion. Experience the first floating villa in the Maldives, the Castaway, or retreat to your jungle hideaway. Every stay is curated by a dedicated Guardian and Assistant to anticipate every need. With a sliding roof in the master suite to stargaze from bed, and direct access to the pristine lagoon, Soneva Secret redefines the concept of barefoot luxury."
            images={[
                "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1974&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop"
            ]}
            amenities={[
                "Floating Villas",
                "Customized Dining",
                "14 Private Villas",
                "Sliding Roofs",
                "Dedicated Guardian",
                "Private Lagoon",
                "Jungle Hideaway"
            ]}
        />
    );
}
