import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';

export default function Topbar() {
    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search accounts, entities, or amounts..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
                <button className="text-gray-400 hover:text-gray-500 transition-colors">
                    <Bell className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-gray-500 transition-colors">
                    <Settings className="h-5 w-5" />
                </button>
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                    Download Report
                </button>
                <div className="h-8 w-8 rounded-full overflow-hidden border border-gray-200">
                    <img 
                        src="https://ui-avatars.com/api/?name=User&background=random" 
                        alt="Profile" 
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </header>
    );
}
