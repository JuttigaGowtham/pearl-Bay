"use client";

import HotelDetailsTemplate from "./HotelDetailsTemplate";

export default function Amanzoe() {
    return (
        <HotelDetailsTemplate
            name="Amanzoe"
            location="Peloponnese, Greece"
            rating={4.9}
            reviewCount={186}
            price="2,100"
            originalPrice="2,500"
            description="Drawing on classic Greek architecture, Amanzoe’s standalone Pavilions open onto terraces with private plunge pools and views of the surrounding countryside and the sea. Scattered among 93 hectares of olive groves and vineyards, the resort offers a peaceful sanctuary where the history of Greece meets modern minimalist luxury."
            images={[
                "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/db/58/ae/amanzoe-arrival-pavilion.jpg?w=900&h=500&s=1",
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2574&auto=format&fit=crop"
            ]}
            amenities={[
                "Private Plunge Pools",
                "Beach Club",
                "Holistic Spa",
                "Olive Groves",
                "Fine Dining",
                "Wifi",
                "Yoga Pavilion"
            ]}
        />
    );
}
