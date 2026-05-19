"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCommentDots,
  FaTimes,
  FaPaperPlane,
  FaRobot,
  FaTrash,
  FaUser,
  FaEllipsisH,
  FaRegSmile,
  FaRedo,
  FaPowerOff,
  FaHistory,
} from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  hasAnimated?: boolean;
}

const Typewriter = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    // Faster speed for longer text
    const speed = text.length > 100 ? 10 : 20;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{display}</span>;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to the Peral bay’s AI concierge. Please note that all responses are being provided by the use of generative AI and the hotel cannot guarantee the accuracy of the responses. Please contact the hotel directly at +390898131333 for any questions relating to reservations or cancellation policies. By continuing to use this chat, you agree that we may use and record your chat to help us continually improve its results. How can I help you?",
      sender: "bot",
      hasAnimated: true, // Skip animation for welcome message
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [userInitial, setUserInitial] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!supabase) return;
        // Check if session exists securely
        const sessionResponse = await supabase.auth.getSession();
        const session = sessionResponse.data.session;

        if (session?.user) {
          setUserAvatar(session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || null);
          const name = session.user.user_metadata?.name || session.user.email || "?";
          setUserInitial(name[0].toUpperCase());
        }
      } catch (error) {
        // Silently match failed fetch if offline/misconfigured to avoid crashing UI
        console.warn("Unable to fetch Supabase session:", error);
      }
    };
    fetchUser();
  }, []);

  /* ================= SCROLL ================= */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  /* ================= CLEAR CHAT ================= */
  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        text: "Chat cleared. How can I help you?",
        sender: "bot",
        hasAnimated: false,
      },
    ]);
    setIsMenuOpen(false);
  };

  const handleEndChat = () => {
    setIsOpen(false);
    setIsMenuOpen(false);
  };

  const handleViewRecentChats = () => {
    // Placeholder for feature
    alert("Recent chats feature coming soon.");
    setIsMenuOpen(false);
  };

  const handleAnimationComplete = (id: number) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, hasAnimated: true } : msg))
    );
  };

  /* ================= SEND MESSAGE ================= */
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput("");

    const userMsg: Message = {
      id: Date.now(),
      text: userText,
      sender: "user",
      hasAnimated: true,
    };

    // Optimistic UI update
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // 🔑 Convert to Gemini history format (excluding current user msg)
      const history = messages
        .filter((msg) => msg.id !== 1) // Exclude initial welcome message to avoid "role: model" at start
        .map((msg) => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history,
        }),
      });

      const data = await response.json();

      const botMsg: Message = {
        id: Date.now() + 1,
        text:
          data.text ||
          "I’m here to assist with Pearl Bay bookings, suites, and amenities.",
        sender: "bot",
        hasAnimated: false,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          text: "Apologies — I’m unable to connect at the moment. Please try again shortly.",
          sender: "bot",
          hasAnimated: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* ================= TOGGLE BUTTON ================= */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <FaTimes /> : <FaCommentDots />}
      </motion.button>

      {/* ================= CHAT WINDOW ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 font-sans"
          >
            {/* ================= HEADER ================= */}
            <div className="bg-white p-4 flex items-center justify-between border-b border-gray-100 relative">
              <h3 className="text-md font-semibold text-gray-800">
                Your Pearl Bay Personal Assistant
              </h3>

              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-600 hover:bg-gray-100 p-1 rounded-full transition-colors"
                >
                  <FaEllipsisH />
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white shadow-lg rounded-lg py-2 z-50 border border-gray-100">
                    <button
                      onClick={clearChat}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                    >
                      <FaRedo className="text-gray-400" /> Start new chat
                    </button>
                    <button
                      onClick={clearChat}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                    >
                      <FaTrash className="text-gray-400" /> Clear chat
                    </button>
                    <button
                      onClick={handleEndChat}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                    >
                      <FaPowerOff className="text-gray-400" /> End chat
                    </button>
                    <button
                      onClick={handleViewRecentChats}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                    >
                      <FaHistory className="text-gray-400" /> View recent chats
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ================= MESSAGES ================= */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-white">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  {msg.sender === "bot" && (
                    <span className="text-xs font-semibold text-gray-800 mb-1 ml-1">
                      Your Pearl Bay Personal Assistant
                    </span>
                  )}

                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed
                    ${msg.sender === "user"
                        ? "bg-gray-800 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-tl-none"
                      }`}
                  >
                    {msg.sender === "bot" && !msg.hasAnimated ? (
                      <Typewriter
                        text={msg.text}
                        onComplete={() => handleAnimationComplete(msg.id)}
                      />
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-500 rounded-2xl p-4 text-sm animate-pulse">
                    Typing...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ================= INPUT ================= */}
            <div className="p-4 bg-white border-t border-gray-100 relative">
              <AnimatePresence>
                {showEmojiPicker && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute bottom-full left-0 mb-4 z-50 shadow-2xl rounded-2xl"
                  >
                    <EmojiPicker
                      onEmojiClick={(emojiData) =>
                        setInput((prev) => prev + emojiData.emoji)
                      }
                      width={320}
                      height={400}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <form
                onSubmit={handleSend}
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm focus-within:ring-1 focus-within:ring-gray-300 transition-all"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Message..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
                />

                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className={`transition-colors ${showEmojiPicker
                    ? "text-yellow-500"
                    : "text-gray-400 hover:text-gray-600"
                    }`}
                >
                  <FaRegSmile className="text-lg" />
                </button>

                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="text-gray-400 hover:text-blue-500 disabled:opacity-50 transition-colors"
                >
                  <FaPaperPlane className="text-lg" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
