'use client';

import { useState } from 'react';

export default function AskAI() {
    const [query, setQuery] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleAsk = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query) return;

        setLoading(true);
        // Mock API call
        setTimeout(() => {
            setAnswer(`Here is a simulated answer to "${query}". In a real app, this would come from the LLM Gateway.`);
            setLoading(false);
        }, 1000);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 right-8 z-50 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white shadow-lg transition-transform hover:scale-110"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-8 z-50 w-80 rounded-2xl border border-white/10 bg-zinc-900 p-4 shadow-2xl backdrop-blur-xl">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-bold text-white">Ask AI Assistant</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                            &times;
                        </button>
                    </div>

                    <div className="mb-4 h-64 overflow-y-auto rounded-lg bg-black/50 p-3 text-sm text-gray-300">
                        {answer ? (
                            <p>{answer}</p>
                        ) : (
                            <p className="text-gray-500 italic">Ask me anything about kinematics...</p>
                        )}
                        {loading && <p className="mt-2 animate-pulse text-indigo-400">Thinking...</p>}
                    </div>

                    <form onSubmit={handleAsk} className="flex gap-2">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-1 rounded-lg bg-black/50 p-2 text-sm text-white border border-white/10 focus:border-indigo-500 focus:outline-none"
                            placeholder="Type your question..."
                        />
                        <button
                            type="submit"
                            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                            disabled={loading}
                        >
                            Send
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
