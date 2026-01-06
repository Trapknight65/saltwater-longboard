"use client";

import { useState, useEffect } from "react";
import { MapPin, ArrowRight, Ticket } from "lucide-react";
import Triangle from "./landmarks/Triangle";
import RevealOnScroll from "./RevealOnScroll";
import { TourDate, subscribeToTourDates } from "@/lib/firestore";

export default function Booking() {
    const [shows, setShows] = useState<TourDate[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeToTourDates((data) => {
            setShows(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Fallback placeholder if no shows
    const displayShows = shows.length > 0 ? shows : [
        { id: "1", dateLabel: "TBA", venue: "Coming Soon", location: "Stay Tuned", status: "Available" as const, order: 0 } as TourDate
    ];

    return (
        <footer className="bg-cliff text-foam py-24 px-4 relative overflow-hidden" id="booking">
            {/* Inverted Triangle Landmark */}
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-25 pointer-events-none -translate-x-1/4 translate-y-1/4">
                <Triangle className="w-full h-full rotate-180 text-foam" />
            </div>

            <RevealOnScroll className="max-w-6xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Spring Tour '26</h2>
                        <p className="text-xl opacity-60 flex items-center gap-2">
                            <Ticket className="w-5 h-5 text-ember" />
                            Reserve your tickets now
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-2 border border-foam/20 rounded-full hover:bg-foam hover:text-cliff transition-colors text-sm font-medium">
                            View All Dates
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center text-foam/60 py-12">Loading tour dates...</div>
                ) : (
                    <div className="bg-white/5 rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm">
                        {displayShows.map((show, index) => (
                            <div
                                key={show.id}
                                className="group flex flex-col md:flex-row items-center justify-between p-6 md:p-8 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                            >
                                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full md:w-auto text-center md:text-left">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold text-pacific">{show.dateLabel.split(" ")[1] || show.dateLabel}</span>
                                        <span className="text-sm uppercase tracking-wider opacity-60">{show.dateLabel.split(" ")[0]}</span>
                                    </div>

                                    <div className="flex flex-col">
                                        <h3 className="text-xl font-bold">{show.venue}</h3>
                                        <p className="opacity-60 flex items-center justify-center md:justify-start gap-2 text-sm">
                                            <MapPin className="w-3 h-3" />
                                            {show.location}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 md:mt-0 w-full md:w-auto">
                                    {show.status === "Sold Out" ? (
                                        <span className="inline-block px-8 py-3 text-foam/30 font-medium border border-foam/10 rounded-full cursor-not-allowed">
                                            Sold Out
                                        </span>
                                    ) : (
                                        <a
                                            href={show.ticketLink || "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-tide text-white font-bold rounded-full hover:bg-palm transition-all hover:scale-105 shadow-lg shadow-tide/20 group-hover:shadow-tide/40"
                                        >
                                            <span>Get Tickets</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-24 pt-8 border-t border-foam/10 text-center opacity-40 text-sm">
                    &copy; 2025 Ines Bispo Music. Ticket transactions processed securely.
                </div>
            </RevealOnScroll>
        </footer>
    );
}

