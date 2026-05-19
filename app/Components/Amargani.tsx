"use client";

import HotelDetailsTemplate from "./HotelDetailsTemplate";

export default function Amargani() {
  return (
    <HotelDetailsTemplate
      name="Amangiri" // Correct name based on content (Amargani seems to be a tyop/alias for Amangiri in the project context)
      location="Canyon Point, Utah"
      rating={4.8}
      reviewCount={324}
      price="1,200"
      originalPrice="1,500"
      description="Nestled within the canyons of the American Southwest, Amangiri offers a retreat into nature's quiet majesty. Designed to blend seamlessly with the landscape, every suite offers panoramic views of the stratified rock and changing light. Built with a philosophy of mindful luxury, the retreat invites guests to disconnect from the noise of modern life."
      images={[
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop"
      ]}
      amenities={[
        "Restaurant",
        "Bar",
        "Spa & Wellness",
        "Private Guides",
        "Concierge",
        "Wifi",
        "Pool"
      ]}
    />
  );
}
