"use client";

import { X, Play, Pause, SkipForward, SkipBack } from "lucide-react";
import { useState } from "react";
import Moon from "./landmarks/Moon";

interface StreamerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function StreamerModal({ isOpen, onClose }: StreamerModalProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dune/90 backdrop-blur-sm animate-in fade-in duration-300">

            <div className="relative w-full max-w-4xl bg-cliff text-foam rounded-3xl overflow-hidden shadow-2xl border border-dim/20 animate-in slide-in-from-bottom-10 duration-500">

                {/* Header / Close */}
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={onClose}
                        className="p-2 bg-dune/50 rounded-full hover:bg-pacific/80 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="grid md:grid-cols-2 h-[500px]">
                    {/* Visual Side */}
                    <div className="relative h-full bg-tide flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-pacific/20 to-ember/10 mix-blend-overlay"></div>
                        {/* Spinning Moon Record */}
                        <div className={`w-64 h-64 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
                            <Moon className="w-full h-full text-foam drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                        </div>
                    </div>

                    {/* Player Side */}
                    <div className="p-8 flex flex-col justify-between bg-cliff">
                        <div>
                            <h3 className="text-sm font-mono text-driftwood mb-2">NOW PLAYING</h3>
                            <h2 className="text-3xl font-bold mb-1">Saltwater Dreams</h2>
                            <p className="text-pacific text-lg">Ines Bispo • Spring 2026</p>
                        </div>

                        <div className="space-y-6">
                            {/* Progress Bar (Fake) */}
                            <div className="w-full h-1 bg-dune rounded-full overflow-hidden">
                                <div className="h-full bg-ember w-1/3"></div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center justify-center gap-6">
                                <button className="p-2 hover:text-pacific transition-colors"><SkipBack className="w-8 h-8" /></button>
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="w-16 h-16 bg-foam text-cliff rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                                >
                                    {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                                </button>
                                <button className="p-2 hover:text-pacific transition-colors"><SkipForward className="w-8 h-8" /></button>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-dune/30">
                            <p className="text-xs text-center text-driftwood">PRE-SAVE THE ALBUM FOR EXCLUSIVE ACCESS</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
