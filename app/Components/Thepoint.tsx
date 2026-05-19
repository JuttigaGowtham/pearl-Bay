"use client";

import HotelDetailsTemplate from "./HotelDetailsTemplate";

export default function ThePoint() {
    return (
        <HotelDetailsTemplate
            name="The Point"
            location="Adirondacks, New York"
            rating={5.0}
            reviewCount={120}
            price="2,500"
            originalPrice="3,000"
            description="Deep in the Adirondacks, The Point was originally built as a Camp for the Rockefellers. Today, it stands as the only Forbes Five-Star property in upstate New York, offering a seamless blend of rustic wilderness and refined luxury. Experience the 'Great Camp' era of the 19th century, where days are spent on the lake or in the woods, and evenings are celebrated with black-tie dining in the Great Hall. It is a place of timeless elegance and profound peace."
            images={[
                "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?q=80&w=2715&auto=format&fit=crop"
            ]}
            amenities={[
                "Wilderness Estate",
                "Lake Saranac",
                "11 Guest Rooms",
                "Black-Tie Dining",
                "Log Mansions",
                "Stone Fireplaces",
                "5-Star Service"
            ]}
        />
    );
}
