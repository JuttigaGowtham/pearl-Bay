"use client";

import HotelDetailsTemplate from "./HotelDetailsTemplate";

export default function Sixsenseszighybay() {
    return (
        <HotelDetailsTemplate
            name="Six Senses Zighy Bay"
            location="Musandam Peninsula, Oman"
            rating={4.8}
            reviewCount={140}
            price="1,100"
            originalPrice="1,300"
            description="Nestled between dramatic mountains and a sandy beach on Oman's Musandam Peninsula, Six Senses Zighy Bay offers a village-style resort experience that is both culturally authentic and luxuriously modern. Arrive by 4x4 drive, speed boat, or for the adventurous, a paraglider flight down into the bay. Experience the indigenous village-style accommodations and world-famous Six Senses Spa. The resort features 82 village-style pool villas, blending traditional Omani architecture with modern amenities. Each villa offers privacy and a personal butler service."
            images={[
                "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=2664&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1974&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2664&auto=format&fit=crop"
            ]}
            amenities={[
                "Paraglide Arrival",
                "Holistic Spa",
                "Pool Villas",
                "Private Butler",
                "4x4 Access",
                "Beachfront",
                "Organic Garden"
            ]}
        />
    );
}
