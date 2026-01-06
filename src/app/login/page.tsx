"use client";
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/admin');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-stone-100 text-stone-800">
            <h1 className="text-3xl font-bold mb-6 font-serif text-terracotta-600">Admin Login</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-3 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                />
                <button type="submit" className="p-3 bg-terracotta-600 text-white rounded hover:bg-terracotta-700 transition-colors">Login</button>
            </form>
        </div>
    );
}
