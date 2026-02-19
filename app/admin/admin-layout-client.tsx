"use client"

import { useState } from 'react'
import { Sidebar } from '@/components/admin/sidebar'
import { Header } from '@/components/admin/header'

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className="flex h-screen bg-[#0a0605] text-foreground font-sans">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0a0605] p-4 md:p-8 custom-scrollbar">
                    <div className="max-w-7xl mx-auto animate-fade-in">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
