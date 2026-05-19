"use client";

import HotelDetailsTemplate from "./HotelDetailsTemplate";

export default function Nihisumba() {
    return (
        <HotelDetailsTemplate
            name="Nihi Sumba"
            location="Sumba Island, Indonesia"
            rating={4.8}
            reviewCount={245}
            price="1,450"
            originalPrice="1,700"
            description="Nihi Sumba is not an escape from everyday life. It is the return to a life well lived. Located on the remote island of Sumba, it is a place where rugged luxury meets unregulated freedom. Experience the 'Edge of Wildness' with world-class surfing on Occy's Left, sunset rides with our Sandalwood horses, and spa safaris that last all day."
            images={[
                "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=2574&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2574&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2574&auto=format&fit=crop"
            ]}
            amenities={[
                "Private Pool",
                "Sandalwood Stables",
                "Occy's Left Surf",
                "Spa Safari",
                "Butler Service",
                "Water Sports",
                "Fine Dining"
            ]}
        />
    );
}
