"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaTimes, FaSignOutAlt, FaUserShield, FaSearch, FaSpinner, FaClipboardList, FaUsers, FaHotel, FaTrash, FaEdit } from "react-icons/fa";

interface UserProfile {
    id: string;
    email: string | null;
    is_approved: boolean | null;
    created_at: string;
}

interface FoundingRequest {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    status: "pending" | "approved" | "rejected";
    created_at: string;
}

interface Hotel {
    id: string;
    name: string;
    location: string;
    description: string;
    image_url: string;
    price: string;
    website_url?: string;
    created_at: string;
}

const ADMIN_EMAIL = "juttigagowtham@gmail.com";

export default function AdminDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<"users" | "requests" | "hotels">("requests");

    // Data
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [requests, setRequests] = useState<FoundingRequest[]>([]);
    const [hotels, setHotels] = useState<Hotel[]>([]);

    // Form for new hotel
    const [newHotel, setNewHotel] = useState({ name: "", location: "", price: "", website_url: "", description: "" });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [editingHotelId, setEditingHotelId] = useState<string | null>(null);

    const [filter, setFilter] = useState<"all" | "pending" | "approved">("pending");
    const [searchTerm, setSearchTerm] = useState("");
    const [processingId, setProcessingId] = useState<string | null>(null);

    useEffect(() => {
        checkAdmin();

        const interval = setInterval(() => {
            if (viewMode === "users") fetchUsers();
            else if (viewMode === "hotels") fetchHotels();
            else fetchRequests();
        }, 5000);

        return () => clearInterval(interval);
    }, [viewMode]);

    const checkAdmin = async () => {
        const { data: { session } } = await supabase!.auth.getSession();
        if (!session || session.user.email !== ADMIN_EMAIL) {
            router.push("/book-now"); // Redirect non-admins
            return;
        }
        // Initial fetch
        fetchRequests();
        fetchUsers();
        fetchHotels();
    };

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/admin/users");
            const data = await res.json();
            if (data.users) setUsers(data.users);
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRequests = async () => {
        try {
            const res = await fetch("/api/admin/founding-requests");
            const data = await res.json();
            if (data.requests) setRequests(data.requests);
        } catch (error) {
            console.error("Failed to fetch requests", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchHotels = async () => {
        try {
            const res = await fetch("/api/hotels");
            const data = await res.json();
            if (data.hotels) setHotels(data.hotels);
        } catch (error) {
            console.error("Failed to fetch hotels", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveHotel = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingHotelId && !imageFile) {
            alert("Please select an image");
            return;
        }

        setProcessingId("save-hotel");
        try {
            let publicUrl = editingHotelId ? hotels.find(h => h.id === editingHotelId)?.image_url : "";

            // 1. Upload Image (if new file selected)
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const { error: uploadError } = await supabase!.storage
                    .from('hotel-images')
                    .upload(fileName, imageFile);

                if (uploadError) throw uploadError;

                const { data } = supabase!.storage
                    .from('hotel-images')
                    .getPublicUrl(fileName);
                publicUrl = data.publicUrl;
            }

            // 2. Save to DB
            const method = editingHotelId ? "PUT" : "POST";
            const body = {
                ...newHotel,
                image_url: publicUrl,
                id: editingHotelId
            };

            const res = await fetch("/api/hotels", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                setNewHotel({ name: "", location: "", price: "", website_url: "", description: "" });
                setImageFile(null);
                setEditingHotelId(null);
                fetchHotels();
                alert(editingHotelId ? "Hotel updated successfully" : "Hotel added successfully");
            } else {
                const errorData = await res.json();
                alert(`Failed to save hotel: ${errorData.error || "Unknown error"}`);
            }
        } catch (err: any) {
            console.error(err);
            alert("Error: " + err.message);
        } finally {
            setProcessingId(null);
        }
    };

    const startEditing = (hotel: Hotel) => {
        setNewHotel({
            name: hotel.name,
            location: hotel.location,
            price: hotel.price,
            website_url: hotel.website_url || "",
            description: hotel.description
        });
        setEditingHotelId(hotel.id);
        setImageFile(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEditing = () => {
        setNewHotel({ name: "", location: "", price: "", website_url: "", description: "" });
        setEditingHotelId(null);
        setImageFile(null);
    };

    const handleDeleteHotel = async (id: string) => {
        if (!confirm("Are you sure you want to delete this hotel?")) return;

        setProcessingId(id);
        try {
            const res = await fetch(`/api/hotels?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setHotels(hotels.filter(h => h.id !== id));
            } else {
                alert("Failed to delete hotel");
            }
        } catch (error) {
            console.error("Delete error", error);
            alert("Delete failed");
        } finally {
            setProcessingId(null);
        }
    };

    const handleUserAction = async (userId: string, action: "approve" | "reject") => {
        setProcessingId(userId);
        try {
            const res = await fetch("/api/admin/action", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, action }),
            });

            if (res.ok) {
                if (action === "reject") {
                    setUsers(users.filter((u) => u.id !== userId));
                } else {
                    setUsers(users.map((u) => (u.id === userId ? { ...u, is_approved: true } : u)));
                }
            } else {
                alert("Action failed");
            }
        } catch (error) {
            console.error("Action error", error);
        } finally {
            setProcessingId(null);
        }
    };

    const handleRequestAction = async (id: string, action: "approve" | "reject") => {
        setProcessingId(id);
        try {
            const res = await fetch("/api/admin/founding-requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, action }),
            });

            if (res.ok) {
                const status = action === "approve" ? "approved" : "rejected";
                setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
            } else {
                alert("Action failed");
            }
        } catch (error) {
            console.error("Action error", error);
        } finally {
            setProcessingId(null);
        }
    };

    const handleSignOut = async () => {
        await supabase!.auth.signOut();
        router.push("/");
    };

    // Filter Logic
    const getFilteredData = () => {
        if (viewMode === "users") {
            return users
                .filter((user) => {
                    if (filter === "pending") return !user.is_approved;
                    if (filter === "approved") return user.is_approved;
                    return true;
                })
                .filter((user) => user.email?.toLowerCase().includes(searchTerm.toLowerCase()));
        } else {
            return requests
                .filter((req) => {
                    if (filter === "pending") return req.status === "pending";
                    if (filter === "approved") return req.status === "approved";
                    return true;
                })
                .filter((req) =>
                    req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    req.full_name.toLowerCase().includes(searchTerm.toLowerCase())
                );
        }
    }

    const filteredData = getFilteredData();

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-[#bfa87c]">
                <FaSpinner className="animate-spin text-4xl" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-[#bfa87c] selection:text-black">
            {/* Navbar */}
            <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#bfa87c] flex items-center justify-center text-black">
                            <FaUserShield className="text-xl" />
                        </div>
                        <div>
                            <h1 className="text-xl font-serif text-[#bfa87c] tracking-wide">Admin Dashboard</h1>
                            <p className="text-xs text-gray-500">Manage Membership Requests</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition text-sm"
                    >
                        <FaSignOutAlt /> Sign Out
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-10">

                {/* View Toggles */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setViewMode("requests")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition ${viewMode === 'requests' ? 'bg-[#bfa87c] text-black border-[#bfa87c]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                    >
                        <FaClipboardList /> Founding Requests
                    </button>
                    <button
                        onClick={() => setViewMode("users")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition ${viewMode === 'users' ? 'bg-[#bfa87c] text-black border-[#bfa87c]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                    >
                        <FaUsers /> Auth Users
                    </button>
                    <button
                        onClick={() => setViewMode("hotels")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition ${viewMode === 'hotels' ? 'bg-[#bfa87c] text-black border-[#bfa87c]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                    >
                        <FaHotel /> Manage Hotels
                    </button>
                </div>

                {viewMode === "hotels" ? (
                    <div className="space-y-10">
                        {/* Add/Edit Hotel Form */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-serif text-[#bfa87c]">
                                    {editingHotelId ? "Edit Hotel" : "Add New Hotel"}
                                </h2>
                                {editingHotelId && (
                                    <button onClick={cancelEditing} className="text-sm text-gray-400 hover:text-white">
                                        Cancel Edit
                                    </button>
                                )}
                            </div>
                            <form onSubmit={handleSaveHotel} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    placeholder="Hotel Name"
                                    required
                                    value={newHotel.name}
                                    onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
                                    className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#bfa87c] outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Location (e.g. Utah, USA)"
                                    required
                                    value={newHotel.location}
                                    onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })}
                                    className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#bfa87c] outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Price (e.g. $500/night)"
                                    required
                                    value={newHotel.price}
                                    onChange={(e) => setNewHotel({ ...newHotel, price: e.target.value })}
                                    className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#bfa87c] outline-none"
                                />
                                <input
                                    type="url"
                                    placeholder="Website URL (https://...)"
                                    value={newHotel.website_url}
                                    onChange={(e) => setNewHotel({ ...newHotel, website_url: e.target.value })}
                                    className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#bfa87c] outline-none"
                                />
                                {/* File Input */}
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        required={!editingHotelId} // Not required if editing
                                        onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#bfa87c] outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#bfa87c] file:text-black hover:file:bg-[#a38b60]"
                                    />
                                    <p className="absolute top-full text-xs text-gray-500 mt-1">
                                        {editingHotelId ? "Upload new image (optional)" : "Upload hotel image"}
                                    </p>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Description"
                                    required
                                    value={newHotel.description}
                                    onChange={(e) => setNewHotel({ ...newHotel, description: e.target.value })}
                                    className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#bfa87c] outline-none"
                                />
                                <div className="md:col-span-2">
                                    <button
                                        type="submit"
                                        disabled={!!processingId}
                                        className="px-8 py-3 bg-[#bfa87c] text-black font-medium rounded-lg hover:bg-[#a38b60] transition disabled:opacity-50"
                                    >
                                        {processingId === "save-hotel" ? "Saving..." : (editingHotelId ? "Update Hotel" : "Add Hotel")}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Hotels List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {hotels.map(hotel => (
                                <div key={hotel.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-4">
                                    <div className="relative h-40 w-full overflow-hidden rounded-lg bg-white/10">
                                        {/* Minimal image preview if valid url */}
                                        <img src={hotel.image_url} alt={hotel.name} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = "")} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-[#bfa87c] flex items-center gap-2">
                                            {hotel.name}
                                            {hotel.website_url && (
                                                <a href={hotel.website_url} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm">
                                                    ↗
                                                </a>
                                            )}
                                        </h3>
                                        <p className="text-xs text-gray-400 mb-2">{hotel.location} • {hotel.price}</p>
                                        <p className="text-sm text-gray-300 line-clamp-2">{hotel.description}</p>
                                    </div>
                                    <div className="mt-auto self-end flex items-center gap-3">
                                        <button
                                            onClick={() => startEditing(hotel)}
                                            className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 transition"
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteHotel(hotel.id)}
                                            disabled={processingId === hotel.id}
                                            className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition disabled:opacity-50"
                                        >
                                            {processingId === hotel.id ? <FaSpinner className="animate-spin" /> : <FaTrash />} Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Stats / Actions (Only for Users/Requests) */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                            <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
                                {(["pending", "approved", "all"] as const).map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`
                  px-6 py-2 rounded-full text-sm font-medium transition
                  ${filter === f ? "bg-[#bfa87c] text-black shadow-lg" : "text-gray-400 hover:text-white"}
                `}
                                    >
                                        {f.charAt(0).toUpperCase() + f.slice(1)}
                                    </button>
                                ))}
                            </div>

                            <div className="relative w-full md:w-auto">
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full md:w-80 pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-600 focus:outline-none focus:border-[#bfa87c] transition"
                                />
                            </div>
                        </div>

                        {/* List */}
                        <div className="grid gap-4">
                            <AnimatePresence>
                                {filteredData.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="text-center py-20 text-gray-500"
                                    >
                                        No items found.
                                    </motion.div>
                                ) : (
                                    filteredData.map((item: any) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/[0.07] transition"
                                        >
                                            <div className="flex items-center gap-4 w-full md:w-auto flex-1">
                                                <div className={`w-3 h-3 rounded-full ${(viewMode === 'users' ? item.is_approved : item.status === 'approved') ? 'bg-green-500' :
                                                    (viewMode === 'requests' && item.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500')
                                                    }`} />
                                                <div className="flex-1">
                                                    {viewMode === "requests" ? (
                                                        <>
                                                            <h3 className="text-lg font-medium text-white">{item.full_name}</h3>
                                                            <p className="text-sm text-[#bfa87c]">{item.email}</p>
                                                            <p className="text-xs text-gray-500">{item.phone}</p>
                                                        </>
                                                    ) : (
                                                        <h3 className="text-lg font-medium text-white">{item.email}</h3>
                                                    )}

                                                    <p className="text-xs text-gray-600 mt-1">
                                                        {new Date(item.created_at).toLocaleDateString()}
                                                        {viewMode === "requests" && <span className="ml-2 uppercase text-[10px] tracking-wider border border-white/10 px-2 py-0.5 rounded">{item.status}</span>}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-3 w-full md:w-auto">
                                                {(viewMode === 'users' ? !item.is_approved : item.status === 'pending') ? (
                                                    <>
                                                        <button
                                                            onClick={() => viewMode === 'users' ? handleUserAction(item.id, "approve") : handleRequestAction(item.id, "approve")}
                                                            disabled={!!processingId}
                                                            className="flex-1 md:flex-none px-6 py-2 rounded-full bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500 hover:text-black transition flex items-center justify-center gap-2 disabled:opacity-50"
                                                        >
                                                            {processingId === item.id ? <FaSpinner className="animate-spin" /> : <><FaCheck /> Approve</>}
                                                        </button>
                                                        <button
                                                            onClick={() => viewMode === 'users' ? handleUserAction(item.id, "reject") : handleRequestAction(item.id, "reject")}
                                                            disabled={!!processingId}
                                                            className="flex-1 md:flex-none px-6 py-2 rounded-full bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-black transition flex items-center justify-center gap-2 disabled:opacity-50"
                                                        >
                                                            {processingId === item.id ? <FaSpinner className="animate-spin" /> : <><FaTimes /> Reject</>}
                                                        </button>
                                                    </>
                                                ) : (
                                                    <span className="px-4 py-2 rounded-full bg-white/5 text-gray-400 border border-white/10 text-sm">
                                                        {(viewMode === 'users' ? item.is_approved : item.status === 'approved') ? "Approved" : "Rejected"}
                                                    </span>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </AnimatePresence>
                        </div>

                    </>
                )}
            </main>
        </div>
    );
}
