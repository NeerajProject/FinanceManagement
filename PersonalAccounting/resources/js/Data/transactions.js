/**
 * @file transactions.js
 * @description Central dummy data store for Transactions.
 *
 * This file acts as the single source of truth for all transaction-related
 * dummy data used across Index, Show, and related pages.
 * Replace these static arrays with real Inertia props from the backend
 * once backend models (Transaction, JournalEntry) are ready.
 */

/**
 * @typedef {Object} Transaction
 * @property {number}   id         - Unique identifier
 * @property {string}   date       - Human-readable date string (e.g. "Oct 24, 2023")
 * @property {string}   ref        - Reference number (e.g. "TXN-94821")
 * @property {string}   account    - Account name
 * @property {string}   accountType - Icon key: 'bank' | 'cash' | 'card'
 * @property {string[]} categories - List of category tag strings
 * @property {number}   amount     - Positive = credit, Negative = debit
 * @property {string}   status     - 'CLEARED' | 'PENDING' | 'OVERDUE'
 * @property {string}   description - Full description / memo
 * @property {string}   createdBy  - Author name
 * @property {string}   notes      - Internal notes
 * @property {LineItem[]} lineItems - Child line items (One2Many)
 */

/**
 * @typedef {Object} LineItem
 * @property {number} id          - Unique identifier
 * @property {string} description - Line item description
 * @property {string} account     - GL account name
 * @property {number} debit       - Debit amount
 * @property {number} credit      - Credit amount
 */

export const TRANSACTIONS = [
    {
        id: 1,
        date: 'Oct 24, 2023',
        ref: 'TXN-94821',
        account: 'Chase Operating',
        accountType: 'bank',
        categories: ['Software', 'SaaS'],
        amount: -1240.00,
        status: 'CLEARED',
        description: 'Monthly subscription payment for GitHub Enterprise and Figma Professional licenses.',
        createdBy: 'Neeraj J.',
        notes: 'Auto-renewed. Review before next billing cycle.',
        lineItems: [
            { id: 1, description: 'GitHub Enterprise',      account: 'Software Expenses', debit: 840.00,  credit: 0 },
            { id: 2, description: 'Figma Professional',     account: 'Software Expenses', debit: 400.00,  credit: 0 },
        ]
    },
    {
        id: 2,
        date: 'Oct 23, 2023',
        ref: 'TXN-94820',
        account: 'Petty Cash',
        accountType: 'cash',
        categories: ['Office Supplies'],
        amount: -45.20,
        status: 'CLEARED',
        description: 'Purchase of printer ink cartridges and sticky notes from local stationery shop.',
        createdBy: 'Admin',
        notes: '',
        lineItems: [
            { id: 1, description: 'Printer Ink (x2)',   account: 'Office Supplies', debit: 30.00, credit: 0 },
            { id: 2, description: 'Sticky Notes Pack',  account: 'Office Supplies', debit: 15.20, credit: 0 },
        ]
    },
    {
        id: 3,
        date: 'Oct 22, 2023',
        ref: 'TXN-94819',
        account: 'SVB Deposit',
        accountType: 'bank',
        categories: ['Client Payment'],
        amount: 15000.00,
        status: 'PENDING',
        description: 'Milestone 2 payment received from Acme Corp for Q4 consulting engagement.',
        createdBy: 'Neeraj J.',
        notes: 'Awaiting bank clearance. Expected to clear in 2 business days.',
        lineItems: [
            { id: 1, description: 'Consulting - Oct (Acme Corp)', account: 'Revenue', debit: 0, credit: 15000.00 },
        ]
    },
    {
        id: 4,
        date: 'Oct 22, 2023',
        ref: 'TXN-94818',
        account: 'Chase Operating',
        accountType: 'bank',
        categories: ['Rent'],
        amount: -4200.00,
        status: 'CLEARED',
        description: 'Monthly office rent payment to Greenfield Properties LLC — Floor 3, Suite 304.',
        createdBy: 'Admin',
        notes: 'Lease expires Apr 2024. Renegotiation due Q1.',
        lineItems: [
            { id: 1, description: 'Office Rent - October', account: 'Rent Expense', debit: 4200.00, credit: 0 },
        ]
    },
    {
        id: 5,
        date: 'Oct 21, 2023',
        ref: 'TXN-94817',
        account: 'Amex Corporate',
        accountType: 'card',
        categories: ['Travel'],
        amount: -342.15,
        status: 'OVERDUE',
        description: 'Flight and hotel for team offsite in Austin, TX. Receipt pending approval.',
        createdBy: 'Neeraj J.',
        notes: 'Receipt not yet submitted. Marked overdue pending approval.',
        lineItems: [
            { id: 1, description: 'Flight (SFO → AUS)',     account: 'Travel Expense', debit: 220.00, credit: 0 },
            { id: 2, description: 'Hotel (1 night)',         account: 'Travel Expense', debit: 122.15, credit: 0 },
        ]
    },
    {
        id: 6,
        date: 'Oct 21, 2023',
        ref: 'TXN-94816',
        account: 'Chase Operating',
        accountType: 'bank',
        categories: ['Utilities'],
        amount: -89.00,
        status: 'CLEARED',
        description: 'Monthly electricity and internet bill for office premises.',
        createdBy: 'Admin',
        notes: '',
        lineItems: [
            { id: 1, description: 'Electricity Bill',  account: 'Utilities', debit: 54.00, credit: 0 },
            { id: 2, description: 'Internet Service',  account: 'Utilities', debit: 35.00, credit: 0 },
        ]
    },
];
