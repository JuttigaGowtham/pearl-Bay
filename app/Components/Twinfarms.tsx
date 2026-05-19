"use client";

import HotelDetailsTemplate from "./HotelDetailsTemplate";

export default function Twinfarms() {
  return (
    <HotelDetailsTemplate
      name="Twin Farms"
      location="Barnard, Vermont"
      rating={4.9}
      reviewCount={215}
      price="2,500"
      originalPrice="2,800"
      description="Twin Farms is an intimate, all-inclusive country hotel amidst 300 acres of meadows and woodlands in Vermont. It is an artful retreat where every season offers a new way to connect with nature and oneself. Customized experiences and dining ensure a stay that is entirely your own."
      images={[
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop", // Placeholder image 1
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop", // Placeholder image 2
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"  // Placeholder image 3
      ]}
      amenities={[
        "All-Inclusive Dining",
        "Spa",
        "Private Ski Lines",
        "Hiking Trails",
        "Canoeing",
        "Wifi",
        "Fireplace"
      ]}
    />
  );
}
