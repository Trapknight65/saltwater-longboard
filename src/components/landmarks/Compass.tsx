import { SVGProps } from "react";

export default function Compass(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            {/* Outer Ring */}
            <circle cx="50" cy="50" r="45" strokeWidth="1.5" />

            {/* Inner Decorative Ring */}
            <circle cx="50" cy="50" r="38" strokeWidth="0.5" strokeDasharray="4 4" className="opacity-50" />

            {/* Cardinal Points */}
            <path d="M50 10 V 20" /> {/* N */}
            <path d="M50 80 V 90" /> {/* S */}
            <path d="M90 50 H 80" /> {/* E */}
            <path d="M20 50 H 10" /> {/* W */}

            {/* Needle / Star Shape */}
            <path d="M50 25 L 55 45 L 75 50 L 55 55 L 50 75 L 45 55 L 25 50 L 45 45 Z" className="fill-current opacity-20" />
            <path d="M50 25 L 50 75" strokeWidth="1" />
            <path d="M25 50 L 75 50" strokeWidth="1" />
        </svg>
    );
}
