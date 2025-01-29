// app/landing/page.tsx
import Header from "@/components/Header";
import LandingHero from "@/components/LandingHero";
import Roadmap from "@/components/Roadmap";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function LandingPage() {
    return (
        <main>
            <Header />
            <LandingHero />
            <Roadmap />
            <HowItWorks />
            <Features />
            <CallToAction />
            <Footer />
        </main>
    );
}
