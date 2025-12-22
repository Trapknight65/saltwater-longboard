export default function Fire({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M50 10 L80 60 L70 90 L30 90 L20 60 Z" stroke="#F4A230" strokeWidth="2" />
            <path d="M50 10 L50 90" stroke="#F4A230" strokeWidth="2" />
            <path d="M50 50 L80 60" stroke="#F4A230" strokeWidth="2" />
            <path d="M50 50 L20 60" stroke="#F4A230" strokeWidth="2" />
        </svg>
    );
}
