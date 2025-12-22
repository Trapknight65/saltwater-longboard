export default function Triangle({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M50 10 L90 80 L10 80 Z" stroke="#0E6F5A" strokeWidth="2" /> {/* Main Triangle */}
            <path d="M50 10 L30 45 L70 45" stroke="#0E6F5A" strokeWidth="2" /> {/* Inner segment */}
            <path d="M30 45 L50 80" stroke="#0E6F5A" strokeWidth="2" /> {/* Cross segment */}
        </svg>
    );
}
