"use client";

import { useEffect, useState } from "react";
import Moon from "./landmarks/Moon";

export default function LoadingScreen() {
    const [isVisible, setIsVisible] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        // Simulate loading time, or listen to window load (which might be too fast in dev)
        // Let's give it a minimum "brand feel" pause.
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1500);

        const removeTimer = setTimeout(() => {
            setShouldRender(false);
        }, 2000); // 1.5s + 0.5s fade out

        return () => {
            clearTimeout(timer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (!shouldRender) return null;

    return (
        <div
            className={`
        fixed inset-0 z-[100] bg-tide flex items-center justify-center
        transition-opacity duration-500 ease-in-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
        >
            <div className="flex flex-col items-center gap-4">
                <Moon className="w-24 h-24 text-foam animate-bounce" />
                <h1 className="text-foam font-bold text-2xl tracking-[0.2em] animate-pulse">INES BISPO</h1>
            </div>
        </div>
    );
}
