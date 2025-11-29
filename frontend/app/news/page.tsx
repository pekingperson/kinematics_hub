'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface NewsItem {
    title: string;
    link: string;
    published: string;
    summary: string;
    source: string;
}

export default function NewsPage() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                // Mock data fallback if backend not reachable
                try {
                    const res = await axios.get('http://localhost:8008/news');
                    setNews(res.data);
                } catch (err) {
                    console.warn("Backend unavailable, using mock data");
                    setNews([
                        {
                            title: 'New Soft Robot Gripper Inspired by Geckos',
                            link: '#',
                            published: 'Fri, 28 Nov 2025 10:00:00 GMT',
                            summary: 'Researchers have developed a new soft robotic gripper...',
                            source: 'Robotics Daily'
                        },
                        {
                            title: 'Advances in Humanoid Locomotion',
                            link: '#',
                            published: 'Thu, 27 Nov 2025 14:30:00 GMT',
                            summary: 'A look at the latest algorithms for bipedal walking...',
                            source: 'Tech Robotics'
                        }
                    ]);
                }
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        // Mock subscription
        setSubscribed(true);
        setEmail('');
    };

    return (
        <div className="min-h-screen bg-black p-8 text-white">
            <div className="mx-auto max-w-5xl">
                <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                            Robotics News
                        </h1>
                        <p className="mt-2 text-gray-400">Curated updates from the industry.</p>
                    </div>

                    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6">
                        <h3 className="mb-2 font-semibold text-white">Weekly Digest</h3>
                        {subscribed ? (
                            <p className="text-green-400">Thanks for subscribing!</p>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 rounded-lg bg-black/50 p-2 text-sm text-white border border-white/10"
                                    placeholder="Enter your email"
                                />
                                <button
                                    type="submit"
                                    className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500"
                                >
                                    Subscribe
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500">Loading news...</p>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2">
                        {news.map((item, idx) => (
                            <div key={idx} className="flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-900/50 p-6 transition-all hover:bg-zinc-900">
                                <div>
                                    <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
                                        <span>{item.source}</span>
                                        <span>{new Date(item.published).toLocaleDateString()}</span>
                                    </div>
                                    <h2 className="mb-3 text-xl font-semibold text-white">
                                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">
                                            {item.title}
                                        </a>
                                    </h2>
                                    <div className="text-sm text-gray-400 line-clamp-3" dangerouslySetInnerHTML={{ __html: item.summary }} />
                                </div>
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-block text-sm font-medium text-orange-400 hover:text-orange-300"
                                >
                                    Read more &rarr;
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
