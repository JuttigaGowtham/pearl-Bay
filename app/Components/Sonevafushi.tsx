"use client";

import HotelDetailsTemplate from "./HotelDetailsTemplate";

export default function Sonevafushi() {
    return (
        <HotelDetailsTemplate
            name="Soneva Fushi"
            location="Baa Atoll, Maldives"
            rating={4.8}
            reviewCount={250}
            price="2,200"
            originalPrice="2,500"
            description="Soneva Fushi is the original desert island hideaway in the Maldives. Hidden among dense foliage within the Baa Atoll UNESCO Biosphere Reserve, it inspires the imagination. The resort features fifty-seven private villas with their own stretch of beach, most with their own pools. Watch classic movies at our open-air Cinema Paradiso. Sustainable luxury meets natural beauty. Experience the night sky at the high-tech Observatory, or dine in the treetops at Fresh in the Garden."
            images={[
                "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1974&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2070&auto=format&fit=crop"
            ]}
            amenities={[
                "63 Island Villas",
                "Soneva Soul",
                "Cinema Paradiso",
                "Observatory",
                "Fresh in the Garden",
                "Private Pools",
                "Biosphere Reserve"
            ]}
        />
    );
}
