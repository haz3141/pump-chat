/**
 * File: /app/page.tsx
 *
 * Description:
 * - This is the main landing page for Pump.Chat.
 * - Introduces users to the platform and provides a CTA to join the chat app.
 * - Follows best UX practices for section ordering.
 */

import Header from "@/components/Header";
import LandingHero from "@/components/LandingHero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Roadmap from "@/components/Roadmap";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <main>
      <Header />
      <LandingHero />  {/* 1️⃣ First Impression & CTA */}
      <Features />      {/* 2️⃣ Key Features (Why Use It?) */}
      <HowItWorks />    {/* 3️⃣ Steps for Using Pump.Chat */}
      <Roadmap />       {/* 4️⃣ Future Vision (What’s Next?) */}
      <CallToAction />  {/* 5️⃣ Last Engagement Before Leaving */}
      <Footer />        {/* 6️⃣ Footer with Links & Socials */}
    </main>
  );
}
