'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

interface Space {
    id: number;
    name: string;
    description: string;
}

export default function CommunityPage() {
    const [spaces, setSpaces] = useState<Space[]>([]);

    useEffect(() => {
        // In a real app, we'd fetch from the community service
        // const fetchSpaces = async () => {
        //   const res = await api.get('http://localhost:8001/spaces');
        //   setSpaces(res.data);
        // };
        // fetchSpaces();

        // Mock data for now since we need to setup the proxy or CORS
        setSpaces([
            { id: 1, name: 'General Discussion', description: 'Talk about anything related to kinematics.' },
            { id: 2, name: 'Planar Mechanisms', description: '4-bar, 5-bar, and other planar linkages.' },
            { id: 3, name: 'Robotics', description: 'Serial and parallel manipulators.' },
        ]);
    }, []);

    return (
        <div className="min-h-screen bg-black p-8 text-white">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-8 text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Community Spaces
                </h1>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {spaces.map((space) => (
                        <div
                            key={space.id}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 transition-all hover:border-blue-500/50 hover:bg-zinc-900"
                        >
                            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                            <h2 className="mb-2 text-xl font-semibold text-white">{space.name}</h2>
                            <p className="text-gray-400">{space.description}</p>
                            <button className="mt-4 text-sm font-medium text-blue-400 group-hover:text-blue-300">
                                View Topics &rarr;
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
