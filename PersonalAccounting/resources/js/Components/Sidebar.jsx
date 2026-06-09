import React from 'react';
import { Link } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Receipt, 
    BookOpen, 
    GitMerge, 
    Settings, 
    Plus, 
    HelpCircle, 
    LogOut 
} from 'lucide-react';

export default function Sidebar({ activePath = '/transactions' }) {
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Transactions', path: '/transactions', icon: Receipt },
        { name: 'Journal Entries', path: '/journal-entries', icon: BookOpen },
        { name: 'Entry Pipeline', path: '/entry-pipeline', icon: GitMerge },
        { name: 'Settings', path: '/profile', icon: Settings },
    ];

    const bottomItems = [
        { name: 'Support', path: '/support', icon: HelpCircle },
        { name: 'Sign Out', path: '/logout', icon: LogOut, method: 'post' },
    ];

    return (
        <aside className="w-64 bg-[#f8fafe] border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
            {/* Logo Area */}
            <div className="p-6">
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">LedgerFlow</h1>
                <p className="text-xs text-gray-500 mt-1">Fiscal Precision</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = activePath === item.path;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                isActive 
                                    ? 'bg-[#eef2fc] text-blue-700 border-l-4 border-blue-600' 
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-l-4 border-transparent'
                            }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* New Entry Button */}
            <div className="px-4 py-4">
                <button className="w-full flex items-center justify-center space-x-2 bg-black text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>New Entry</span>
                </button>
            </div>

            {/* Bottom Navigation */}
            <div className="p-4 space-y-1">
                {bottomItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            method={item.method || 'get'}
                            as={item.method ? 'button' : 'a'}
                            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                        >
                            <Icon className="w-5 h-5 text-gray-400" />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}
