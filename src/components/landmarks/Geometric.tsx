export default function Geometric({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M20 20 L50 80 L80 50 L50 20 Z" stroke="#F4A230" strokeWidth="2" />
            <path d="M50 80 L80 80 L80 50" stroke="#F4A230" strokeWidth="2" />
            <path d="M20 20 L20 50 L50 80" stroke="#F4A230" strokeWidth="2" />
        </svg>
    );
}
