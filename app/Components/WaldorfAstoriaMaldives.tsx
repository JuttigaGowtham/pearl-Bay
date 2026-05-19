"use client";

import HotelDetailsTemplate from "./HotelDetailsTemplate";

export default function WaldorfAstoriaMaldives() {
    return (
        <HotelDetailsTemplate
            name="Waldorf Astoria Maldives Ithaafushi"
            location="Maldives"
            rating={4.9}
            reviewCount={500}
            price="2,800"
            originalPrice="3,200"
            description="Waldorf Astoria Maldives Ithaafushi is an exclusive 5-star resort that brings a new level of luxury to the Maldives. Set across three private islands, the resort offers a serene escape for discerning travelers. Experience world-class dining, a lifestyle spa sanctuary, and a wealth of activities for all generations. From the moment you arrive, you will be immersed in a world of exceptional service and beauty."
            images={[
                "https://images.unsplash.com/photo-1578991624414-276ef23a534f?q=80&w=2527&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2670&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop"
            ]}
            amenities={[
                "5-Star Luxury",
                "11 Dining Venues",
                "Infinity Pools",
                "Private Islands",
                "Spa Sanctuary",
                "Ocean Views",
                "Family Activities"
            ]}
        />
    );
}
