'use client';

import { useEffect, useState } from 'react';

interface Project {
    id: number;
    title: string;
    abstract: string;
    is_featured: boolean;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        // Mock data
        setProjects([
            {
                id: 1,
                title: '4-Bar Linkage Synthesis',
                abstract: 'An interactive tool for synthesizing 4-bar linkages for path generation.',
                is_featured: true,
            },
            {
                id: 2,
                title: 'Delta Robot Kinematics',
                abstract: 'Analysis of the inverse kinematics of a Delta robot.',
                is_featured: false,
            },
        ]);
    }, []);

    return (
        <div className="min-h-screen bg-black p-8 text-white">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-8 text-4xl font-bold bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
                    Student Projects
                </h1>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 transition-all hover:border-pink-500/50 hover:bg-zinc-900"
                        >
                            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-500/10 to-rose-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                            {project.is_featured && (
                                <span className="mb-2 inline-block rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-medium text-yellow-300">
                                    Featured
                                </span>
                            )}
                            <h2 className="mb-2 text-xl font-semibold text-white">{project.title}</h2>
                            <p className="text-gray-400">{project.abstract}</p>
                            <button className="mt-4 text-sm font-medium text-pink-400 group-hover:text-pink-300">
                                View Project &rarr;
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
