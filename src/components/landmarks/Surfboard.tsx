export default function Surfboard({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Outer Outline */}
            <path
                d="M50 5 L85 60 L50 195 L15 60 Z"
                stroke="#EAB308" // Yellow-500 for better visibility on white
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Center Line */}
            <path
                d="M50 5 L50 195"
                stroke="#EAB308"
                strokeWidth="3"
                strokeLinecap="round"
            />

            {/* Facet Lines (Geometric Style) */}
            <path
                d="M50 5 L15 60 M50 5 L85 60"
                stroke="#EAB308"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15 60 L50 100 L85 60"
                stroke="#EAB308"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
