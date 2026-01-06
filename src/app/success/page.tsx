"use client";

import Link from "next/link";
import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    return (
        <div className="min-h-screen bg-foam flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center space-y-6">
                <div className="w-20 h-20 bg-pacific/10 rounded-full flex items-center justify-center mx-auto text-pacific">
                    <CheckCircle className="w-10 h-10" />
                </div>

                <h1 className="text-3xl font-bold text-cliff">Order Confirmed</h1>
                <p className="text-driftwood">
                    Thanks for riding the wave. You'll receive a confirmation email shortly.
                </p>

                {sessionId && (
                    <p className="text-xs text-cliff/30 font-mono bg-cliff/5 p-2 rounded">
                        ID: {sessionId.slice(0, 10)}...
                    </p>
                )}

                <div className="pt-6 space-y-3">
                    <Link
                        href="/"
                        className="block w-full py-3 bg-cliff text-white font-bold rounded-xl hover:bg-pacific transition-colors"
                    >
                        Back to Shore
                    </Link>
                    <Link
                        href="/#merch"
                        className="block w-full py-3 text-cliff font-bold hover:bg-cliff/5 rounded-xl transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
