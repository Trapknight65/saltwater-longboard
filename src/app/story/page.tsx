"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, BookOpen, Music, Camera, Waves } from "lucide-react";
import Compass from "@/components/landmarks/Compass";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function StoryPage() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <div className="min-h-screen bg-cliff relative overflow-x-hidden text-foam font-sans selection:bg-coral selection:text-white">

            {/* Fixed Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-2 border border-white/20 rounded-full group-hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold tracking-widest uppercase">Return</span>
                </Link>
                <div className="flex items-center gap-2 opacity-50">
                    <Compass className="w-6 h-6 animate-pulse" />
                    <span className="text-xs font-mono tracking-widest">VOL I.</span>
                </div>
            </nav>

            {/* Hero / Orientation */}
            <section className="h-screen flex flex-col items-center justify-center p-4 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-dune to-cliff opacity-50"></div>
                {/* Animated Background Mesh */}
                <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ember/20 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]"></div>
                </div>

                <div className={`relative z-10 text-center space-y-8 transition-all duration-[1500ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="w-24 h-24 mx-auto text-coral">
                        <Compass className="w-full h-full drop-shadow-[0_0_30px_rgba(255,127,80,0.4)]" />
                    </div>
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tight">The Curriculum</h1>
                    <p className="max-w-md mx-auto text-lg text-driftwood font-light leading-relaxed">
                        This isn't just a biography. It's a method. <br />
                        A series of lessons learned between the waves and the studio.
                    </p>

                    <div className="pt-12 animate-bounce">
                        <div className="w-px h-24 bg-gradient-to-b from-coral to-transparent mx-auto"></div>
                    </div>
                </div>
            </section>

            {/* Lesson 1: The Discipline (Brasil) */}
            <section className="py-32 px-4 relative">
                <RevealOnScroll className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 border border-pacific/30 rounded-full text-pacific text-xs font-bold uppercase tracking-widest bg-pacific/10">
                            <Waves className="w-4 h-4" /> Lesson 01
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white">The Art of<br /><span className="text-pacific">Discipline</span></h2>
                        <p className="text-xl text-driftwood leading-relaxed">
                            Before the music, there was the water. Brasil taught me that freedom requires structure.
                            In the contest zone, every turn is calculated, every second counts.
                        </p>
                        <p className="text-driftwood">
                            The album opens with this tension—the rigid demands of competition versus the fluidity of the ocean itself.
                        </p>
                    </div>
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-dune group border border-white/5">
                        {/* Placeholder for Image */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-pacific/40 to-transparent mix-blend-overlay"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                            <span className="text-9xl font-bold text-white/10 uppercase rotate-90">Focus</span>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                            <span className="text-xs font-mono text-white/60">FLORIANÓPOLIS — THE ARENA</span>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Lesson 2: The Release (Portugal) */}
            <section className="py-32 px-4 bg-dune/30 relative">
                <RevealOnScroll className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center md:flex-row-reverse">
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-cliff group border border-white/5 md:order-last">
                        {/* Placeholder for Image */}
                        <div className="absolute inset-0 bg-gradient-to-bl from-ember/40 to-transparent mix-blend-overlay"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                            <span className="text-9xl font-bold text-white/10 uppercase -rotate-12">Flow</span>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                            <span className="text-xs font-mono text-white/60">LISBON — THE SANCTUARY</span>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 border border-ember/30 rounded-full text-ember text-xs font-bold uppercase tracking-widest bg-ember/10">
                            <BookOpen className="w-4 h-4" /> Lesson 02
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white">Trusting the<br /><span className="text-ember">Process</span></h2>
                        <p className="text-xl text-driftwood leading-relaxed">
                            Portugal was the exhale. Here, the goal wasn't to win, but to understand.
                            The streets of Lisbon offered a different rhythm—one that wasn't timed by a buzzer.
                        </p>
                        <p className="text-driftwood">
                            This is where the sound shifts. The aggressive percussion of the contest fades into the melody of introspection.
                        </p>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Visual Archives */}
            <section className="py-32 px-4">
                <RevealOnScroll className="max-w-6xl mx-auto space-y-12">
                    <div className="flex items-center gap-4 text-foam/50">
                        <Camera className="w-6 h-6" />
                        <span className="text-sm font-bold tracking-widest uppercase">Field Notes</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px]">
                        <div className="col-span-2 row-span-2 rounded-2xl bg-pacific/10 border border-white/5 relative group overflow-hidden">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 hover:opacity-100" style={{ backgroundImage: 'linear-gradient(to bottom right, #334155, #1e293b)' }}></div>
                            <div className="absolute bottom-6 left-6 text-xl font-bold">Reflex</div>
                        </div>
                        <div className="col-span-1 row-span-1 rounded-2xl bg-ember/10 border border-white/5 relative group overflow-hidden">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 hover:opacity-100" style={{ backgroundImage: 'linear-gradient(to bottom right, #78350f, #451a03)' }}></div>
                        </div>
                        <div className="col-span-1 row-span-2 rounded-2xl bg-tide/10 border border-white/5 relative group overflow-hidden">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 hover:opacity-100" style={{ backgroundImage: 'linear-gradient(to bottom right, #0f766e, #115e59)' }}></div>
                            <div className="absolute bottom-6 left-6 text-xl font-bold">Study</div>
                        </div>
                        <div className="col-span-1 row-span-1 rounded-2xl bg-coral/10 border border-white/5 relative group overflow-hidden">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 hover:opacity-100" style={{ backgroundImage: 'linear-gradient(to bottom right, #9a3412, #7c2d12)' }}></div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* The Syllabus (Player) */}
            <section className="py-32 px-4 flex justify-center">
                <RevealOnScroll className="w-full max-w-2xl bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center space-y-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-tide/20 text-tide mb-4 animate-[spin_4s_linear_infinite]">
                        <Music className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-bold">The Textbook</h3>
                    <p className="text-driftwood">Each track is a chapter. Listen to learn.</p>

                    {/* Mock Spotify Player UI */}
                    <div className="bg-dune rounded-xl p-4 flex items-center gap-4 text-left border border-white/5 hover:border-white/20 transition-colors cursor-pointer group">
                        <div className="w-16 h-16 bg-pacific rounded-lg flex items-center justify-center shrink-0">
                            <Compass className="w-8 h-8 text-white group-hover:rotate-45 transition-transform" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm text-tide font-bold uppercase tracking-widest mb-1">Lesson 01</div>
                            <div className="font-bold text-lg truncate">Salt water & Longboard</div>
                            <div className="text-sm text-white/50 truncate">Ines Bispo • The Textbook</div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-tide animate-pulse"></div>
                    </div>

                    <div className="pt-4">
                        <button className="px-8 py-3 bg-tide text-white rounded-full font-bold hover:bg-pacific transition-colors">
                            Open Spotify
                        </button>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Footer */}
            <footer className="py-12 text-center text-white/20 font-mono text-xs tracking-widest border-t border-white/5">
                LESSON COMPLETE • 2026
            </footer>

        </div>
    );
}
