'use client';

import { useEffect, useState, useRef } from 'react';

export default function ChatPage() {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        // Connect to WebSocket
        ws.current = new WebSocket('ws://localhost:8005/ws/chat');

        ws.current.onopen = () => {
            console.log('Connected to chat');
        };

        ws.current.onmessage = (event) => {
            setMessages((prev) => [...prev, event.data]);
        };

        return () => {
            ws.current?.close();
        };
    }, []);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (input && ws.current) {
            ws.current.send(input);
            setInput('');
        }
    };

    return (
        <div className="flex h-screen flex-col bg-black text-white">
            <div className="border-b border-white/10 bg-zinc-900 p-4">
                <h1 className="text-xl font-bold">Global Chat</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((msg, idx) => (
                    <div key={idx} className="rounded-lg bg-white/5 p-3 max-w-lg">
                        {msg}
                    </div>
                ))}
            </div>

            <div className="border-t border-white/10 bg-zinc-900 p-4">
                <form onSubmit={sendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 rounded-lg bg-black p-3 text-white border border-white/10 focus:border-blue-500 focus:outline-none"
                        placeholder="Type a message..."
                    />
                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-6 font-semibold text-white hover:bg-blue-500"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
