/**
 * @file journalEntries.js
 * @description Central dummy data store for Journal Entries.
 *
 * Replace with real Inertia props once the JournalEntry backend model is ready.
 *
 * @typedef {Object} JournalEntry
 * @property {number}   id         - Unique identifier
 * @property {string}   date       - Posting date
 * @property {string}   ref        - Reference number (e.g. "JE-00142")
 * @property {string}   memo       - Short description / memo
 * @property {string}   status     - 'POSTED' | 'DRAFT' | 'REVERSED'
 * @property {string}   createdBy  - Author name
 * @property {EntryLine[]} lines   - Debit/credit lines
 */

/**
 * @typedef {Object} EntryLine
 * @property {number} id          - Unique identifier
 * @property {string} account     - GL account name
 * @property {string} description - Line description
 * @property {number} debit       - Debit amount (0 if credit line)
 * @property {number} credit      - Credit amount (0 if debit line)
 */

export const JOURNAL_ENTRIES = [
    {
        id: 1,
        date: 'Oct 24, 2023',
        ref: 'JE-00142',
        memo: 'Record monthly SaaS subscriptions expense',
        status: 'POSTED',
        createdBy: 'Neeraj J.',
        lines: [
            { id: 1, account: 'Software Expenses',       description: 'GitHub Enterprise + Figma', debit: 1240.00, credit: 0 },
            { id: 2, account: 'Chase Operating (Chase)', description: 'Payment cleared',            debit: 0, credit: 1240.00 },
        ]
    },
    {
        id: 2,
        date: 'Oct 22, 2023',
        ref: 'JE-00141',
        memo: 'Acme Corp - Milestone 2 payment received',
        status: 'DRAFT',
        createdBy: 'Neeraj J.',
        lines: [
            { id: 1, account: 'SVB Deposit',  description: 'Incoming wire',          debit: 15000.00, credit: 0 },
            { id: 2, account: 'Revenue',       description: 'Q4 Consulting - Acme',   debit: 0, credit: 15000.00 },
        ]
    },
    {
        id: 3,
        date: 'Oct 22, 2023',
        ref: 'JE-00140',
        memo: 'October office rent — Greenfield Properties',
        status: 'POSTED',
        createdBy: 'Admin',
        lines: [
            { id: 1, account: 'Rent Expense',              description: 'October 2023', debit: 4200.00, credit: 0 },
            { id: 2, account: 'Chase Operating (Chase)',   description: 'ACH transfer', debit: 0, credit: 4200.00 },
        ]
    },
    {
        id: 4,
        date: 'Oct 21, 2023',
        ref: 'JE-00139',
        memo: 'Austin offsite travel — receipt pending',
        status: 'DRAFT',
        createdBy: 'Neeraj J.',
        lines: [
            { id: 1, account: 'Travel Expense',    description: 'SFO→AUS flight + hotel', debit: 342.15, credit: 0 },
            { id: 2, account: 'Amex Corporate',    description: 'Corporate card charge',   debit: 0, credit: 342.15 },
        ]
    },
    {
        id: 5,
        date: 'Oct 20, 2023',
        ref: 'JE-00138',
        memo: 'Reverse incorrect vendor payment JE-00130',
        status: 'REVERSED',
        createdBy: 'Admin',
        lines: [
            { id: 1, account: 'Accounts Payable',          description: 'Reversal entry', debit: 500.00, credit: 0 },
            { id: 2, account: 'Chase Operating (Chase)',   description: 'Reversal entry',  debit: 0, credit: 500.00 },
        ]
    },
];
