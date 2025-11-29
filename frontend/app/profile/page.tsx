'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api, { setAuthToken } from '@/lib/api';
import Link from 'next/link';

interface User {
    id: number;
    email: string;
    full_name: string;
    role: string;
}

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/auth/me');
                setUser(response.data);
            } catch (err) {
                console.error(err);
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    const handleLogout = () => {
        setAuthToken('');
        router.push('/login');
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black p-8 text-white">
            <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-zinc-900 p-8">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">My Profile</h1>
                    <button
                        onClick={handleLogout}
                        className="rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20"
                    >
                        Logout
                    </button>
                </div>

                {user && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="rounded-xl bg-black/20 p-4">
                                <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</label>
                                <div className="text-lg font-medium">{user.full_name}</div>
                            </div>

                            <div className="rounded-xl bg-black/20 p-4">
                                <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider">Role</label>
                                <div className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400">
                                    {user.role}
                                </div>
                            </div>

                            <div className="col-span-full rounded-xl bg-black/20 p-4">
                                <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider">Email</label>
                                <div className="text-lg font-medium">{user.email}</div>
                            </div>
                        </div>

                        <div className="mt-8 border-t border-white/10 pt-8">
                            <h2 className="mb-4 text-xl font-semibold">Activity</h2>
                            <p className="text-gray-500">No recent activity.</p>
                        </div>
                    </div>
                )}

                <div className="mt-8">
                    <Link href="/" className="text-gray-400 hover:text-white">
                        &larr; Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
