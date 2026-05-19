"use client";

import HotelDetailsTemplate from "./HotelDetailsTemplate";

export default function RoyalMansour() {
    return (
        <HotelDetailsTemplate
            name="Royal Mansour"
            location="Marrakech, Morocco"
            rating={4.9}
            reviewCount={180}
            price="1,500"
            originalPrice="1,800"
            description="Born from a vision to create a spectacular masterpiece, Royal Mansour Marrakech is an enclave of 53 private riads, where the concept of a hotel room is replaced by your own private palace. Wander through the winding alleyways, discover the sensory delights of the spa, and enjoy total privacy as our staff moves unseen through a network of underground tunnels. Every riad is unique, featuring distinctive Moroccan craftsmanship, intricate mosaics, and lush roof terraces with views of the Atlas Mountains or the Koutoubia Mosque."
            images={[
                "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop",
                "/royal.jpg",
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2070&auto=format&fit=crop"
            ]}
            amenities={[
                "53 Private Riads",
                "Royal Spa",
                "Underground Tunnels",
                "Roof Terraces",
                "Fine Dining",
                "Moroccan Gardens",
                "Butler Service"
            ]}
        />
    );
}
