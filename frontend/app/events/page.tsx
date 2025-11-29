'use client';

import { useEffect, useState } from 'react';

interface Event {
    id: number;
    title: string;
    description: string;
    start_time: string;
    location: string;
}

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        // Mock data
        setEvents([
            {
                id: 1,
                title: 'Kinematics Workshop 2025',
                description: 'Annual workshop on computational kinematics.',
                start_time: '2025-05-15T09:00:00',
                location: 'Zoom',
            },
            {
                id: 2,
                title: 'Guest Lecture: Prof. Smith',
                description: 'Advanced synthesis of 6R linkages.',
                start_time: '2025-06-01T14:00:00',
                location: 'Room 304',
            },
        ]);
    }, []);

    return (
        <div className="min-h-screen bg-black p-8 text-white">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-8 text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    Upcoming Events
                </h1>

                <div className="space-y-4">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-zinc-900/50 p-6 md:flex-row md:items-center md:justify-between"
                        >
                            <div>
                                <div className="mb-1 text-sm text-green-400">
                                    {new Date(event.start_time).toLocaleDateString()} • {event.location}
                                </div>
                                <h2 className="text-xl font-semibold text-white">{event.title}</h2>
                                <p className="mt-1 text-gray-400">{event.description}</p>
                            </div>
                            <button className="rounded-lg bg-white/10 px-6 py-2 font-medium text-white transition-colors hover:bg-white/20">
                                Register
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
