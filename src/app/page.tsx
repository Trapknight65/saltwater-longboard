"use client";

import { useState, useEffect, useRef } from "react";
import Hero from "@/components/Hero";
import MusicSection from "@/components/MusicSection";
import MerchPreview from "@/components/MerchPreview";
import Booking from "@/components/Booking";
import GDPRConsent from "@/components/GDPRConsent";
import LoadingScreen from "@/components/LoadingScreen";
import SmartMenu from "@/components/SmartMenu";
import StreamerModal from "@/components/StreamerModal";

export default function Home() {
  const [isStreamerOpen, setIsStreamerOpen] = useState(false);
  const [inHero, setInHero] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If more than 10% of Hero is visible, we consider we are "in Hero" for menu purposes
        // Actually, user said: "display after leaving the hero section".
        // So if Hero is NOT intersecting, we are NOT in hero.
        // Let's invert: if entry.isIntersecting is false, we are past hero.
        // Wait, "display after leaving" means the "mobile menu handle" displays after leaving.
        // And bubbles display "only on hero view".
        // So:
        // isIntersecting = true -> inHero = true -> Bubbles
        // isIntersecting = false -> inHero = false -> Handle/Dock
        setInHero(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className="min-h-screen font-sans selection:bg-pacific selection:text-white">
      <LoadingScreen />

      {/* Global Navigation and Modals */}
      <SmartMenu
        onOpenStreamer={() => setIsStreamerOpen(true)}
        inHero={inHero}
      />
      <StreamerModal
        isOpen={isStreamerOpen}
        onClose={() => setIsStreamerOpen(false)}
      />

      <div ref={heroRef}>
        <Hero onOpenStreamer={() => setIsStreamerOpen(true)} />
      </div>

      <MusicSection />
      <MerchPreview />
      <Booking />
      <GDPRConsent />
    </main>
  );
}
