"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MerchProduct, subscribeToMerch } from "@/lib/firestore";

export default function MerchStorePage() {
    const [products, setProducts] = useState<MerchProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeToMerch((data) => {
            setProducts(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <main className="min-h-screen bg-foam">
            {/* Navigation */}
            <nav className="px-6 py-4 border-b border-dune/20">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-driftwood hover:text-pacific transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to home
                </Link>
            </nav>

            {/* Header */}
            <header className="max-w-6xl mx-auto px-6 py-12">
                <h1 className="text-4xl md:text-6xl font-bold text-cliff mb-4">
                    Merch Store
                </h1>
                <p className="text-xl text-driftwood">
                    Official Saltwater Longboard merchandise
                </p>
            </header>

            {/* Products Grid */}
            <section className="max-w-6xl mx-auto px-6 pb-24">
                {loading ? (
                    <div className="text-center text-driftwood py-12">Loading products...</div>
                ) : products.length === 0 ? (
                    <div className="text-center py-12">
                        <ShoppingBag className="w-16 h-16 text-dune mx-auto mb-4" />
                        <p className="text-driftwood text-lg">No products available yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/merch/${product.id}`}
                                className="group"
                            >
                                <div className={`relative aspect-square ${product.imageColor} rounded-2xl overflow-hidden mb-4 transition-all group-hover:scale-[1.02] group-hover:shadow-xl`}>
                                    {product.tag && (
                                        <span className="absolute top-4 left-4 bg-ember text-cliff text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                            {product.tag}
                                        </span>
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <ShoppingBag className="w-16 h-16 text-white/20" />
                                    </div>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-cliff group-hover:text-pacific transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-driftwood flex items-center justify-between">
                                    {product.price}
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold uppercase text-pacific">
                                        View Details
                                    </span>
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
