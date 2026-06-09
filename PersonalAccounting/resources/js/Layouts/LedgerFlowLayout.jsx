import React from 'react';
import Sidebar from '@/Components/Sidebar';
import Topbar from '@/Components/Topbar';

export default function LedgerFlowLayout({ children, activePath = '/transactions' }) {
    return (
        <div className="min-h-screen bg-[#f3f4f6] font-sans text-gray-900">
            <Sidebar activePath={activePath} />
            <div className="ml-64 flex flex-col min-h-screen">
                <Topbar />
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
