"use client";

import HotelDetailsTemplate from "./HotelDetailsTemplate";

export default function Passalacqua() {
    return (
        <HotelDetailsTemplate
            name="Passalacqua"
            location="Lake Como, Italy"
            rating={4.9}
            reviewCount={150}
            price="3,000"
            originalPrice="3,500"
            description="Standing on the shores of Lake Como, Passalacqua is an 18th-century private home transformed into an intimate hotel. With terraced gardens that sweep down to the water, it is a place of rare beauty and historic grandeur. Every room celebrates Italian craftsmanship, featuring original frescoes, Murano chandeliers, and precious silks."
            images={[
                "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2574&auto=format&fit=crop",
                "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/39/8c/32/caption.jpg?w=900&h=-1&s=1",
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2574&auto=format&fit=crop"
            ]}
            amenities={[
                "Historic Villa",
                "Lake Access",
                "Private Boat",
                "Terraced Gardens",
                "Pool",
                "Fine Dining",
                "Spa"
            ]}
        />
    );
}
