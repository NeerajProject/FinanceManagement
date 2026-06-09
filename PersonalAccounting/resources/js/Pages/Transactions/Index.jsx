import React from 'react';
import LedgerFlowLayout from '@/Layouts/LedgerFlowLayout';
import { 
    Upload, 
    Plus, 
    Calendar, 
    ChevronDown, 
    MoreVertical,
    Landmark,
    Banknote,
    CreditCard,
    Info
} from 'lucide-react';

const dummyData = [
    {
        id: 1,
        date: 'Oct 24, 2023',
        ref: 'TXN-94821',
        account: { name: 'Chase Operating', icon: Landmark, color: 'text-blue-600' },
        categories: ['Software', 'SaaS'],
        amount: -1240.00,
        status: 'CLEARED',
        statusColor: 'text-green-600',
        statusDot: 'bg-green-500'
    },
    {
        id: 2,
        date: 'Oct 23, 2023',
        ref: 'TXN-94820',
        account: { name: 'Petty Cash', icon: Banknote, color: 'text-blue-600' },
        categories: ['Office Supplies'],
        amount: -45.20,
        status: 'CLEARED',
        statusColor: 'text-green-600',
        statusDot: 'bg-green-500',
        hasMenu: true
    },
    {
        id: 3,
        date: 'Oct 22, 2023',
        ref: 'TXN-94819',
        account: { name: 'SVB Deposit', icon: Landmark, color: 'text-blue-600' },
        categories: ['Client Payment'],
        amount: 15000.00,
        status: 'PENDING',
        statusColor: 'text-blue-600',
        statusDot: 'bg-blue-500'
    },
    {
        id: 4,
        date: 'Oct 22, 2023',
        ref: 'TXN-94818',
        account: { name: 'Chase Operating', icon: Landmark, color: 'text-blue-600' },
        categories: ['Rent'],
        amount: -4200.00,
        status: 'CLEARED',
        statusColor: 'text-green-600',
        statusDot: 'bg-green-500'
    },
    {
        id: 5,
        date: 'Oct 21, 2023',
        ref: 'TXN-94817',
        account: { name: 'Amex Corporate', icon: CreditCard, color: 'text-blue-600' },
        categories: ['Travel'],
        amount: -342.15,
        status: 'OVERDUE',
        statusColor: 'text-red-600',
        statusDot: 'bg-red-500'
    },
    {
        id: 6,
        date: 'Oct 21, 2023',
        ref: 'TXN-94816',
        account: { name: 'Chase Operating', icon: Landmark, color: 'text-blue-600' },
        categories: ['Utilities'],
        amount: -89.00,
        status: 'CLEARED',
        statusColor: 'text-green-600',
        statusDot: 'bg-green-500'
    }
];

export default function Index() {
    return (
        <LedgerFlowLayout activePath="/transactions">
            <div className="max-w-7xl mx-auto">
                {/* Header Area */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Transactions</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage and review all fiscal activities for LedgerFlow.</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
                            <Upload className="w-4 h-4" />
                            <span>Import</span>
                        </button>
                        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                            <Plus className="w-4 h-4" />
                            <span>New Transaction</span>
                        </button>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                    {/* Filters */}
                    <div className="p-4 border-b border-gray-200 flex flex-wrap items-center gap-3">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2">Filters:</span>
                        
                        <button className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md text-sm hover:bg-gray-50 transition-colors">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span>Last 30 Days</span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>

                        <button className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md text-sm hover:bg-gray-50 transition-colors">
                            <div className="w-4 h-4 flex items-center justify-center">
                                <div className="w-3 h-3 border border-gray-500 rounded-sm" />
                            </div>
                            <span>All Categories</span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>

                        <button className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md text-sm hover:bg-gray-50 transition-colors">
                            <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                <div className="w-2 h-2 bg-gray-500 rounded-full" />
                            </div>
                            <span>Status: Cleared</span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>

                        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium ml-2">
                            Clear All Filters
                        </button>
                    </div>

                    {/* Data Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50/50">
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center space-x-1">
                                            <span>Date</span>
                                            <ChevronDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reference #</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Account</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Amount</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {dummyData.map((row) => {
                                    const AccountIcon = row.account.icon;
                                    const formattedAmount = row.amount < 0 
                                        ? `-$${Math.abs(row.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                                        : `+$${Math.abs(row.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
                                    
                                    const amountColor = row.amount < 0 ? 'text-red-600' : 'text-green-600';

                                    return (
                                        <tr key={row.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900 w-20">{row.date}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600">{row.ref}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`p-1.5 rounded-md bg-blue-50 ${row.account.color}`}>
                                                        <AccountIcon className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">{row.account.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {row.categories.map(cat => (
                                                        <span key={cat} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#eef2fc] text-blue-700">
                                                            {cat}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className={`text-sm font-bold ${amountColor}`}>
                                                    {formattedAmount}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <div className={`w-2 h-2 rounded-full ${row.statusDot}`} />
                                                    <span className={`text-xs font-bold ${row.statusColor}`}>{row.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {row.hasMenu && (
                                                    <button className="text-gray-400 hover:text-gray-600">
                                                        <MoreVertical className="w-5 h-5" />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            Showing <span className="font-medium text-gray-900">1-6</span> of <span className="font-medium text-gray-900">245</span> entries
                        </div>
                        <div className="flex items-center space-x-1">
                            <button className="px-3 py-1 border border-gray-300 text-gray-500 rounded-md hover:bg-gray-50 disabled:opacity-50 text-sm">
                                &lt;
                            </button>
                            <button className="px-3 py-1 bg-blue-600 text-white border border-blue-600 rounded-md text-sm font-medium">
                                1
                            </button>
                            <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium">
                                2
                            </button>
                            <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium">
                                3
                            </button>
                            <span className="px-2 text-gray-400">...</span>
                            <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium">
                                24
                            </button>
                            <button className="px-3 py-1 border border-gray-300 text-gray-500 rounded-md hover:bg-gray-50 text-sm">
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Sync Note */}
                <div className="flex justify-center pb-8">
                    <div className="inline-flex items-center space-x-2 bg-blue-50/50 border border-blue-100 rounded-full px-4 py-1.5">
                        <Info className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-600">Last bank synchronization: 12 minutes ago</span>
                        <button className="text-xs font-semibold text-blue-600 hover:text-blue-800 ml-2">Sync Now</button>
                    </div>
                </div>
            </div>
        </LedgerFlowLayout>
    );
}
