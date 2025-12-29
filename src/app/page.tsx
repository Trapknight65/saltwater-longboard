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
    const handleScroll = () => {
      // "as soon as the user starts scrolling the bubbles translate"
      // We'll use a small threshold to avoid jitter, e.g., 50px
      if (window.scrollY > 50) {
        setInHero(false);
      } else {
        setInHero(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
