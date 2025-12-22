"use client";

import { useState } from "react";
import { Instagram, Music, ChevronUp, X, ArrowRight } from "lucide-react";
import Moon from "./landmarks/Moon";
import Dashes from "./landmarks/Dashes";
import Surfboard from "./landmarks/Surfboard";
import Triangle from "./landmarks/Triangle";
import Compass from "./landmarks/Compass";

interface SmartMenuProps {
    onOpenStreamer: () => void;
    inHero: boolean;
}

export default function SmartMenu({ onOpenStreamer, inHero }: SmartMenuProps) {
    const [hovered, setHovered] = useState<string | null>(null);
    const [showMobileNav, setShowMobileNav] = useState(false);

    // Define layout configurations for different states
    const menuItems = [
        {
            id: "media",
            icon: Moon,
            label: "Open Player",
            action: onOpenStreamer,
            color: "text-foam",
            borderColor: "border-foam/20",
            // Desktop Floating Position
            posFloat: "top-[20%] right-[15%]",
            // Desktop Docked Position (Vertical Column)
            posDock: "top-[20%] right-6 translate-y-0",
            animation: "animate-float"
        },
        {
            id: "story",
            icon: Compass,
            label: "The Story",
            href: "/story",
            color: "text-coral",
            borderColor: "border-coral/30",
            // Centered at bottom (not too down)
            posFloat: "bottom-[20%] left-[calc(50%-3.5rem)]",
            // Docked: stacked below media
            posDock: "top-[20%] right-6 translate-y-[120px]",
            animation: "animate-[float_9s_ease-in-out_infinite_0.5s]"
        },
        {
            id: "music",
            icon: Dashes,
            label: "Latest Releases",
            href: "#music",
            color: "text-pacific",
            borderColor: "border-pacific/30",
            posFloat: "bottom-[25%] left-[15%]",
            // Docked: stacked below story
            posDock: "top-[20%] right-6 translate-y-[240px]",
            animation: "animate-[float_7s_ease-in-out_infinite_1s]"
        },
        {
            id: "merch",
            icon: Surfboard,
            label: "New Drop",
            href: "#merch",
            color: "text-ember",
            borderColor: "border-ember/30",
            posFloat: "top-[15%] left-[10%]",
            // Docked: stacked below music
            posDock: "top-[20%] right-6 translate-y-[360px]",
            animation: "animate-[float_8s_ease-in-out_infinite_2s]"
        },
        {
            id: "booking",
            icon: Triangle,
            label: "Tour Dates",
            href: "#booking",
            color: "text-tide",
            borderColor: "border-tide/30",
            posFloat: "bottom-[20%] right-[10%]",
            // Docked: stacked below merch
            posDock: "top-[20%] right-6 translate-y-[480px]",
            animation: "animate-[float_6s_ease-in-out_infinite_3s]"
        },
    ];

    return (
        <>
            {/* DESKTOP NAV: Floating Bubbles -> Vertical Dock */}
            {/* Hidden on mobile if NOT in hero (since mobile uses bottom handle then) */}
            <div className={`fixed inset-0 pointer-events-none z-40 hidden md:block`}>
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isHovered = hovered === item.id;

                    // Determine current classes based on inHero state
                    const containerClasses = inHero
                        ? `absolute ${item.posFloat} ${item.animation}`
                        : `absolute ${item.posDock}`; // No animation when docked

                    return (
                        <div
                            key={item.id}
                            className={`${containerClasses} transition-all duration-1000 ease-in-out pointer-events-auto`}
                            onMouseEnter={() => setHovered(item.id)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            {/* Tooltip */}
                            <div
                                className={`
                  absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap
                  px-4 py-2 bg-dune/90 backdrop-blur-md text-cliff text-sm font-mono font-bold rounded-full 
                  pointer-events-none transition-all duration-300 shadow-xl border border-white/20
                  ${isHovered ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-90 translate-x-4"}
                `}
                            >
                                {item.label}
                            </div>

                            {/* Bubble Button */}
                            {/* Scale down slightly when docked */}
                            <div className={`transition-transform duration-1000 ${inHero ? 'scale-100' : 'scale-75'}`}>
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        className={`
                        w-28 h-28 
                        rounded-full bg-foam/10 backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]
                        flex items-center justify-center transition-all duration-500 
                        hover:scale-110 hover:bg-foam/20 hover:border-white/40 hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]
                        cursor-pointer group
                        ${inHero ? '' : 'bg-cliff/50 hover:bg-cliff/80'} 
                      `}
                                    >
                                        <Icon className={`w-14 h-14 stroke-[1.5] transition-all duration-500 group-hover:stroke-2 ${item.color}`} />
                                    </a>
                                ) : (
                                    <button
                                        onClick={item.action}
                                        className={`
                        w-28 h-28 
                        rounded-full bg-foam/10 backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]
                        flex items-center justify-center transition-all duration-500 
                        hover:scale-110 hover:bg-foam/20 hover:border-white/40 hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]
                        cursor-pointer group
                         ${inHero ? '' : 'bg-cliff/50 hover:bg-cliff/80'} 
                      `}
                                    >
                                        <Icon className={`w-14 h-14 stroke-[1.5] transition-all duration-500 group-hover:stroke-2 ${item.color}`} />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* MOBILE NAV: Bubbles (In Hero) -> Bottom Handle (Past Hero) */}
            <div className="md:hidden">

                {/* Mobile Bubbles: Only visible when inHero is TRUE */}
                <div className={`fixed inset-0 pointer-events-none z-30 transition-opacity duration-500 ${inHero ? 'opacity-100' : 'opacity-0'}`}>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        // On mobile, just use posFloat but ensure it's not offscreen. 
                        // Simple hack: if "left-[20%]" etc is used, it should be fine.
                        return (
                            <div
                                key={item.id}
                                className={`absolute pointer-events-auto ${item.posFloat.replace('right-[15%]', 'right-4').replace('left-[20%]', 'left-4').replace('left-[15%]', 'left-4').replace('left-[10%]', 'left-4').replace('right-[10%]', 'right-4')} ${item.animation} scale-75`}
                            >
                                {item.href ? (
                                    <a href={item.href} className="w-24 h-24 rounded-full bg-foam/10 backdrop-blur-md flex items-center justify-center">
                                        <Icon className={`w-10 h-10 ${item.color}`} />
                                    </a>
                                ) : (
                                    <button onClick={item.action} className="w-24 h-24 rounded-full bg-foam/10 backdrop-blur-md flex items-center justify-center">
                                        <Icon className={`w-10 h-10 ${item.color}`} />
                                    </button>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Full-Width Swipe/Menu Handle: Only visible when inHero is FALSE (and nav not open) */}
                <div className={`
             fixed z-40 bottom-0 left-0 w-full pointer-events-auto
             transition-all duration-500 ease-in-out
             ${!inHero && !showMobileNav ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
          `}>
                    <button
                        onClick={() => setShowMobileNav(true)}
                        className="w-full h-16 bg-cliff/80 backdrop-blur-md border-t border-white/5 flex flex-col items-center justify-center gap-2 group active:bg-cliff/95"
                    >
                        <div className="w-12 h-1 bg-white/20 rounded-full"></div>
                        <span className="text-[10px] text-white/50 tracking-widest uppercase font-bold">Menu</span>
                    </button>
                </div>

                {/* Full Screen Menu Overlay */}
                <div className={`
             fixed inset-0 z-50 bg-cliff
             flex flex-col
             transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
             ${showMobileNav ? 'translate-y-0' : 'translate-y-full'}
          `}>

                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b border-white/5 bg-cliff z-10">
                        <span className="text-sm font-bold tracking-widest text-foam uppercase">Ines Bispo</span>
                        <button
                            onClick={() => setShowMobileNav(false)}
                            className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <X className="w-6 h-6 text-foam" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between overflow-y-auto p-8 relative">
                        {/* Decorative background element */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pacific/10 rounded-full blur-3xl"></div>
                        </div>

                        {/* Main Nav Items */}
                        <div className="grid gap-6 relative z-10">
                            {menuItems.map((item, idx) => {
                                const Icon = item.icon;
                                const style = { transitionDelay: `${idx * 50}ms` };

                                return item.href ? (
                                    <a
                                        key={item.id}
                                        href={item.href}
                                        onClick={() => setShowMobileNav(false)}
                                        className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 active:scale-95 transition-transform"
                                    >
                                        <div className={`w-14 h-14 rounded-full border ${item.borderColor} flex items-center justify-center bg-cliff shadow-lg`}>
                                            <Icon className={`w-7 h-7 ${item.color}`} />
                                        </div>
                                        <div className="flex-1">
                                            <span className={`block text-2xl font-bold ${item.color} leading-none mb-1`}>{item.label}</span>
                                            <span className="text-xs text-white/40 tracking-wider font-mono uppercase">Explore</span>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-white/20" />
                                    </a>
                                ) : (
                                    <button
                                        key={item.id}
                                        onClick={() => { setShowMobileNav(false); item.action && item.action(); }}
                                        className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 active:scale-95 transition-transform text-left"
                                    >
                                        <div className={`w-14 h-14 rounded-full border ${item.borderColor} flex items-center justify-center bg-cliff shadow-lg`}>
                                            <Icon className={`w-7 h-7 ${item.color}`} />
                                        </div>
                                        <div className="flex-1">
                                            <span className={`block text-2xl font-bold ${item.color} leading-none mb-1`}>{item.label}</span>
                                            <span className="text-xs text-white/40 tracking-wider font-mono uppercase">Interactive</span>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-white/20" />
                                    </button>
                                );
                            })}
                        </div>

                        {/* Footer Section */}
                        <div className="mt-8 relative z-10">
                            <div className="flex items-center justify-between gap-4">
                                <a href="#" className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <Instagram className="w-6 h-6 text-ember" />
                                    <span className="text-[10px] font-bold tracking-widest uppercase">Instagram</span>
                                </a>
                                <a href="#" className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <Music className="w-6 h-6 text-pacific" />
                                    <span className="text-[10px] font-bold tracking-widest uppercase">Spotify</span>
                                </a>
                            </div>
                            <div className="mt-6 text-center text-xs text-white/20 font-mono">
                                © 2026 INES BISPO
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
