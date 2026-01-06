"use client";

import { useState, useRef, useEffect } from "react";
import { Headphones, Volume2, VolumeX } from "lucide-react";

export default function AmbientSound() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // In a real app, we would have a real URL. 
    // For now, we'll placeholder it or use a public domain sound if available.
    // Using a placeholder that won't play but UI works.
    const AUDIO_URL = "https://cdn.freesound.org/previews/233/233423_3633807-lq.mp3"; // Ocean waves placeholder example

    useEffect(() => {
        audioRef.current = new Audio(AUDIO_URL);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        }
    }, []);

    const toggleSound = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Audio play blocked", e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <button
            onClick={toggleSound}
            className={`fixed bottom-6 right-6 z-40 p-3 rounded-full transition-all duration-500 shadow-lg group ${isPlaying ? "bg-ember text-white scale-110" : "bg-white/10 backdrop-blur-md text-white hover:bg-white/20"
                }`}
            aria-label="Toggle Ambient Sound"
        >
            <div className="relative">
                {isPlaying ? (
                    <Volume2 className="w-6 h-6 animate-pulse" />
                ) : (
                    <Headphones className="w-6 h-6" />
                )}

                {/* Tooltip */}
                <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-black/80 text-white text-xs font-bold uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {isPlaying ? "Pause Vibes" : "Immersive Mode"}
                </span>
            </div>
        </button>
    );
}
