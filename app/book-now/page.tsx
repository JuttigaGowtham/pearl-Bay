"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { FaUser } from "react-icons/fa";
import SuccessPage from "../Components/Sucess";


interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: number | string;
  roomType: string;
  specialRequests: string;
}

export default function BookNowPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<BookingData>({
    checkIn: "",
    checkOut: "",
    guests: 1,
    roomType: "",
    specialRequests: "",
  });

  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) {
      setLoading(false);
      return;
    }

    const { data: { subscription } } = supabase!.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        setLoading(false);
      } else if (event === 'SIGNED_OUT') {
        router.push("/signup");
      }
    });

    const checkAuth = async () => {
      const { data: { session } } = await supabase!.auth.getSession();
      if (session) {
        // Admin Redirect
        if (session.user.email === "juttigagowtham@gmail.com") {
          router.push("/admin/dashboard");
          return;
        }

        setUser(session.user);

        // Check Profile Approval Status
        const { data: profile, error: profileError } = await supabase!
          .from('profiles')
          .select('is_approved')
          .eq('id', session.user.id)
          .single();

        // If profile missing (first time), create it & notify admin
        if (profileError && profileError.code === 'PGRST116') {
          // Create "pending" profile
          const { error: insertError } = await supabase!.from('profiles').insert([{
            id: session.user.id,
            email: session.user.email,
            is_approved: false
          }]);

          if (insertError) {
            console.error("Error creating profile:", insertError);
          } else {
            // Trigger Admin Email
            try {
              await fetch('/api/notify-admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: session.user.email,
                  userId: session.user.id
                })
              });
            } catch (err) {
              console.error("Failed to notify admin:", err);
            }
          }

          router.push('/pending-approval');
          return;
        }

        // If profile exists but not approved
        if (profile && !profile.is_approved) {
          router.push('/pending-approval');
          return;
        }

        setLoading(false);
      } else {
        // Only redirect if there's no hash (which might contain the magic link token)
        if (!window.location.hash.includes('access_token')) {
          router.push("/signup");
        }
      }
    };

    checkAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingLoading(true);
    setSuccess(false);

    if (!supabase || !user) return;

    const bookingData = {
      user_id: user.id,
      check_in: formData.checkIn,
      check_out: formData.checkOut,
      guests: Number(formData.guests),
      room_type: formData.roomType,
      special_requests: formData.specialRequests?.trim() || null,
    };

    const response = await supabase.from("bookings").insert([bookingData]).select();

    if (!response.error) {
      setSuccess(true);
      setFormData({
        checkIn: "",
        checkOut: "",
        guests: 1,
        roomType: "",
        specialRequests: "",
      });
    }

    setBookingLoading(false);
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  }

  if (success) {
    return <SuccessPage />;
  }

  return (
    <div className="min-h-screen bg-white px-8 py-10 text-black">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow-md border border-gray-200">

        {/* HEADER + SIGNOUT  */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-light tracking-wide text-black">BOOK NOW</h1>
          <div className="flex items-center">
            <button
              onClick={() => router.push("/profile")}
              className="w-10 h-10 border border-[#b5a27a] rounded-full flex items-center justify-center hover:bg-[#e9e4d5]/30 transition mr-4"
              title="View Profile"
            >
              <FaUser className="text-[#b5a27a]" />
            </button>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm text-gray-600 hover:text-[#b5a27a] transition"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* INFO SECTION (two-column like image) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 text-gray-700">

          <div>
            <h3 className="text-sm tracking-wide font-semibold mb-3 text-black">WHY BOOK DIRECT:</h3>
            <ul className="text-sm leading-7">
              <li>- exclusive in-room welcome amenities</li>
              <li>- upsells with discounts & best rate guarantee</li>
              <li>- more flexibility in the booking process</li>
              <li>- more personalized guest experience</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm tracking-wide font-semibold mb-3 text-black">IMPORTANT NOTE:</h3>
            <ul className="text-sm leading-7">
              <li>- adults-only hotel, children welcome from 12 years and above</li>
              <li>- pets are not allowed</li>
            </ul>
          </div>

        </div>

        <hr className="border-gray-300 mb-6" />

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-10">

          {/* Arrival date */}
          <div>
            <label className="block text-sm uppercase tracking-widest text-gray-700 mb-1">
              arrival
            </label>
            <input
              type="date"
              value={formData.checkIn}
              onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
              className="
                w-full bg-transparent border-b border-gray-300 py-2 text-gray-800 
                focus:outline-none focus:border-[#b5a27a] transition
              "
            />
          </div>

          {/* Departure date */}
          <div>
            <label className="block text-sm uppercase tracking-widest text-gray-700 mb-1">
              departure
            </label>
            <input
              type="date"
              value={formData.checkOut}
              onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
              className="
                w-full bg-transparent border-b border-gray-300 py-2 text-gray-800 
                focus:outline-none focus:border-[#b5a27a] transition
              "
            />
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm uppercase tracking-widest text-gray-700 mb-1">
              guests
            </label>
            <input
              type="number"
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              min={1}
              className="
                w-full bg-transparent border-b border-gray-300 py-2 text-gray-800 
                focus:outline-none focus:border-[#b5a27a] transition
              "
            />
          </div>

          {/* Room Type */}
          <div>
            <label className="block text-sm uppercase tracking-widest text-gray-700 mb-1">
              room type
            </label>
            <select
              value={formData.roomType}
              onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
              className="
                w-full bg-transparent border-b border-gray-300 py-2 text-gray-800 
                focus:outline-none focus:border-[#b5a27a] transition
              "
            >
              <option value="">Select room type</option>
              <option value="standard">Standard Room</option>
              <option value="deluxe">Deluxe Room</option>
              <option value="suite">Suite</option>
              <option value="villa">Villa</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={bookingLoading}
              className="
                px-10 py-3 rounded-full border border-[#b5a27a] text-[#b5a27a]
                font-medium tracking-wide hover:bg-[#b5a27a] hover:text-white transition
              "
            >
              {bookingLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>

        {/* Success message */}
        {success && (
          <p className="mt-6 text-green-600 font-medium">
            Booking submitted successfully! We'll contact you soon.
          </p>
        )}
      </div>
    </div>
  );
}
