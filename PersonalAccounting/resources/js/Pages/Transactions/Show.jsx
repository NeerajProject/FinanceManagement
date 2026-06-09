/**
 * @file Pages/Transactions/Show.jsx
 * @description Read-only detail view for a single Transaction.
 *
 * Props (from Inertia / dummy data):
 *   - `id` {number} — passed via the URL segment, used to look up from TRANSACTIONS[]
 *
 * Layout: LedgerFlowLayout (sidebar + topbar)
 *
 * Sections:
 *   1. Breadcrumb + action bar (Back, Edit, Download)
 *   2. Meta card — ref, date, account, status badge, created-by
 *   3. Line Items table (One2Many view — read only)
 *   4. Notes / description panel
 *   5. Audit trail (static dummy)
 */

import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import LedgerFlowLayout from '@/Layouts/LedgerFlowLayout';
import { TRANSACTIONS } from '@/Data/transactions';
import { formatAmount, amountColor, statusStyles } from '@/Data/helpers';
import {
    ArrowLeft,
    Pencil,
    Download,
    Landmark,
    Banknote,
    CreditCard,
    CalendarDays,
    Tag,
    User,
    FileText,
    StickyNote,
    Clock,
} from 'lucide-react';

const ACCOUNT_ICONS = { bank: Landmark, cash: Banknote, card: CreditCard };

export default function Show({ id }) {
    // In production: `transaction` comes from Inertia props.
    // Here we resolve it from the dummy dataset using the URL id.
    const transaction = TRANSACTIONS.find(t => t.id === Number(id));

    if (!transaction) {
        return (
            <LedgerFlowLayout activePath="/transactions">
                <div className="max-w-3xl mx-auto text-center py-24">
                    <p className="text-gray-400 text-lg">Transaction not found.</p>
                    <Link href="/transactions" className="mt-4 inline-block text-blue-600 hover:underline text-sm">
                        ← Back to Transactions
                    </Link>
                </div>
            </LedgerFlowLayout>
        );
    }

    const styles  = statusStyles(transaction.status);
    const Icon    = ACCOUNT_ICONS[transaction.accountType] ?? Landmark;
    const totalDebit  = transaction.lineItems.reduce((s, l) => s + l.debit,  0);
    const totalCredit = transaction.lineItems.reduce((s, l) => s + l.credit, 0);

    return (
        <LedgerFlowLayout activePath="/transactions">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* ── Breadcrumb + Actions ─────────────────────────────── */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Link
                            href="/transactions"
                            className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors shadow-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Transactions</p>
                            <h1 className="text-2xl font-bold text-gray-900 leading-tight">{transaction.ref}</h1>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm">
                            <Download className="w-4 h-4" />
                            <span>Export</span>
                        </button>
                        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">
                            <Pencil className="w-4 h-4" />
                            <span>Edit</span>
                        </button>
                    </div>
                </div>

                {/* ── Meta Card ───────────────────────────────────────── */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    {/* Coloured top strip */}
                    <div className={`h-1.5 w-full ${
                        transaction.status === 'CLEARED' ? 'bg-green-500' :
                        transaction.status === 'PENDING' ? 'bg-blue-500'  : 'bg-red-500'
                    }`} />

                    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                        <MetaItem icon={<FileText className="w-4 h-4" />} label="Reference">
                            <span className="font-mono font-semibold text-gray-900">{transaction.ref}</span>
                        </MetaItem>

                        <MetaItem icon={<CalendarDays className="w-4 h-4" />} label="Date">
                            <span className="font-semibold text-gray-900">{transaction.date}</span>
                        </MetaItem>

                        <MetaItem icon={<Icon className="w-4 h-4" />} label="Account">
                            <div className="flex items-center space-x-2">
                                <div className="p-1 bg-blue-50 rounded text-blue-600">
                                    <Icon className="w-3.5 h-3.5" />
                                </div>
                                <span className="font-semibold text-gray-900">{transaction.account}</span>
                            </div>
                        </MetaItem>

                        <MetaItem icon={null} label="Status">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${styles.badge}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                                {transaction.status}
                            </span>
                        </MetaItem>

                        <MetaItem icon={<Tag className="w-4 h-4" />} label="Categories" className="col-span-2">
                            <div className="flex flex-wrap gap-1.5">
                                {transaction.categories.map(c => (
                                    <span key={c} className="px-2 py-0.5 bg-[#eef2fc] text-blue-700 text-xs font-medium rounded">
                                        {c}
                                    </span>
                                ))}
                            </div>
                        </MetaItem>

                        <MetaItem icon={<User className="w-4 h-4" />} label="Created By">
                            <span className="font-semibold text-gray-900">{transaction.createdBy}</span>
                        </MetaItem>

                        {/* Total amount — right-aligned */}
                        <MetaItem icon={null} label="Net Amount" className="text-right">
                            <span className={`text-2xl font-extrabold tracking-tight ${amountColor(transaction.amount)}`}>
                                {formatAmount(transaction.amount)}
                            </span>
                        </MetaItem>
                    </div>
                </div>

                {/* ── Description ─────────────────────────────────────── */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Description
                    </h2>
                    <p className="text-gray-700 text-sm leading-relaxed">{transaction.description}</p>

                    {transaction.notes && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <StickyNote className="w-3.5 h-3.5" /> Internal Notes
                            </h3>
                            <p className="text-gray-600 text-sm bg-yellow-50 border border-yellow-100 rounded-lg p-3 leading-relaxed">
                                {transaction.notes}
                            </p>
                        </div>
                    )}
                </div>

                {/* ── Line Items (One2Many — read only) ───────────────── */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Journal Lines</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-3">Description</th>
                                    <th className="px-6 py-3">Account</th>
                                    <th className="px-6 py-3 text-right">Debit</th>
                                    <th className="px-6 py-3 text-right">Credit</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {transaction.lineItems.map(line => (
                                    <tr key={line.id} className="hover:bg-gray-50/50">
                                        <td className="px-6 py-3 text-sm text-gray-700">{line.description}</td>
                                        <td className="px-6 py-3 text-sm text-gray-500 font-medium">{line.account}</td>
                                        <td className="px-6 py-3 text-sm text-right text-gray-800 font-mono">
                                            {line.debit > 0 ? `$${line.debit.toFixed(2)}` : '—'}
                                        </td>
                                        <td className="px-6 py-3 text-sm text-right text-gray-800 font-mono">
                                            {line.credit > 0 ? `$${line.credit.toFixed(2)}` : '—'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            {/* Totals row */}
                            <tfoot>
                                <tr className="bg-gray-50 border-t-2 border-gray-200 font-semibold">
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
                            { time: 'Oct 24, 2023 – 09:42 AM', actor: transaction.createdBy, action: `Created transaction ${transaction.ref}` },
                            { time: 'Oct 24, 2023 – 11:05 AM', actor: 'System',              action: 'Status changed to CLEARED after bank sync' },
                        ].map((event, i) => (
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

// ─────────────────────────────────────────────────────────────────────────────
// Local sub-components
// ─────────────────────────────────────────────────────────────────────────────

/**
 * MetaItem — A labelled data cell used in the meta card grid.
 * @param {ReactNode} icon     - Small icon prefix for the label
 * @param {string}    label    - Field name label
 * @param {ReactNode} children - The value content
 */
function MetaItem({ icon, label, children, className = '' }) {
    return (
        <div className={className}>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                {icon}
                {label}
            </p>
            {children}
        </div>
    );
}
