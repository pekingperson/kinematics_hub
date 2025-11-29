import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AskAI from '@/components/AskAI'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Kinematics Hub',
    description: 'A modular platform for the robotics community',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
                <AskAI />
            </body>
        </html>
    )
}
