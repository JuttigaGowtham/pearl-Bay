"use client";

import HotelDetailsTemplate from "./HotelDetailsTemplate";

export default function OneAndOnlyReethiRah() {
    return (
        <HotelDetailsTemplate
            name="One&Only Reethi Rah"
            location="Maldives"
            rating={4.9}
            reviewCount={385}
            price="2,800"
            originalPrice="3,200"
            description="One&Only Reethi Rah is an ultra-luxury all-villa resort in the North Malé Atoll, surrounded by the crystal blue waters of the Indian Ocean. Experience unprecedented privacy and personalized service. With 12 pristine beaches and miles of coastline, explore the island's natural beauty or relax in your private villa sanctuary."
            images={[
                "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2664&auto=format&fit=crop",
                "https://assets.kerzner.com/api/public/content/bec49cd243f94d6e93917f1afcdeba2c?v=62190df5&t=w576",
                "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
            ]}
            amenities={[
                "12 Beaches",
                "Water Villas",
                "ESPA Spa",
                "KidsClub",
                "Scuba Diving",
                "Fine Dining",
                "Tennis Courts"
            ]}
        />
    );
}
