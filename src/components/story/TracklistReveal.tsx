"use client";

import { useState } from "react";
import { Lock, Music } from "lucide-react";

export default function TracklistReveal() {
    const [isRevealed, setIsRevealed] = useState(false);

    const tracks = [
        "1. Saltwater (Intro)",
        "2. Waiting for the Swell",
        "3. Golden Hour",
        "4. Driftwood",
        "5. The Lineup",
        "6. Atlantic Blue",
        "7. Home Break",
        "8. High Tide (Outro)"
    ];

    const handleUnlock = () => {
        // In a real app, this would check mailing list subscription
        setIsRevealed(true);
    };

    return (
        <div className="bg-dune/5 border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden text-center">
            <div className="inline-flex items-center gap-2 mb-8 text-pacific font-bold uppercase tracking-widest text-sm">
                <Music className="w-4 h-4" /> Official Tracklist
            </div>

            <div className="space-y-4 relative">
                {tracks.map((track, i) => (
                    <div
                        key={i}
                        className={`text-xl md:text-2xl font-serif text-foam transition-all duration-700 ${isRevealed ? 'blur-0' : 'blur-md select-none opacity-50'}`}
                    >
                        {track}
                    </div>
                ))}

                {/* Overlay for Locked State */}
                {!isRevealed && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                        <div className="bg-cliff/80 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl max-w-sm space-y-4">
                            <Lock className="w-8 h-8 text-ember mx-auto mb-2" />
                            <h3 className="text-xl font-bold text-white">Classified Material</h3>
                            <p className="text-sm text-driftwood">
                                Join the inner circle to reveal the full tracklist and cover art immediately.
                            </p>
                            <button
                                onClick={handleUnlock}
                                className="w-full py-3 bg-ember text-white font-bold rounded-lg hover:bg-white hover:text-cliff transition-colors mt-2"
                            >
                                Unlock Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
