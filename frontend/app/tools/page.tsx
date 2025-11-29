'use client';

import { useState } from 'react';

export default function ToolsPage() {
    return (
        <div className="min-h-screen bg-black p-8 text-white">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-8 text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Web Lab Tools
                </h1>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
                        <h2 className="mb-4 text-2xl font-semibold">4-Bar Linkage Simulator</h2>
                        <div className="aspect-video w-full rounded-lg bg-black/50 p-4 flex items-center justify-center border border-white/5">
                            <p className="text-gray-500">Canvas / Interactive Visualization Placeholder</p>
                        </div>
                        <div className="mt-4 flex gap-2">
                            <button className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500">
                                Launch Tool
                            </button>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
                        <h2 className="mb-4 text-2xl font-semibold">DOF Calculator</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400">Number of Links (n)</label>
                                <input type="number" className="w-full rounded bg-black/50 p-2 text-white border border-white/10" placeholder="4" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400">Number of Joints (j)</label>
                                <input type="number" className="w-full rounded bg-black/50 p-2 text-white border border-white/10" placeholder="4" />
                            </div>
                            <button className="w-full rounded-lg bg-cyan-600 px-4 py-2 font-medium text-white hover:bg-cyan-500">
                                Calculate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
