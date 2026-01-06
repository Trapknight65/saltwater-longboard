"use client";
import { useState, useEffect } from 'react';
import { Stats, subscribeToStats, updateStats } from '@/lib/firestore';
import { Save, BarChart3 } from 'lucide-react';

export default function StatsWidget() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [listeners, setListeners] = useState(0);
    const [streams, setStreams] = useState(0);
    const [followers, setFollowers] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeToStats((data) => {
            setStats(data);
            if (data) {
                setListeners(data.listeners);
                setStreams(data.streams);
                setFollowers(data.followers);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleSave = async () => {
        try {
            await updateStats({ listeners, streams, followers });
            // Visual feedback could be added here
        } catch (error) {
            console.error("Error updating stats:", error);
        }
    };

    if (loading) return <div className="p-6 border rounded-lg h-full flex items-center justify-center">Loading...</div>;

    return (
        <div className="border border-stone-200 p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-pacific-700 font-serif">Stats</h2>
                <BarChart3 className="text-pacific-300" />
            </div>

            <div className="space-y-4 flex-1">
                <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wide">Monthly Listeners</label>
                    <input
                        type="number"
                        value={listeners}
                        onChange={(e) => setListeners(parseInt(e.target.value) || 0)}
                        className="w-full p-2 border border-stone-300 rounded bg-stone-50"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wide">Total Streams</label>
                    <input
                        type="number"
                        value={streams}
                        onChange={(e) => setStreams(parseInt(e.target.value) || 0)}
                        className="w-full p-2 border border-stone-300 rounded bg-stone-50"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wide">Followers</label>
                    <input
                        type="number"
                        value={followers}
                        onChange={(e) => setFollowers(parseInt(e.target.value) || 0)}
                        className="w-full p-2 border border-stone-300 rounded bg-stone-50"
                    />
                </div>
            </div>

            <button onClick={handleSave} className="mt-6 w-full p-3 bg-terracotta-600 text-white rounded hover:bg-terracotta-700 flex items-center justify-center gap-2">
                <Save size={18} /> Update Stats
            </button>
        </div>
    );
}
