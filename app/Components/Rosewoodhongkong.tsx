"use client";

import HotelDetailsTemplate from "./HotelDetailsTemplate";

export default function Rosewoodhongkong() {
    return (
        <HotelDetailsTemplate
            name="Rosewood Hong Kong"
            location="Victoria Dockside, Hong Kong"
            rating={4.9}
            reviewCount={210}
            price="700"
            originalPrice="850"
            description="Soaring over Victoria Harbour, Rosewood Hong Kong is a new global icon for the ultra-luxury brand. The hotel occupies 43 floors of a multi-use tower, offering panoramic views of the water and the city. Designed by Tony Chi, the interiors celebrate Hong Kong's impressive verticality while maintaining a residential feel. Discover Asaya, our integrative wellness concept, or enjoy a drink at DarkSide. From the Manor Club executive lounge to the expansive suites, every detail reflects a sophisticated, modern interpretation of the Rosewood lifestyle."
            images={[
                "https://lh3.googleusercontent.com/p/AF1QipNJYQQBgamUBdFihZ1dBDUhRs5uLY-dhWPUJif2=w324-h312-n-k-no",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Victoria_Dockside_night_view_201908.jpg/330px-Victoria_Dockside_night_view_201908.jpg",
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2070&auto=format&fit=crop"
            ]}
            amenities={[
                "Harbour Views",
                "DarkSide Bar",
                "Asaya Wellness",
                "Manor Club",
                "Infinity Pool",
                "Fine Dining",
                "43 Floors"
            ]}
        />
    );
}
