"use client";

import { useState } from "react";
import { MapPin, X } from "lucide-react";

export default function MapJourney() {
    const [activePin, setActivePin] = useState<number | null>(null);

    const locations = [
        {
            id: 1,
            name: "Ericeira",
            coords: "top-[40%] left-[20%]",
            story: "The World Surfing Reserve. Where the first chords of 'Saltwater' were written, watching the winter swell roll in at Ribeira d'Ilhas."
        },
        {
            id: 2,
            name: "Costa da Caparica",
            coords: "top-[45%] left-[18%]",
            story: "Endless dunes and golden sunsets. The visuals for the album were shot here during the 'Golden Hour' sessions."
        },
        {
            id: 3,
            name: "Sagres",
            coords: "bottom-[10%] left-[15%]",
            story: "The end of the world. A retreat to silence, where the acoustic tracks found their raw, untreated sound."
        }
    ];

    return (
        <div className="relative w-full aspect-[4/5] md:aspect-video bg-pacific/10 rounded-3xl overflow-hidden border border-white/5 p-8">
            {/* Background Map Placeholder - styled as a stylized abstract map */}
            <div className="absolute inset-0 opacity-30">
                {/* Abstract Coastline SVG */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-pacific fill-current" preserveAspectRatio="none">
                    <path d="M20,0 C25,20 15,40 18,60 C20,80 10,90 15,100 L100,100 L100,0 Z" />
                </svg>
            </div>

            <h3 className="relative z-10 text-2xl font-bold text-foam mb-8">The Coastline</h3>

            {/* Pins */}
            {locations.map((loc) => (
                <button
                    key={loc.id}
                    onClick={() => setActivePin(loc.id)}
                    className={`absolute ${loc.coords} z-20 group transition-transform hover:scale-110 focus:outline-none`}
                >
                    <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${activePin === loc.id ? 'bg-ember text-white scale-125' : 'bg-white text-cliff'} shadow-lg transition-all`}>
                        <MapPin className="w-4 h-4" />
                        {activePin === loc.id && (
                            <div className="absolute inset-0 rounded-full bg-ember animate-ping -z-10"></div>
                        )}
                    </div>
                </button>
            ))}

            {/* Popup Card */}
            {activePin && (
                <div className="absolute bottom-8 left-8 right-8 md:left-auto md:right-8 md:w-80 bg-cliff/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl z-30 animate-in fade-in slide-in-from-bottom-4">
                    <button
                        onClick={() => setActivePin(null)}
                        className="absolute top-4 right-4 text-white/40 hover:text-white"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    {locations.map(loc => loc.id === activePin && (
                        <div key={loc.id}>
                            <div className="text-xs text-ember font-bold uppercase tracking-widest mb-2">{loc.name}</div>
                            <p className="text-sm text-driftwood leading-relaxed">
                                "{loc.story}"
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
