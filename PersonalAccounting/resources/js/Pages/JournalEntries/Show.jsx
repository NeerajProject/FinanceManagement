/**
 * @file Pages/JournalEntries/Show.jsx
 * @description Read-only detail view for a single Journal Entry.
 *
 * Sections:
 *   1. Breadcrumb + action bar
 *   2. Meta card (ref, date, status, author)
 *   3. Memo / description
 *   4. Debit/Credit lines table — balanced check highlighted
 *   5. Audit trail
 */

import React from 'react';
import { Link } from '@inertiajs/react';
import LedgerFlowLayout from '@/Layouts/LedgerFlowLayout';
import { JOURNAL_ENTRIES } from '@/Data/journalEntries';
import { statusStyles } from '@/Data/helpers';
import { ArrowLeft, Pencil, Download, CalendarDays, FileText, User, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export default function JournalShow({ id }) {
    const entry = JOURNAL_ENTRIES.find(e => e.id === Number(id));

    if (!entry) {
        return (
            <LedgerFlowLayout activePath="/journal-entries">
                <div className="max-w-3xl mx-auto text-center py-24">
                    <p className="text-gray-400 text-lg">Journal entry not found.</p>
                    <Link href="/journal-entries" className="mt-4 inline-block text-blue-600 hover:underline text-sm">
                        ← Back to Journal Entries
                    </Link>
                </div>
            </LedgerFlowLayout>
        );
    }

    const styles      = statusStyles(entry.status);
    const totalDebit  = entry.lines.reduce((s, l) => s + l.debit,  0);
    const totalCredit = entry.lines.reduce((s, l) => s + l.credit, 0);
    const isBalanced  = Math.abs(totalDebit - totalCredit) < 0.001;

    return (
        <LedgerFlowLayout activePath="/journal-entries">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* ── Breadcrumb + Actions ─────────────────────────────── */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Link href="/journal-entries" className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 shadow-sm">
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Journal Entries</p>
                            <h1 className="text-2xl font-bold text-gray-900 leading-tight">{entry.ref}</h1>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm">
                            <Download className="w-4 h-4" /><span>Export</span>
                        </button>
                        {entry.status === 'DRAFT' && (
                            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 shadow-sm">
                                <CheckCircle className="w-4 h-4" /><span>Post Entry</span>
                            </button>
                        )}
                        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">
                            <Pencil className="w-4 h-4" /><span>Edit</span>
                        </button>
                    </div>
                </div>

                {/* ── Meta Card ───────────────────────────────────────── */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className={`h-1.5 w-full ${
                        entry.status === 'POSTED'   ? 'bg-green-500' :
                        entry.status === 'DRAFT'    ? 'bg-blue-500'  :
                        entry.status === 'REVERSED' ? 'bg-gray-400'  : 'bg-gray-300'
                    }`} />
                    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                                <FileText className="w-4 h-4" /> Reference
                            </p>
                            <span className="font-mono font-semibold text-gray-900">{entry.ref}</span>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                                <CalendarDays className="w-4 h-4" /> Date
                            </p>
                            <span className="font-semibold text-gray-900">{entry.date}</span>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                                <User className="w-4 h-4" /> Created By
                            </p>
                            <span className="font-semibold text-gray-900">{entry.createdBy}</span>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Status</p>
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${styles.badge}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                                {entry.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Memo ────────────────────────────────────────────── */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Memo
                    </h2>
                    <p className="text-gray-700 text-sm leading-relaxed">{entry.memo}</p>
                </div>

                {/* ── Lines Table ─────────────────────────────────────── */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Debit / Credit Lines</h2>
                        {/* Balance indicator */}
                        {isBalanced ? (
                            <span className="inline-flex items-center gap-1.5 text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full text-xs font-semibold">
                                <CheckCircle className="w-3.5 h-3.5" /> Balanced
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-full text-xs font-semibold">
                                <AlertCircle className="w-3.5 h-3.5" /> Unbalanced
                            </span>
                        )}
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-3">Account</th>
                                    <th className="px-6 py-3">Description</th>
                                    <th className="px-6 py-3 text-right">Debit</th>
                                    <th className="px-6 py-3 text-right">Credit</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {entry.lines.map(line => (
                                    <tr key={line.id} className="hover:bg-gray-50/50">
                                        <td className="px-6 py-3 text-sm font-medium text-gray-800">{line.account}</td>
                                        <td className="px-6 py-3 text-sm text-gray-500">{line.description}</td>
                                        <td className="px-6 py-3 text-sm text-right font-mono text-gray-800">
                                            {line.debit > 0 ? `$${line.debit.toFixed(2)}` : '—'}
                                        </td>
                                        <td className="px-6 py-3 text-sm text-right font-mono text-gray-800">
                                            {line.credit > 0 ? `$${line.credit.toFixed(2)}` : '—'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-gray-50 border-t-2 border-gray-300 font-bold">
                                    <td colSpan={2} className="px-6 py-3 text-sm text-gray-600">Total</td>
                                    <td className="px-6 py-3 text-sm text-right font-mono text-gray-900">${totalDebit.toFixed(2)}</td>
                                    <td className="px-6 py-3 text-sm text-right font-mono text-gray-900">${totalCredit.toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* ── Audit Trail ─────────────────────────────────────── */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Activity Log
                    </h2>
                    <ol className="relative border-l border-gray-200 ml-3 space-y-6">
                        {[
                            { time: `${entry.date} – 08:30 AM`, actor: entry.createdBy, action: `Created journal entry ${entry.ref}` },
                            entry.status === 'POSTED'   && { time: `${entry.date} – 10:00 AM`, actor: 'Accounting System', action: 'Entry posted to General Ledger' },
                            entry.status === 'REVERSED' && { time: `${entry.date} – 02:00 PM`, actor: 'Admin', action: 'Entry marked as REVERSED' },
                        ].filter(Boolean).map((event, i) => (
                            <li key={i} className="ml-4">
                                <div className="absolute -left-1.5 mt-1.5 w-3 h-3 rounded-full border-2 border-white bg-blue-400" />
                                <p className="text-xs text-gray-400">{event.time}</p>
                                <p className="text-sm text-gray-700 mt-0.5">
                                    <span className="font-semibold">{event.actor}</span> — {event.action}
                                </p>
                            </li>
                        ))}
                    </ol>
                </div>

            </div>
        </LedgerFlowLayout>
    );
}
