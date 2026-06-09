/**
 * @file Pages/JournalEntries/Index.jsx
 * @description Journal Entries list page.
 *
 * Displays all journal entries in a table. Each row links to
 * JournalEntries/Show.jsx for the full detail view.
 *
 * Data source: resources/js/Data/journalEntries.js (dummy) →
 *              replace with Inertia `usePage().props.entries`.
 */

import React from 'react';
import { Link } from '@inertiajs/react';
import LedgerFlowLayout from '@/Layouts/LedgerFlowLayout';
import { JOURNAL_ENTRIES } from '@/Data/journalEntries';
import { statusStyles } from '@/Data/helpers';
import { Plus, ChevronDown, BookOpen } from 'lucide-react';

export default function JournalIndex() {
    return (
        <LedgerFlowLayout activePath="/journal-entries">
            <div className="max-w-7xl mx-auto">

                {/* ── Page Header ────────────────────────────────────── */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Journal Entries</h1>
                        <p className="text-gray-500 text-sm mt-1">Review and post double-entry accounting records.</p>
                    </div>
                    <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">
                        <Plus className="w-4 h-4" />
                        <span>New Entry</span>
                    </button>
                </div>

                {/* ── Table Card ─────────────────────────────────────── */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50/50">
                                    {['Date', 'Reference #', 'Memo', 'Lines', 'Status', ''].map((h, i) => (
                                        <th key={i} className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            {h && (
                                                <div className="flex items-center space-x-1">
                                                    <span>{h}</span>
                                                    {i === 0 && <ChevronDown className="w-3 h-3" />}
                                                </div>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {JOURNAL_ENTRIES.map(entry => {
                                    const styles = statusStyles(entry.status);
                                    return (
                                        <tr key={entry.id} className="hover:bg-blue-50/30 transition-colors group cursor-pointer">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 w-28">
                                                <Link href={`/journal-entries/${entry.id}`} className="block group-hover:text-blue-700">
                                                    {entry.date}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link href={`/journal-entries/${entry.id}`} className="block text-sm font-mono text-gray-600 group-hover:text-blue-700">
                                                    {entry.ref}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link href={`/journal-entries/${entry.id}`} className="block text-sm text-gray-700 max-w-xs truncate">
                                                    {entry.memo}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded text-xs font-medium">
                                                    <BookOpen className="w-3 h-3" />
                                                    {entry.lines.length} lines
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${styles.badge}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                                                    {entry.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={`/journal-entries/${entry.id}`}
                                                    className="text-xs text-blue-600 hover:text-blue-800 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    View →
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-medium text-gray-900">{JOURNAL_ENTRIES.length}</span> entries
                        </p>
                    </div>
                </div>
            </div>
        </LedgerFlowLayout>
    );
}
