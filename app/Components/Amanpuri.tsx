"use client";

import HotelDetailsTemplate from "./HotelDetailsTemplate";

export default function Amanpuri() {
    return (
        <HotelDetailsTemplate
            name="Amanpuri"
            location="Phuket, Thailand"
            rating={4.8}
            reviewCount={324}
            price="1,450"
            originalPrice="1,800"
            description="Soundtracked by the whispers of coconut palms and the sighs of the Andaman Sea, Amanpuri’s isolated setting on a peninsula narration boasts its own white-sand beach. As Aman’s flagship property, it reflects the style and elegance of Thai culture. Ancient Ayutthayan architecture informs the design of its pavilions and villas."
            images={[
                "https://images.unsplash.com/photo-1582610116397-edb318620f90?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
            ]}
            amenities={[
                "Private Beach",
                "Holistic Wellness",
                "Thai Dining",
                "Bar",
                "Pool",
                "Wifi",
                "Villas"
            ]}
        />
    );
}
