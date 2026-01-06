"use client";

import { useState, useEffect } from "react";
import { MapPin, Calendar, Plus, Trash2, Edit2, X, Check, Ticket } from "lucide-react";
import {
    TourDate,
    subscribeToTourDates,
    addTourDate,
    updateTourDate,
    deleteTourDate
} from "@/lib/firestore";

export default function TourWidget() {
    const [shows, setShows] = useState<TourDate[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form state
    const [dateLabel, setDateLabel] = useState("");
    const [venue, setVenue] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState<'Available' | 'Selling Fast' | 'Sold Out'>("Available");
    const [ticketLink, setTicketLink] = useState("");

    useEffect(() => {
        const unsubscribe = subscribeToTourDates(setShows);
        return () => unsubscribe();
    }, []);

    const resetForm = () => {
        setDateLabel("");
        setVenue("");
        setLocation("");
        setStatus("Available");
        setTicketLink("");
        setIsAdding(false);
        setEditingId(null);
    };

    const handleAdd = async () => {
        if (!dateLabel.trim() || !venue.trim() || !location.trim()) return;
        await addTourDate({
            dateLabel: dateLabel.trim(),
            venue: venue.trim(),
            location: location.trim(),
            status,
            ticketLink: ticketLink.trim() || undefined,
            order: shows.length
        });
        resetForm();
    };

    const handleEdit = (show: TourDate) => {
        setEditingId(show.id);
        setDateLabel(show.dateLabel);
        setVenue(show.venue);
        setLocation(show.location);
        setStatus(show.status);
        setTicketLink(show.ticketLink || "");
    };

    const handleUpdate = async () => {
        if (!editingId || !dateLabel.trim() || !venue.trim() || !location.trim()) return;
        await updateTourDate(editingId, {
            dateLabel: dateLabel.trim(),
            venue: venue.trim(),
            location: location.trim(),
            status,
            ticketLink: ticketLink.trim() || undefined
        });
        resetForm();
    };

    const handleDelete = async (id: string) => {
        if (confirm("Delete this show?")) {
            await deleteTourDate(id);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Available': return 'bg-green-100 text-green-700';
            case 'Selling Fast': return 'bg-yellow-100 text-yellow-700';
            case 'Sold Out': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-tide flex items-center gap-2">
                    <Ticket className="w-5 h-5" /> Tour Dates
                </h2>
                {!isAdding && !editingId && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="p-2 rounded-full bg-pacific/10 text-pacific hover:bg-pacific-200 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingId) && (
                <div className="mb-4 p-4 bg-stone-50 rounded-lg space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            placeholder="Date (e.g., 'May 15')"
                            value={dateLabel}
                            onChange={(e) => setDateLabel(e.target.value)}
                            className="px-3 py-2 border rounded-lg text-sm"
                        />
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as 'Available' | 'Selling Fast' | 'Sold Out')}
                            className="px-3 py-2 border rounded-lg text-sm"
                        >
                            <option value="Available">Available</option>
                            <option value="Selling Fast">Selling Fast</option>
                            <option value="Sold Out">Sold Out</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        placeholder="Venue (e.g., 'Red Rocks')"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                    <input
                        type="text"
                        placeholder="Location (e.g., 'Morrison, CO')"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                    <input
                        type="url"
                        placeholder="Ticket link (optional)"
                        value={ticketLink}
                        onChange={(e) => setTicketLink(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={editingId ? handleUpdate : handleAdd}
                            className="flex-1 py-2 bg-pacific text-white rounded-lg text-sm font-medium hover:bg-tide flex items-center justify-center gap-1"
                        >
                            <Check className="w-4 h-4" />
                            {editingId ? "Update" : "Add Show"}
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

            {/* Shows List */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
                {shows.length === 0 ? (
                    <p className="text-stone-400 text-sm text-center py-4">No tour dates yet. Add your first one!</p>
                ) : (
                    shows.map((show) => (
                        <div
                            key={show.id}
                            className="flex items-center justify-between p-3 bg-stone-50 rounded-lg group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col items-center justify-center w-12 h-12 bg-pacific/10 rounded-lg">
                                    <Calendar className="w-4 h-4 text-pacific" />
                                    <span className="text-xs font-bold text-tide">{show.dateLabel.split(" ")[1] || show.dateLabel}</span>
                                </div>
                                <div>
                                    <p className="font-medium text-stone-800">{show.venue}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-stone-500 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" /> {show.location}
                                        </span>
                                        <span className={`text-xs px-2 py-0.5 rounded ${getStatusColor(show.status)}`}>
                                            {show.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(show)}
                                    className="p-1.5 text-stone-400 hover:text-pacific hover:bg-pacific/10 rounded"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(show.id)}
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

