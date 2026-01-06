import Link from "next/link";
import { XCircle } from "lucide-react";

export default function CancelPage() {
    return (
        <div className="min-h-screen bg-foam flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center space-y-6">
                <div className="w-20 h-20 bg-coral/10 rounded-full flex items-center justify-center mx-auto text-coral">
                    <XCircle className="w-10 h-10" />
                </div>

                <h1 className="text-3xl font-bold text-cliff">Order Cancelled</h1>
                <p className="text-driftwood">
                    No worries. The ocean isn't going anywhere.
                </p>

                <div className="pt-6">
                    <Link
                        href="/#merch"
                        className="block w-full py-3 bg-cliff text-white font-bold rounded-xl hover:bg-ember transition-colors"
                    >
                        Return to Shop
                    </Link>
                </div>
            </div>
        </div>
    );
}
