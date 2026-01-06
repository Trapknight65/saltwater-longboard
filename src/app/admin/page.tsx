"use client";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ChecklistWidget from '@/components/admin/ChecklistWidget';
import CountdownWidget from '@/components/admin/CountdownWidget';
import StatsWidget from '@/components/admin/StatsWidget';
import CalendarWidget from '@/components/admin/CalendarWidget';

export default function AdminDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) return <div className="flex items-center justify-center min-h-screen font-serif text-terracotta-600">Loading...</div>;
    if (!user) return null;

    return (
        <div className="p-8 min-h-screen bg-stone-50 text-stone-800">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold font-serif text-pacific-800">Saltwater Dashboard</h1>
                    <p className="text-stone-500">Logged in as {user.email}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    <ChecklistWidget />
                    <CountdownWidget />
                    <StatsWidget />
                    <CalendarWidget />
                </div>
            </div>
        </div>
    );
}
