export default function Dashes({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <line x1="10" y1="10" x2="30" y2="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <line x1="40" y1="10" x2="60" y2="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <line x1="70" y1="10" x2="90" y2="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

            <line x1="20" y1="25" x2="50" y2="25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <line x1="60" y1="25" x2="80" y2="25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

            <line x1="10" y1="40" x2="90" y2="40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
    );
}
