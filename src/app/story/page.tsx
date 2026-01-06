"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Waves } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";
import MapJourney from "@/components/story/MapJourney";
import TracklistReveal from "@/components/story/TracklistReveal";
import SocialFooter from "@/components/SocialFooter";

export default function StoryPage() {
    const [scrolled, setScrolled] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-cliff relative overflow-x-hidden text-foam font-sans selection:bg-ember selection:text-white">

            {/* Fixed Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-2 border border-white/20 rounded-full group-hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold tracking-widest uppercase">Home</span>
                </Link>
                <div className="flex items-center gap-2 opacity-50">
                    <Compass className="w-6 h-6 animate-pulse" />
                    <span className="text-xs font-mono tracking-widest">CHAPTER I</span>
                </div>
            </nav>

            {/* Parallax Hero Layer (Background) */}
            <div
                className="fixed inset-0 pointer-events-none opacity-20"
                style={{ transform: `translateY(${scrolled * 0.5}px)` }}
            >
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-tide/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-ember/10 rounded-full blur-[120px]"></div>
            </div>

            {/* Section 1: The Intro */}
            <section className="h-screen flex flex-col items-center justify-center p-4 relative z-10">
                <div className="text-center space-y-8 max-w-4xl mx-auto">
                    <div className="inline-block p-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-4 animate-float">
                        <Waves className="w-8 h-8 text-pacific" />
                    </div>

                    <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-tight">
                        Saltwater Longboard isn't just an album. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pacific to-tide">It’s the soundtrack to the wait.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-driftwood font-light leading-relaxed max-w-2xl mx-auto">
                        Written between sets on the coast of Portugal, these songs are about the flow of the ocean
                        and the patience it takes to catch the right wave.
                    </p>

                    <div className="pt-24 opacity-50 animate-bounce">
                        <span className="text-xs tracking-widest uppercase">Scroll to Dive In</span>
                    </div>
                </div>
            </section>

            {/* Section 2: The Map (Portugal) */}
            <section className="py-32 px-4 relative z-10 bg-gradient-to-b from-transparent to-cliff/50">
                <RevealOnScroll className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1">
                        <MapJourney />
                    </div>
                    <div className="space-y-8 order-1 md:order-2">
                        <h2 className="text-4xl md:text-6xl font-bold">
                            Grounded in <br /><span className="text-ember">The Coast</span>
                        </h2>
                        <p className="text-xl text-driftwood leading-relaxed">
                            Every track maps to a specific coordinate. From the misty mornings in Ericeira
                            to the golden sunsets of Caparica. The salt is in the sound.
                        </p>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Section 3: The Tracklist (Unlock) */}
            <section className="py-32 px-4 relative z-10">
                <RevealOnScroll className="max-w-4xl mx-auto text-center space-y-16">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">The Setlist</h2>
                        <p className="text-xl text-driftwood">Spring 2026</p>
                    </div>
                    <TracklistReveal />
                </RevealOnScroll>
            </section>

            <SocialFooter />
        </div>
    );
}
