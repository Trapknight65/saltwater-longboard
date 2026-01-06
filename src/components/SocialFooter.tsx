import { Instagram, Youtube, Music, Disc } from "lucide-react";

export default function SocialFooter() {
    const SOCIAL_LINKS = [
        { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/inesbispo99/?hl=fr" },
        { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@inesbispomusic" },
        { icon: Music, label: "Spotify", href: "https://open.spotify.com/intl-pt/artist/6pFehvqhKKnRTP0EP060RZ" },
        { icon: Disc, label: "Apple Music", href: "https://music.apple.com/pt/artist/in%C3%AAs-bispo/1545977690" },
    ];

    return (
        <footer className="py-24 px-4 border-t border-white/10 bg-cliff relative">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                {/* Social Grid */}
                <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-foam">Follow the Journey</h3>
                    <div className="flex flex-wrap gap-4">
                        {SOCIAL_LINKS.map((link) => {
                            const Icon = link.icon;
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all border border-white/5 group"
                                >
                                    <Icon className="w-6 h-6 text-driftwood group-hover:text-ember transition-colors" />
                                </a>
                            )
                        })}
                    </div>
                </div>

                {/* Spotify Embed Placeholder */}
                <div className="w-full bg-black/40 rounded-xl overflow-hidden border border-white/5">
                    <iframe
                        style={{ borderRadius: '12px' }}
                        src="https://open.spotify.com/embed/artist/6pFehvqhKKnRTP0EP060RZ?utm_source=generator&theme=0"
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    ></iframe>
                </div>
            </div>

            <div className="mt-24 text-center text-white/20 text-xs tracking-widest uppercase font-mono">
                © 2026 Inês Bispo. Designed in the waves.
            </div>
        </footer>
    );
}
