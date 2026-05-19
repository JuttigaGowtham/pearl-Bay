"use client";

import HotelDetailsTemplate from "./HotelDetailsTemplate";

export default function Northisland() {
    return (
        <HotelDetailsTemplate
            name="North Island"
            location="Seychelles"
            rating={4.9}
            reviewCount={112}
            price="6,500"
            originalPrice="7,000"
            description="North Island is a place of barefoot luxury and one of the world's most ambitious conservation projects. The island's 11 private villas were hand-crafted using local materials harvested during the island rehabilitation process. Experience a sanctuary where natural habitats are rehabilitating and rare species are returning. It is a place of exclusive privacy and personal freedom."
            images={[
                "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=2664&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?q=80&w=2670&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2574&auto=format&fit=crop"
            ]}
            amenities={[
                "Private Villas",
                "Eco-Tourism",
                "Marine Life",
                "Beach Access",
                "Spa",
                "Diving",
                "Personal Chef"
            ]}
        />
    );
}
