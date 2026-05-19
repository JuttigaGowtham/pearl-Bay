"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/signup");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <p>Redirecting...</p>
    </div>
  );
}
