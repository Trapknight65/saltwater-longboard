"use client";

import { useState, useEffect } from "react";
import { Music, Disc, Plus, Trash2, Edit2, X, Check } from "lucide-react";
import {
    MusicRelease,
    subscribeToMusic,
    addMusic,
    updateMusic,
    deleteMusic
} from "@/lib/firestore";

export default function MusicWidget() {
    const [releases, setReleases] = useState<MusicRelease[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form state
    const [title, setTitle] = useState("");
    const [type, setType] = useState<'Single' | 'EP' | 'Album'>("Single");
    const [dateLabel, setDateLabel] = useState("");
    const [status, setStatus] = useState<'active' | 'upcoming' | 'future'>("upcoming");

    useEffect(() => {
        const unsubscribe = subscribeToMusic(setReleases);
        return () => unsubscribe();
    }, []);

    const resetForm = () => {
        setTitle("");
        setType("Single");
        setDateLabel("");
        setStatus("upcoming");
        setIsAdding(false);
        setEditingId(null);
    };

    const handleAdd = async () => {
        if (!title.trim() || !dateLabel.trim()) return;
        await addMusic({
            title: title.trim(),
            type,
            dateLabel: dateLabel.trim(),
            status,
            order: releases.length
        });
        resetForm();
    };

    const handleEdit = (release: MusicRelease) => {
        setEditingId(release.id);
        setTitle(release.title);
        setType(release.type);
        setDateLabel(release.dateLabel);
        setStatus(release.status);
    };

    const handleUpdate = async () => {
        if (!editingId || !title.trim() || !dateLabel.trim()) return;
        await updateMusic(editingId, {
            title: title.trim(),
            type,
            dateLabel: dateLabel.trim(),
            status
        });
        resetForm();
    };

    const handleDelete = async (id: string) => {
        if (confirm("Delete this release?")) {
            await deleteMusic(id);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-700';
            case 'upcoming': return 'bg-yellow-100 text-yellow-700';
            case 'future': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-pacific-800 flex items-center gap-2">
                    <Music className="w-5 h-5" /> Music Releases
                </h2>
                {!isAdding && !editingId && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="p-2 rounded-full bg-pacific-100 text-pacific-600 hover:bg-pacific-200 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingId) && (
                <div className="mb-4 p-4 bg-stone-50 rounded-lg space-y-3">
                    <input
                        type="text"
                        placeholder="Title (e.g., 'Saltwater Dreams')"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value as 'Single' | 'EP' | 'Album')}
                            className="px-3 py-2 border rounded-lg text-sm"
                        >
                            <option value="Single">Single</option>
                            <option value="EP">EP</option>
                            <option value="Album">Album</option>
                        </select>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as 'active' | 'upcoming' | 'future')}
                            className="px-3 py-2 border rounded-lg text-sm"
                        >
                            <option value="active">Active (Out Now)</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="future">Future</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        placeholder="Date label (e.g., 'Out Now', 'Late 2025')"
                        value={dateLabel}
                        onChange={(e) => setDateLabel(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={editingId ? handleUpdate : handleAdd}
                            className="flex-1 py-2 bg-pacific-600 text-white rounded-lg text-sm font-medium hover:bg-pacific-700 flex items-center justify-center gap-1"
                        >
                            <Check className="w-4 h-4" />
                            {editingId ? "Update" : "Add Release"}
                        </button>
                        <button
                            onClick={resetForm}
                            className="px-4 py-2 bg-stone-200 text-stone-600 rounded-lg text-sm font-medium hover:bg-stone-300"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Releases List */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
                {releases.length === 0 ? (
                    <p className="text-stone-400 text-sm text-center py-4">No releases yet. Add your first one!</p>
                ) : (
                    releases.map((release) => (
                        <div
                            key={release.id}
                            className="flex items-center justify-between p-3 bg-stone-50 rounded-lg group"
                        >
                            <div className="flex items-center gap-3">
                                {release.type === 'Album' ? (
                                    <Disc className="w-5 h-5 text-pacific-600" />
                                ) : (
                                    <Music className="w-5 h-5 text-pacific-600" />
                                )}
                                <div>
                                    <p className="font-medium text-stone-800">{release.title}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs px-2 py-0.5 bg-pacific-100 text-pacific-700 rounded">
                                            {release.type}
                                        </span>
                                        <span className={`text-xs px-2 py-0.5 rounded ${getStatusColor(release.status)}`}>
                                            {release.dateLabel}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(release)}
                                    className="p-1.5 text-stone-400 hover:text-pacific-600 hover:bg-pacific-50 rounded"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(release.id)}
                                    className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
