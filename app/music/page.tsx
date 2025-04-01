// File: app/Music/page.tsx
// Description: This file contains the page component for the Music 
// page and redirects to the Music YouTube video pitch demo

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MusicPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the YouTube video demo
    router.push("https://www.youtube.com/watch?v=21wFx2lqfdE");
  }, [router]);

  return (
    <div className="text-center py-20">
      <h2 className="text-2xl">Redirecting you to the Kulture.Fun Crypto Kulture Music Video...</h2>
    </div>
  );
}
