import { ShoppingBag } from "lucide-react";
import Surfboard from "./landmarks/Surfboard";
import RevealOnScroll from "./RevealOnScroll";

export default function MerchPreview() {
    const products = [
        { name: "Tour Tee '25", price: "$35", tag: "New Drop", imageColor: "bg-pacific" },
        { name: "Vinyl LP (Pre-order)", price: "$40", tag: "Spring '26", imageColor: "bg-tide" },
        { name: "Tote Bag", price: "$20", tag: null, imageColor: "bg-dune" },
    ];

    const handleCheckout = async (product: any) => {
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: [product]
                }),
            });
            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error("Checkout failed:", error);
        }
    };


    return (
        <section className="py-24 px-4 bg-white relative overflow-hidden" id="merch">
            {/* Blazing Surfboard Landmark */}
            <Surfboard className="absolute top-0 right-0 w-[500px] h-auto opacity-40 pointer-events-none -rotate-12 translate-x-1/3 -translate-y-1/4" />

            <RevealOnScroll className="max-w-6xl mx-auto relative z-10">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-cliff tracking-tight">Merch</h2>
                    <a href="#" className="hidden md:flex items-center gap-2 text-pacific hover:text-tide font-medium transition-colors">
                        Shop All <ShoppingBag className="w-5 h-5" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((item, idx) => (
                        <div key={idx} className="group cursor-pointer" onClick={() => handleCheckout(item)}>
                            <div className={`relative aspect-square ${item.imageColor} rounded-xl overflow-hidden mb-4 transition-transform group-hover:scale-[1.02]`}>
                                {item.tag && (
                                    <span className="absolute top-4 left-4 bg-ember text-cliff text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                        {item.tag}
                                    </span>
                                )}
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                            </div>
                            <h3 className="text-xl font-bold text-cliff group-hover:text-pacific transition-colors">{item.name}</h3>
                            <p className="text-driftwood flex items-center justify-between">
                                {item.price}
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold uppercase text-pacific">Buy Now</span>
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 md:hidden text-center">
                    <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-cliff rounded-full text-cliff font-bold hover:bg-cliff hover:text-white transition-colors">
                        Visit Store <ShoppingBag className="w-5 h-5" />
                    </button>
                </div>
            </RevealOnScroll>
        </section>
    );
}
