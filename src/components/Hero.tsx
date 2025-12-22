"use client";

import { useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import Moon from "./landmarks/Moon";

interface HeroProps {
    onOpenStreamer: () => void;
}

export default function Hero({ onOpenStreamer }: HeroProps) {
    return (
        <div className="relative h-screen min-h-[600px] w-full flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-tide to-pacific px-4">

            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"></div>

            {/* Central Moon Video Player */}
            <div
                onClick={onOpenStreamer}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] opacity-60 hover:opacity-100 transition-opacity duration-700 cursor-pointer group"
            >
                {/* Video/Content Placeholder masked by Moon */}
                <div className="w-full h-full bg-tide animate-pulse" style={{ clipPath: 'url(#moon-clip)' }}>
                    {/* Placeholder for Surf Sequence Video */}
                    <div className="w-full h-full bg-gradient-to-br from-pacific via-tide to-foam animate-[spin_10s_linear_infinite]" />
                </div>

                {/* Moon Outline Overlay */}
                <Moon className="absolute inset-0 w-full h-full text-foam drop-shadow-2xl transition-transform duration-700 group-hover:scale-105" />

                {/* Play Button Hint */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Play className="w-16 h-16 text-foam opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
            </div>

            <div className="z-10 text-center space-y-6 max-w-4xl mt-32 md:mt-0 pointer-events-none">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foam animate-in fade-in slide-in-from-bottom-5 duration-1000 ease-out drop-shadow-lg">
                    INES BISPO
                </h1>

                <p className="text-xl md:text-2xl font-light text-foam/80 tracking-widest uppercase animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 drop-shadow-md">
                    Spring 2026
                </p>

                <div className="pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 pointer-events-auto">
                    <button
                        onClick={onOpenStreamer}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-coral text-white rounded-full text-lg font-medium tracking-wide transition-all hover:scale-105 hover:shadow-xl focus:ring-4 focus:ring-coral/30"
                    >
                        <span>Stream New Single</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-foam/50">
                <span className="text-sm tracking-widest">SCROLL</span>
            </div>

            {/* Clip Path Definition */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <clipPath id="moon-clip" clipPathUnits="objectBoundingBox">
                        {/* Normalized coords based on M50 10 A 40 40 0 1 0 50 90 A 30 30 0 1 1 50 30 A 10 10 0 0 0 50 10 Z */}
                        <path d="M0.5 0.1 A 0.4 0.4 0 1 0 0.5 0.9 A 0.3 0.3 0 1 1 0.5 0.3 A 0.1 0.1 0 0 0 0.5 0.1 Z" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
}
