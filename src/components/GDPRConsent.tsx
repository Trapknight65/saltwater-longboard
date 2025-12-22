"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function GDPRConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consented = localStorage.getItem("gdpr-consent");
        if (!consented) {
            // Small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("gdpr-consent", "true");
        setIsVisible(false);
    };

    const handleDecline = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-cliff border-t border-foam/10 shadow-2xl animate-in slide-in-from-bottom duration-500">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                <div className="text-foam/90 text-sm md:text-base flex-1">
                    <p>
                        <span className="font-bold text-pacific">We use cookies</span> to analyze traffic and improve your experience.
                        By continuing, you agree to our privacy policy.
                    </p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={handleDecline}
                        className="flex-1 md:flex-none px-4 py-2 text-sm font-medium text-foam/70 hover:text-foam border border-foam/20 rounded-lg transition-colors"
                    >
                        Decline
                    </button>
                    <button
                        onClick={handleAccept}
                        className="flex-1 md:flex-none px-6 py-2 text-sm font-bold bg-pacific text-white rounded-lg hover:bg-tide transition-colors shadow-lg shadow-pacific/20"
                    >
                        Accept
                    </button>
                    <button
                        onClick={handleDecline}
                        className="md:hidden p-2 text-foam/50"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
