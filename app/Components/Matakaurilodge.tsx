"use client";

import HotelDetailsTemplate from "./HotelDetailsTemplate";

export default function Matakaurilodge() {
    return (
        <HotelDetailsTemplate
            name="Matakauri Lodge"
            location="Queenstown, New Zealand"
            rating={4.8}
            reviewCount={320}
            price="1,600"
            originalPrice="1,900"
            description="Spectacularly situated on Lake Wakatipu, Matakauri Lodge offers an alpine experience like no other. With views of 'The Remarkables', 'Ceciles Peak', and 'Walter Peak', the lodge is an enclave of serenity. Stylishly designed by Virginia Fisher, the lodge creates a cozy yet sophisticated atmosphere, perfect for unwinding after exploring the Queenstown landscape."
            images={[
                "https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop",
                "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/50/bf/3c/matakauri-lodge.jpg?w=900&h=500&s=1",
                "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
            ]}
            amenities={[
                "Mountain Views",
                "Lake Wakatipu",
                "Fine Dining",
                "Spa",
                "Skiing",
                "Wifi",
                "Private Guides"
            ]}
        />
    );
}
