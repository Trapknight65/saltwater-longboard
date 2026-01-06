"use client";
import { useState, useEffect } from 'react';
import { Release, subscribeToReleases, addRelease, deleteRelease } from '@/lib/firestore';
import { Trash2, Plus, Calendar } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';

export default function CountdownWidget() {
    const [releases, setReleases] = useState<Release[]>([]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState<'Single' | 'EP' | 'Album'>('Single');

    useEffect(() => {
        const unsubscribe = subscribeToReleases(setReleases);
        return () => unsubscribe();
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !date) return;
        try {
            await addRelease({
                title,
                date: Timestamp.fromDate(new Date(date)),
                type
            });
            setTitle('');
            setDate('');
        } catch (error) {
            console.error("Error adding release:", error);
        }
    };

    return (
        <div className="border border-stone-200 p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
            <h2 className="text-2xl font-semibold mb-4 text-tide font-serif">Releases</h2>

            <form onSubmit={handleAdd} className="flex flex-col gap-2 mb-4 bg-stone-50 p-3 rounded">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Release Title"
                    className="p-2 border border-stone-300 rounded text-sm w-full"
                />
                <div className="flex gap-2">
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="p-2 border border-stone-300 rounded text-sm flex-1"
                    />
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value as any)}
                        className="p-2 border border-stone-300 rounded text-sm"
                    >
                        <option value="Single">Single</option>
                        <option value="EP">EP</option>
                        <option value="Album">Album</option>
                    </select>
                </div>
                <button type="submit" className="p-2 bg-pacific text-white rounded hover:bg-tide w-full flex items-center justify-center gap-2 text-sm">
                    <Plus size={16} /> Add Release
                </button>
            </form>

            <div className="flex-1 overflow-y-auto max-h-48 space-y-2">
                {releases.map((release) => (
                    <div key={release.id} className="flex items-center justify-between group p-2 hover:bg-stone-50 rounded border-b border-stone-100 last:border-0">
                        <div>
                            <p className="font-semibold text-stone-800 text-sm">{release.title}</p>
                            <p className="text-xs text-stone-500 flex items-center gap-1">
                                <Calendar size={10} />
                                {release.date.toDate().toLocaleDateString()} • {release.type}
                            </p>
                        </div>
                        <button onClick={() => deleteRelease(release.id)} className="text-stone-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
                {releases.length === 0 && <p className="text-center text-stone-400 text-sm py-4">No releases scheduled.</p>}
            </div>
        </div>
    );
}


