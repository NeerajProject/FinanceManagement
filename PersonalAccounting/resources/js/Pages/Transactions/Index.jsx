/**
 * @file Pages/Transactions/Index.jsx
 * @description Transactions list page — displays all transactions in a filterable,
 * paginated table. Each row links to Transactions/Show.jsx for the detail view.
 *
 * Data source: resources/js/Data/transactions.js (dummy) →
 *              replace `TRANSACTIONS` with Inertia `usePage().props.transactions`
 *              once the backend TransactionController is wired up.
 */

import React from 'react';
import { Link } from '@inertiajs/react';
import LedgerFlowLayout from '@/Layouts/LedgerFlowLayout';
import { TRANSACTIONS } from '@/Data/transactions';
import { formatAmount, amountColor, statusStyles } from '@/Data/helpers';
import {
    Upload,
    Plus,
    Calendar,
    ChevronDown,
    MoreVertical,
    Landmark,
    Banknote,
    CreditCard,
    Info,
} from 'lucide-react';

/** Map accountType string → lucide icon component */
const ACCOUNT_ICONS = {
    bank: Landmark,
    cash: Banknote,
    card: CreditCard,
};

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function Index() {
    return (
        <LedgerFlowLayout activePath="/transactions">
            <div className="max-w-7xl mx-auto">

                {/* ── Page Header ─────────────────────────────────────────── */}
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

                {/* ── Main Card ───────────────────────────────────────────── */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">

                    {/* Filters bar */}
                    <div className="p-4 border-b border-gray-200 flex flex-wrap items-center gap-3">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2">Filters:</span>
                        <FilterButton icon={<Calendar className="w-4 h-4 text-gray-500" />} label="Last 30 Days" />
                        <FilterButton icon={<div className="w-3 h-3 border border-gray-500 rounded-sm" />} label="All Categories" />
                        <FilterButton
                            icon={<div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center"><div className="w-2 h-2 bg-gray-500 rounded-full" /></div>}
                            label="Status: Cleared"
                        />
                        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium ml-2">Clear All Filters</button>
                    </div>

                    {/* Data table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50/50">
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center space-x-1"><span>Date</span><ChevronDown className="w-3 h-3" /></div>
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
                                {TRANSACTIONS.map((row) => {
                                    const Icon   = ACCOUNT_ICONS[row.accountType] ?? Landmark;
                                    const styles = statusStyles(row.status);

                                    return (
                                        <tr key={row.id} className="hover:bg-blue-50/30 transition-colors group cursor-pointer">
                                            {/* Date */}
                                            <td className="px-6 py-4">
                                                <Link href={`/transactions/${row.id}`} className="block text-sm font-medium text-gray-900 w-20 group-hover:text-blue-700">
                                                    {row.date}
                                                </Link>
                                            </td>
                                            {/* Ref */}
                                            <td className="px-6 py-4">
                                                <Link href={`/transactions/${row.id}`} className="block text-sm text-gray-600 font-mono group-hover:text-blue-700">
                                                    {row.ref}
                                                </Link>
                                            </td>
                                            {/* Account */}
                                            <td className="px-6 py-4">
                                                <Link href={`/transactions/${row.id}`} className="flex items-center space-x-3">
                                                    <div className="p-1.5 rounded-md bg-blue-50 text-blue-600">
                                                        <Icon className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">{row.account}</span>
                                                </Link>
                                            </td>
                                            {/* Categories */}
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {row.categories.map(cat => (
                                                        <span key={cat} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#eef2fc] text-blue-700">
                                                            {cat}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            {/* Amount */}
                                            <td className="px-6 py-4 text-right">
                                                <span className={`text-sm font-bold ${amountColor(row.amount)}`}>
                                                    {formatAmount(row.amount)}
                                                </span>
                                            </td>
                                            {/* Status */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <div className={`w-2 h-2 rounded-full ${styles.dot}`} />
                                                    <span className={`text-xs font-bold ${styles.text}`}>{row.status}</span>
                                                </div>
                                            </td>
                                            {/* Actions */}
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-gray-300 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-medium text-gray-900">1-{TRANSACTIONS.length}</span> of{' '}
                            <span className="font-medium text-gray-900">245</span> entries
                        </p>
                        <div className="flex items-center space-x-1">
                            <PaginationBtn label="&lt;" disabled />
                            <PaginationBtn label="1" active />
                            <PaginationBtn label="2" />
                            <PaginationBtn label="3" />
                            <span className="px-2 text-gray-400">...</span>
                            <PaginationBtn label="24" />
                            <PaginationBtn label="&gt;" />
                        </div>
                    </div>
                </div>

                {/* ── Sync Footer ─────────────────────────────────────────── */}
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

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components (local to this file)
// ─────────────────────────────────────────────────────────────────────────────

/** A single filter dropdown button */
function FilterButton({ icon, label }) {
    return (
        <button className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md text-sm hover:bg-gray-50 transition-colors">
            {icon}
            <span>{label}</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
    );
}

/** A single pagination button */
function PaginationBtn({ label, active = false, disabled = false }) {
    return (
        <button
            disabled={disabled}
            className={`px-3 py-1 border rounded-md text-sm font-medium transition-colors
                ${active   ? 'bg-blue-600 text-white border-blue-600'
                           : 'border-gray-300 text-gray-700 hover:bg-gray-50'}
                ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
            dangerouslySetInnerHTML={{ __html: label }}
        />
    );
}
