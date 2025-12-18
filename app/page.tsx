"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to splash screen
    router.replace("/splash");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--mibanco-green)]">
      <div className="animate-pulse">
        <div className="w-16 h-16 rounded-full bg-white/20" />
      </div>
    </div>
  );
}
