export default function Moon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path
                d="M50 10 A 40 40 0 1 0 50 90 A 30 30 0 1 1 50 30 A 10 10 0 0 0 50 10 Z"
                stroke="#1EA7C4" // Pacific Blue
                strokeWidth="2"
            />
        </svg>
    );
}
