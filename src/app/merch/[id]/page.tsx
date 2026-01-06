"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ShoppingBag, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import { MerchProduct, subscribeToMerch } from "@/lib/firestore";

export default function ProductPage() {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<MerchProduct | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeToMerch((products) => {
            const found = products.find(p => p.id === params.id);
            setProduct(found || null);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [params.id]);

    const handleCheckout = async () => {
        if (!product) return;
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: [{
                        name: product.name,
                        price: product.price,
                        tag: product.tag
                    }]
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

    if (loading) {
        return (
            <div className="min-h-screen bg-foam flex items-center justify-center">
                <div className="text-driftwood animate-pulse">Loading product...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-foam flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold text-cliff">Product not found</h1>
                <Link href="/#merch" className="text-pacific hover:underline flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to store
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-foam">
            {/* Back Navigation */}
            <nav className="px-6 py-4 border-b border-dune/20">
                <Link
                    href="/#merch"
                    className="inline-flex items-center gap-2 text-driftwood hover:text-pacific transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to store
                </Link>
            </nav>

            {/* Product Detail */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className={`aspect-square ${product.imageColor} rounded-3xl relative overflow-hidden shadow-lg`}>
                        {product.tag && (
                            <span className="absolute top-6 left-6 bg-ember text-cliff text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                {product.tag}
                            </span>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <ShoppingBag className="w-24 h-24 text-white/30" />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-cliff mb-4">
                            {product.name}
                        </h1>

                        <p className="text-3xl font-bold text-pacific mb-6">
                            {product.price}
                        </p>

                        <p className="text-driftwood text-lg mb-8 leading-relaxed">
                            Official Saltwater Longboard merchandise. Limited edition item from the Spring 2026 collection.
                            High-quality materials and exclusive designs for true fans.
                        </p>

                        <div className="space-y-4">
                            <button
                                onClick={handleCheckout}
                                className="w-full py-4 bg-pacific text-white font-bold text-lg rounded-full hover:bg-tide transition-all hover:scale-[1.02] shadow-lg shadow-pacific/20 flex items-center justify-center gap-3"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                Buy Now
                            </button>

                            <p className="text-center text-sm text-driftwood">
                                Secure checkout powered by Stripe
                            </p>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-12 pt-8 border-t border-dune/20 space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-driftwood">Shipping</span>
                                <span className="text-cliff font-medium">Free worldwide shipping</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-driftwood">Returns</span>
                                <span className="text-cliff font-medium">30-day return policy</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
