// File: app/hackathon/page.tsx
// Description: This file contains the page component for the hackathon 
// page and redirects to the hackathon YouTube video pitch demo

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HackathonPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the YouTube video demo
    router.push("https://www.youtube.com/watch?v=rM_X0qGp1nI");
  }, [router]);

  return (
    <div className="text-center py-20">
      <h2 className="text-2xl">Redirecting you to the Kulture.Fun Hackathon Demo...</h2>
    </div>
  );
}
