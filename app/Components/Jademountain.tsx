"use client";

import HotelDetailsTemplate from "./HotelDetailsTemplate";

export default function Jademountain() {
    return (
        <HotelDetailsTemplate
            name="Jade Mountain"
            location="Soufrière, Saint Lucia"
            rating={4.9}
            reviewCount={612}
            price="2,650"
            originalPrice="3,000"
            description="Rising majestically above the 600-acre beachfront resort of Anse Chastanet, Jade Mountain Resort on St. Lucia’s south-western Caribbean coastline is a cornucopia of organic architecture celebrating St. Lucia’s stunning scenic beauty. The bold architectural design – individual bridges leading to exceptional infinity pool sanctuaries – makes Jade Mountain one of the Caribbean’s most mesmerizing resort experiences."
            images={[
                "https://images.unsplash.com/photo-1582610116397-edb318620f90?q=80&w=2070&auto=format&fit=crop",
                "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/3b/fc/2f/jade-mountain-resort.jpg?w=900&h=500&s=1",
                "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
            ]}
            amenities={[
                "Infinity Pool Sanctuaries",
                "Piton Views",
                "Spa",
                "Butlers (Major Domos)",
                "Beach Access",
                "Fine Dining",
                "Scuba Diving"
            ]}
        />
    );
}
