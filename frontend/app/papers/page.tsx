'use client';

import { useState } from 'react';
import axios from 'axios';

interface Paper {
    paperId: string;
    title: string;
    year: number;
    abstract: string;
    url: string;
    authors: { name: string }[];
}

export default function PapersPage() {
    const [query, setQuery] = useState('');
    const [papers, setPapers] = useState<Paper[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query) return;

        setLoading(true);
        try {
            // In a real app, this would call the backend service
            // const res = await axios.get(`http://localhost:8007/search?query=${query}`);
            // setPapers(res.data);

            // Mock data for MVP if backend not reachable from client directly (CORS etc)
            // For this demo, we'll assume direct call or mock if failed
            try {
                const res = await axios.get(`http://localhost:8007/search?query=${query}`);
                setPapers(res.data);
            } catch (err) {
                console.warn("Backend unavailable, using mock data");
                setPapers([
                    {
                        paperId: '1',
                        title: 'Kinematic Analysis of 4-Bar Mechanisms',
                        year: 2023,
                        abstract: 'This paper presents a novel approach to analyzing 4-bar linkages...',
                        url: '#',
                        authors: [{ name: 'J. Doe' }, { name: 'A. Smith' }]
                    },
                    {
                        paperId: '2',
                        title: 'Deep Learning for Robot Control',
                        year: 2024,
                        abstract: 'A survey of deep learning methods applied to robotic manipulation...',
                        url: '#',
                        authors: [{ name: 'B. Johnson' }]
                    }
                ]);
            }

        } catch (error) {
            console.error('Error fetching papers:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black p-8 text-white">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-8 text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    Research Papers
                </h1>

                <form onSubmit={handleSearch} className="mb-12 flex gap-4">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 rounded-xl bg-zinc-900 p-4 text-lg text-white border border-white/10 focus:border-green-500 focus:outline-none"
                        placeholder="Search for papers (e.g., 'kinematics', 'robotics')..."
                    />
                    <button
                        type="submit"
                        className="rounded-xl bg-green-600 px-8 text-lg font-semibold text-white hover:bg-green-500 transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </form>

                <div className="space-y-6">
                    {papers.map((paper) => (
                        <div key={paper.paperId} className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 transition-all hover:bg-zinc-900">
                            <h2 className="mb-2 text-xl font-semibold text-white">
                                <a href={paper.url} target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
                                    {paper.title}
                                </a>
                            </h2>
                            <div className="mb-4 flex gap-4 text-sm text-gray-400">
                                <span>{paper.year}</span>
                                <span>•</span>
                                <span>{paper.authors.map((a) => a.name).join(', ')}</span>
                            </div>
                            <p className="text-gray-300 leading-relaxed">{paper.abstract}</p>
                        </div>
                    ))}

                    {papers.length === 0 && !loading && query && (
                        <p className="text-center text-gray-500">No papers found. Try a different query.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
