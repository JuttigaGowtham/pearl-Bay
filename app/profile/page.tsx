"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { FaUser, FaCalendarAlt, FaUsers, FaBed, FaArrowLeft } from "react-icons/fa";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface Booking {
  id: string;
  check_in: string;
  check_out: string;
  guests: number;
  room_type: string;
  special_requests: string | null;
  created_at: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------------- FETCH USER + BOOKINGS ----------------
  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) {
      setError("Supabase is not configured");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      if (!supabase) return;
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return router.push("/signin");

        setUser(session.user);

        // Check Approval
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_approved')
          .eq('id', session.user.id)
          .single();

        if (!profile || !profile.is_approved) {
          // If they somehow have no profile, we could handle it, or just push to pending
          // which handles the "wait" state. 
          // Ideally we push to book-now to create it, but let's just push to pending.
          router.push('/pending-approval');
          return;
        }

        const { data, error } = await supabase
          .from("bookings")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });

        if (error) setError(error.message);
        else setBookings(data || []);
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  // ---------------- HELPERS ----------------

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const roomTypeLabel = (type: string) => ({
    standard: "Standard Room",
    deluxe: "Deluxe Room",
    suite: "Suite",
    villa: "Villa",
  }[type] || type);

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push("/");
  };

  const userName =
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Guest";

  // ---------------- LOADING SCREEN ----------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-[#bfa87c] text-xl font-[cursive]">
        Loading your profile...
      </div>
    );
  }

  // ---------------- VARIANTS ----------------
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const imageVariants: Variants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1.2, ease: "easeOut" } }
  };

  // ---------------- PAGE UI ----------------
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="min-h-screen bg-white text-black flex flex-col lg:flex-row overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >

        {/* --- LEFT SIDE (IMAGE) --- */}
        <div className="w-full lg:w-1/2 relative h-[50vh] lg:h-screen overflow-hidden">
          <motion.img
            src="/amangiri.jpg" // Using an existing image asset
            alt="Profile Background"
            className="absolute inset-0 w-full h-full object-cover"
            variants={imageVariants}
          />
          <div className="absolute inset-0 bg-black/40" />

          <motion.div
            className="absolute bottom-10 left-10 p-6"
            variants={itemVariants}
          >
            <h1 className="text-6xl font-[cursive] text-white tracking-widest mb-4">Pearl Bay</h1>
            <p className="text-xl text-gray-200 font-light tracking-wide">Your Exclusive Sanctuary</p>
          </motion.div>

          {/* Back Button (Moved here) */}
          <motion.button
            onClick={() => router.push("/")}
            className="absolute top-8 left-8 flex items-center gap-3 text-[#bfa87c] hover:text-white transition group z-50 text-lg font-light tracking-widest"
            variants={itemVariants}
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> BACK TO HOME
          </motion.button>

        </div>

        {/* --- RIGHT SIDE (DETAILS) --- */}
        <div className="w-full lg:w-1/2 h-full lg:h-screen overflow-y-auto bg-white p-8 lg:p-16 relative">



          <div className="mt-16 max-w-xl mx-auto">

            {/* User Info Header */}
            <motion.div variants={itemVariants} className="mb-12 flex items-center gap-6 pb-8 border-b border-gray-800">
              <div className="w-20 h-20 rounded-full border-2 border-[#bfa87c] flex items-center justify-center bg-white">
                <FaUser className="text-[#bfa87c] text-3xl" />
              </div>
              <div>
                <h2 className="text-3xl font-serif text-black">{userName}</h2>
                <p className="text-gray-400 mt-1">{user?.email}</p>
                <div className="flex gap-4 mt-4">
                  <button onClick={handleSignOut} className="text-xs text-red-400 hover:text-red-300 tracking-widest uppercase border-b border-red-900 pb-1">Sign Out</button>
                </div>
              </div>
            </motion.div>

            {/* Bookings Title */}
            <motion.div variants={itemVariants} className="flex items-end justify-between mb-8">
              <h3 className="text-2xl font-[cursive] text-[#bfa87c]">Reservations</h3>
              <span className="text-gray-500 text-sm tracking-widest">{bookings.length} {bookings.length === 1 ? 'BOOKING' : 'BOOKINGS'}</span>
            </motion.div>

            {/* Bookings List */}
            <div className="space-y-6">
              {bookings.length === 0 ? (
                <motion.div variants={itemVariants} className="text-center py-16 border border-dashed border-gray-700 rounded-2xl bg-white/5">
                  <FaCalendarAlt className="text-4xl text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-6 font-light">You have no upcoming stays.</p>
                  <button
                    onClick={() => router.push("/book-now")}
                    className="px-8 py-3 rounded-full bg-[#bfa87c] text-black font-semibold hover:bg-white transition"
                  >
                    PLAN YOUR STAY
                  </button>
                </motion.div>
              ) : (
                bookings.map((b, i) => (
                  <motion.div
                    key={b.id}
                    variants={itemVariants}
                    custom={i}
                    className="group bg-white/5 border border-black rounded-2xl p-8 hover:bg-white/10 transition duration-500"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-[#bfa87c] text-xs uppercase tracking-[0.2em] mb-2">Room Type</p>
                        <h4 className="text-2xl font-serif">{roomTypeLabel(b.room_type)}</h4>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mb-2">Status</p>
                        <span className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-xs border border-green-900">CONFIRMED</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 py-6 border-t border-white/10 border-b mb-6">
                      <div>
                        <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Check-in</p>
                        <p className="text-lg font-light">{formatDate(b.check_in)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Check-out</p>
                        <p className="text-lg font-light">{formatDate(b.check_out)}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray">
                      <div className="flex gap-6">
                        <span className="flex items-center gap-2"><FaUsers /> {b.guests} Guests</span>
                        <span className="flex items-center gap-2"><FaBed /> {roomTypeLabel(b.room_type)}</span>
                      </div>
                      <p className="opacity-50 text-xs">Booked on {formatDate(b.created_at)}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

          </div>
        </div>

      </motion.div>
    </AnimatePresence>
  );
}
