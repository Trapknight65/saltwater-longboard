import { Disc, Music, Play } from "lucide-react";
import Dashes from "./landmarks/Dashes";
import RevealOnScroll from "./RevealOnScroll";

export default function MusicSection() {
    const releases = [
        {
            type: "Single",
            title: "single 1",
            date: "Out Now",
            status: "active",
            color: "bg-dune",
            textColor: "text-cliff"
        },
        {
            type: "Single",
            title: "single 2",
            date: "Late 2025",
            status: "upcoming",
            color: "bg-driftwood",
            textColor: "text-white"
        },
        {
            type: "Album",
            title: "Untitled Project",
            date: "Spring 2026",
            status: "future",
            color: "bg-cliff",
            textColor: "text-foam"
        }
    ];

    return (
        <section className="py-24 px-4 bg-foam relative overflow-hidden" id="music">
            {/* Highway Landmark */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-20">
                <Dashes className="h-[120%] w-auto rotate-90 text-pacific" />
            </div>

            <RevealOnScroll className="max-w-6xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-tide mb-16 text-center tracking-tight">
                    Release Timeline
                </h2>

                <div className="relative">
                    {/* Vertical Line for Desktop */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-driftwood/30 -translate-x-1/2"></div>

                    <div className="space-y-12">
                        {releases.map((release, index) => (
                            <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                {/* Content Card */}
                                <div className="flex-1 w-full md:w-1/2 flex justify-center md:block">
                                    <div className={`w-full max-w-md p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow ${release.color} ${release.textColor}`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-xs font-bold tracking-widest uppercase border border-current px-2 py-1 rounded">
                                                {release.type}
                                            </span>
                                            {release.status === "active" && <Play className="w-6 h-6 fill-current animate-pulse" />}
                                        </div>
                                        <h3 className="text-3xl font-bold mb-2">{release.title}</h3>
                                        <p className="opacity-80 font-mono">{release.date}</p>
                                    </div>
                                </div>

                                {/* Timeline Marker */}
                                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-ember text-white shadow-lg shrink-0">
                                    {release.type === "Album" ? <Disc className="w-6 h-6" /> : <Music className="w-5 h-5" />}
                                </div>

                                {/* Spacer for alternating layout */}
                                <div className="flex-1 w-full md:w-1/2 hidden md:block"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </RevealOnScroll>
        </section>
    );
}
