"use client";
import { useState, useEffect } from 'react';
import { Event, subscribeToEvents, addEvent, deleteEvent } from '@/lib/firestore';
import { Trash2, Plus, MapPin, ExternalLink } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';

export default function CalendarWidget() {
    const [events, setEvents] = useState<Event[]>([]);
    const [venue, setVenue] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [ticketLink, setTicketLink] = useState('');

    useEffect(() => {
        const unsubscribe = subscribeToEvents(setEvents);
        return () => unsubscribe();
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!venue || !date || !location) return;
        try {
            await addEvent({
                venue,
                location,
                date: Timestamp.fromDate(new Date(date)),
                ticketLink
            });
            setVenue('');
            setLocation('');
            setDate('');
            setTicketLink('');
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    return (
        <div className="border border-stone-200 p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col h-full md:col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-semibold mb-4 text-tide font-serif">Calendar</h2>

            <form onSubmit={handleAdd} className="flex flex-col gap-2 mb-4 bg-stone-50 p-3 rounded">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        placeholder="Venue"
                        className="p-2 border border-stone-300 rounded text-sm flex-1"
                    />
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="City/State"
                        className="p-2 border border-stone-300 rounded text-sm flex-1"
                    />
                </div>
                <div className="flex gap-2">
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="p-2 border border-stone-300 rounded text-sm flex-1"
                    />
                    <input
                        type="text"
                        value={ticketLink}
                        onChange={(e) => setTicketLink(e.target.value)}
                        placeholder="Ticket Link (Optional)"
                        className="p-2 border border-stone-300 rounded text-sm flex-1"
                    />
                </div>

                <button type="submit" className="p-2 bg-pacific text-white rounded hover:bg-tide w-full flex items-center justify-center gap-2 text-sm">
                    <Plus size={16} /> Add Event
                </button>
            </form>

            <div className="flex-1 overflow-y-auto max-h-64 space-y-2">
                {events.map((event) => (
                    <div key={event.id} className="flex items-center justify-between group p-2 hover:bg-stone-50 rounded border-b border-stone-100 last:border-0">
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <p className="font-semibold text-stone-800 text-sm">{event.venue}</p>
                                <span className="text-xs text-stone-500">{event.date.toDate().toLocaleDateString()}</span>
                            </div>
                            <p className="text-xs text-stone-500 flex items-center gap-1">
                                <MapPin size={10} /> {event.location}
                                {event.ticketLink && (
                                    <a href={event.ticketLink} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:underline flex items-center gap-0.5">
                                        <ExternalLink size={10} /> Tickets
                                    </a>
                                )}
                            </p>
                        </div>
                        <button onClick={() => deleteEvent(event.id)} className="text-stone-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
                {events.length === 0 && <p className="text-center text-stone-400 text-sm py-4">No events scheduled.</p>}
            </div>
        </div>
    );
}

