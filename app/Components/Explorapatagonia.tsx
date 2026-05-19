"use client";

import HotelDetailsTemplate from "./HotelDetailsTemplate";

export default function Explorapatagonia() {
    return (
        <HotelDetailsTemplate
            name="Explora Patagonia"
            location="Torres del Paine, Chile"
            rating={4.7}
            reviewCount={452}
            price="1,800"
            originalPrice="2,200"
            description="Anchored like a white ship on the shores of Lake Pehoé, Explora Patagonia has a unique location in the center of the Torres del Paine National Park. Our lodge is designed to link man with temporary space—present and past—and the mysteries of nature. It offers breathtaking views of the Paine Massif and two waterfalls connecting the lakes."
            images={[
                "https://images.adsttc.com/media/images/571c/22d4/e58e/ce28/2300/00a6/large_jpg/HOTEL_EN_PATAGONIA_01.jpg?1461461708",
                "https://images.adsttc.com/media/images/571c/233f/e58e/ce28/2300/00ac/newsletter/HOTEL_EN_PATAGONIA_08.jpg?1461461817",
                "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2574&auto=format&fit=crop"
            ]}
            amenities={[
                "Guided Explorations",
                "Paine Massif Views",
                "Horseback Riding",
                "Spa",
                "Restaurant",
                "Bar",
                "Wifi"
            ]}
        />
    );
}
