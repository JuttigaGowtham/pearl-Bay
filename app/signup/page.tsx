"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { FaApple, FaMagic } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // NOTE: call this only client-side (in browser)
  const handleProviderLogin = async (provider: "apple" | "google") => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      if (!supabase) {
        setError("Supabase client not initialized.");
        setLoading(false);
        return;
      }

      // signInWithOAuth returns { data, error } in newer supabase-js
      const redirectTo = `${window.location.origin}/book-now`;

      const result = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
        },
      });

      
      console.log("signInWithOAuth result:", result);

      // result may be { data: { url }, error } or similar.
      if (result.error) {
        const err = result.error;
        // Friendly messages for common cases
        if (
          err.message?.includes("Unsupported provider") ||
          err.message?.includes("provider is not enabled")
        ) {
          setError(
            `${provider === "apple" ? "Apple" : "Google"} Login is NOT enabled in your Supabase Dashboard. Please enable it in Authentication > Providers and add the Google credentials from Google Cloud Console.`
          );
        } else {
          setError(err.message || "OAuth error. Check console for details.");
        }
        setLoading(false);
        return;
      }

      // If Supabase returned a URL to redirect to, open it
      const maybeUrl =
        // @ts-ignore - shape may vary by SDK version
        result?.data?.url || result?.data?.providerUrl || result?.url;

      if (maybeUrl) {
        // Directly navigate the browser to the OAuth URL (fallback)
        window.location.href = maybeUrl;
        return; // browser redirect will happen
      }

      
      setMessage("Opening provider sign-in. If nothing happens, check popup blocker or console.");
      setLoading(false);
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error("handleProviderLogin error:", err);
      setError(err?.message || "Unknown error during OAuth login.");
      setLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setError("Supabase client not initialized.");
      return;
    }
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const { error: signError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/book-now`,
          shouldCreateUser: true,
        },
      });

      if (signError) {
        setError(signError.message);
      } else {
        setMessage("Magic link sent! Check your email to login.");
      }
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error("magic link error:", err);
      setError(err?.message || "Error sending magic link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-black opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]">

      {/* IMAGE SIDE */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="/sigin.jpg"
          alt="Pearl Bay Hotel"
          className="w-full h-full object-cover transition-all duration-700 ease-in-out hover:scale-105 animate-[imgZoom_1s_ease-out]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-5xl font-serif tracking-wide">Pearl Bay</h1>
          <p className="text-lg opacity-80">Exclusive Luxury Stays</p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="absolute top-8 left-8 flex items-center gap-3 text-[#bfa87c] hover:text-white transition group z-50 text-lg font-light tracking-widest"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> BACK TO HOME
        </button>
      </div>

      {/* FORM SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md bg-black/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/10 text-white opacity-0 animate-[fadeSlide_1s_ease-out_forwards]">

          <div className="lg:hidden text-center mb-10">
            <h1 className="text-4xl font-serif">Pearl Bay</h1>
            <p className="text-gray-300">Exclusive Luxury Stays</p>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold tracking-wide">Welcome</h2>
            <p className="text-gray-400 mt-2">Login once, stay forever.</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-700/20 border border-red-500 text-red-300 rounded-lg text-center text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 p-4 bg-green-700/20 border border-green-500 text-green-300 rounded-lg text-center">
              {message}
            </div>
          )}

          {!message ? (
            <div className="space-y-4">

              {/* Apple Login */}
              <button
                onClick={() => handleProviderLogin("apple")}
                disabled={loading}
                className="
                  w-full py-3 rounded-full bg-white text-black font-bold text-lg 
                  shadow-lg hover:bg-gray-200 transition transform hover:scale-[1.02]
                  flex items-center justify-center gap-3
                "
              >
                <FaApple className="text-2xl" />
                <span>Continue with Apple</span>
              </button>

              {/* Google Login (Alternative) */}
              <button
                onClick={() => handleProviderLogin("google")}
                disabled={loading}
                className="
                  w-full py-3 rounded-full bg-white text-black font-bold text-lg 
                  shadow-lg hover:bg-gray-200 transition transform hover:scale-[1.02]
                  flex items-center justify-center gap-3
                "
              >
                <FcGoogle className="text-2xl" />
                <span>Continue with Google</span>
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-600"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">Or use email</span>
                <div className="flex-grow border-t border-gray-600"></div>
              </div>

              {/* Magic Link Form */}
              <form onSubmit={handleMagicLink} className="space-y-4">
                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
                      w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20 
                      text-white placeholder-gray-400 transition focus:border-white focus:ring-2 focus:ring-white/40 outline-none
                      text-lg
                    "
                    placeholder="name@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="
                    w-full py-4 rounded-full bg-gradient-to-r from-[#b5a27a] to-[#9d8b65] text-white font-bold text-lg 
                    shadow-lg hover:opacity-90 transition transform hover:scale-[1.02] disabled:opacity-50 disabled:scale-100
                    flex items-center justify-center gap-2
                  "
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <FaMagic />
                      <span>Send Magic Link</span>
                    </>
                  )}
                </button>
              </form>

            </div>
          ) : (
            <div className="text-center mt-6">
              <p className="text-gray-300 mb-6">We've sent a magic login link to <span className="text-white font-semibold">{email}</span>.</p>
              <button
                onClick={() => setMessage("")}
                className="text-[#b5a27a] hover:underline"
              >
                Try a different email
              </button>
            </div>
          )}

          <div className="mt-10 text-center text-xs text-gray-500">
            <p>Session never expires. Secure & Instant.</p>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes imgZoom {
          from { transform: scale(1.08); }
          to { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
