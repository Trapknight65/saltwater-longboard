"use client";

import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

export default function MailingList() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setEmail("");
        }, 1500);
    };

    return (
        <section className="py-24 px-4 bg-dune/20 relative border-t border-cliff/5">
            <RevealOnScroll className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 border border-cliff/20 rounded-full text-cliff text-xs font-bold uppercase tracking-widest mb-8">
                    <Mail className="w-4 h-4" /> The Surf Report
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-cliff mb-6 tracking-tight">
                    Join the Lineup
                </h2>
                <p className="text-xl text-cliff/70 mb-12 max-w-lg mx-auto leading-relaxed">
                    Get early access to tickets, secret acoustic sessions, and release updates.
                    <br /><span className="italic opacity-60 text-base">No spam, just good vibes.</span>
                </p>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto relative group">
                    <input
                        type="email"
                        placeholder="your@email.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-8 py-4 bg-white/50 backdrop-blur-sm border-2 border-cliff/10 rounded-full text-cliff placeholder:text-cliff/40 focus:outline-none focus:border-cliff focus:bg-white transition-all"
                    />
                    <button
                        type="submit"
                        disabled={status !== "idle"}
                        className="absolute right-2 top-2 bottom-2 aspect-square bg-cliff text-white rounded-full flex items-center justify-center hover:bg-pacific transition-colors disabled:bg-cliff/50 disabled:cursor-wait"
                    >
                        {status === "success" ? (
                            <span className="text-xl">✓</span>
                        ) : (
                            <ArrowRight className="w-5 h-5" />
                        )}
                    </button>
                    {/* Decorative shadow */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-pacific to-ember opacity-0 group-hover:opacity-10 blur-xl transition-opacity -z-10 rounded-full"></div>
                </form>

                {status === "success" && (
                    <p className="mt-4 text-pacific font-medium animate-fade-in">
                        You're in. Watch the tides.
                    </p>
                )}
            </RevealOnScroll>
        </section>
    );
}
