"use client";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    Music, ShoppingBag, Calendar, LogOut, Home,
    LayoutDashboard, ListTodo, Clock, BarChart3, Menu, X
} from 'lucide-react';
import ChecklistWidget from '@/components/admin/ChecklistWidget';
import CountdownWidget from '@/components/admin/CountdownWidget';
import StatsWidget from '@/components/admin/StatsWidget';
import CalendarWidget from '@/components/admin/CalendarWidget';
import MusicWidget from '@/components/admin/MusicWidget';
import MerchWidget from '@/components/admin/MerchWidget';
import TourWidget from '@/components/admin/TourWidget';
import Link from 'next/link';

type ActiveSection = 'content' | 'internal';

export default function AdminDashboard() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();
    const [activeSection, setActiveSection] = useState<ActiveSection>('content');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-tide">
                <div className="text-white/80 animate-pulse text-lg">Loading...</div>
            </div>
        );
    }

    if (!user) return null;

    const handleSignOut = async () => {
        await signOut();
        router.push('/login');
    };

    const navItems = [
        { id: 'content' as const, label: 'Website Content', icon: LayoutDashboard, description: 'Music, Merch, Tours' },
        { id: 'internal' as const, label: 'Internal Tools', icon: ListTodo, description: 'Checklist, Stats, Calendar' },
    ];

    return (
        <div className="min-h-screen bg-stone-100 flex">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-tide text-white rounded-lg shadow-lg"
            >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-40
                w-72 bg-cliff
                text-white flex flex-col shadow-2xl
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Logo/Brand */}
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-2xl font-bold tracking-tight text-white">Saltwater</h1>
                    <p className="text-sm text-white/60 mt-1">Admin Dashboard</p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveSection(item.id);
                                setSidebarOpen(false);
                            }}
                            className={`
                                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left
                                transition-all duration-200
                                ${activeSection === item.id
                                    ? 'bg-white/20 text-white shadow-lg'
                                    : 'text-white/70 hover:bg-white/10 hover:text-white'}
                            `}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            <div>
                                <span className="font-medium block text-white">{item.label}</span>
                                <span className="text-xs text-white/60">{item.description}</span>
                            </div>
                        </button>
                    ))}
                </nav>

                {/* Quick Links */}
                <div className="p-4 border-t border-white/10">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-3 px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        <span className="text-sm">View Live Site</span>
                    </Link>
                </div>

                {/* User Section */}
                <div className="p-4 border-t border-white/10">
                    <div className="px-4 py-2">
                        <p className="text-xs text-white/50 uppercase tracking-wider">Signed in as</p>
                        <p className="text-sm text-white/80 truncate">{user.email}</p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-2 mt-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {/* Header */}
                <header className="bg-white border-b border-stone-200 px-8 py-6 sticky top-0 z-10">
                    <div className="flex items-center justify-between max-w-7xl mx-auto pl-12 lg:pl-0">
                        <div>
                            <h2 className="text-2xl font-bold text-stone-800">
                                {activeSection === 'content' ? '📡 Website Content' : '🛠️ Internal Tools'}
                            </h2>
                            <p className="text-stone-500 mt-1">
                                {activeSection === 'content'
                                    ? 'Manage what visitors see on your public website'
                                    : 'Personal dashboard widgets for tracking and planning'}
                            </p>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="p-8 max-w-7xl mx-auto">
                    {activeSection === 'content' && (
                        <div className="space-y-8">
                            {/* Quick Stats Bar */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-pacific rounded-2xl p-5 shadow-lg">
                                    <div className="flex items-center gap-3">
                                        <Music className="w-8 h-8 text-white/80" />
                                        <div>
                                            <p className="text-sm text-white/80">Music Releases</p>
                                            <p className="text-2xl font-bold text-white">Manage</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-ember rounded-2xl p-5 shadow-lg">
                                    <div className="flex items-center gap-3">
                                        <ShoppingBag className="w-8 h-8 text-white/80" />
                                        <div>
                                            <p className="text-sm text-white/80">Merch Products</p>
                                            <p className="text-2xl font-bold text-white">Manage</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-tide rounded-2xl p-5 shadow-lg">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-8 h-8 text-white/80" />
                                        <div>
                                            <p className="text-sm text-white/80">Tour Dates</p>
                                            <p className="text-2xl font-bold text-white">Manage</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Widgets Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                <MusicWidget />
                                <MerchWidget />
                                <TourWidget />
                            </div>
                        </div>
                    )}

                    {activeSection === 'internal' && (
                        <div className="space-y-8">
                            {/* Quick Stats Bar */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-pacific/20 rounded-lg">
                                            <ListTodo className="w-5 h-5 text-pacific" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-stone-500">Checklist</p>
                                            <p className="font-semibold text-stone-800">Tasks</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-ember/20 rounded-lg">
                                            <Clock className="w-5 h-5 text-ember" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-stone-500">Countdown</p>
                                            <p className="font-semibold text-stone-800">Releases</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-tide/20 rounded-lg">
                                            <BarChart3 className="w-5 h-5 text-tide" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-stone-500">Statistics</p>
                                            <p className="font-semibold text-stone-800">Insights</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-driftwood/20 rounded-lg">
                                            <Calendar className="w-5 h-5 text-driftwood" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-stone-500">Calendar</p>
                                            <p className="font-semibold text-stone-800">Events</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Widgets Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <ChecklistWidget />
                                <CountdownWidget />
                                <StatsWidget />
                                <CalendarWidget />
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
