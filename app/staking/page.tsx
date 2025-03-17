"use client";

import ChatHeader from "@/components/ChatHeader";
import ChatroomFooter from "@/components/ChatroomFooter";
import StakingDashboard from "@/components/StakingDashboard";
import { useState } from "react";

export default function StakingPage() {
  const [stacksAddress, setStacksAddress] = useState<string>(""); // ✅ Fix: Ensure prop is passed

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100">
      <div className="fixed top-0 left-0 right-0 h-16 z-10">
        <ChatHeader />
      </div>

      <div className="flex-1 flex items-center justify-center pt-16 pb-12 px-4">
        {/* ✅ Fix: Pass setStacksAddress to StakingDashboard */}
        <StakingDashboard />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10">
        <ChatroomFooter />
      </div>
    </div>
  );
}
