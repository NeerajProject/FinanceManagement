/**
 * @file helpers.js
 * @description Shared utility functions used across the LedgerFlow UI.
 *
 * These are pure functions with no side effects so they can be freely
 * imported by any page or component without coupling concerns.
 */

/**
 * Format a numeric amount as a currency string with a leading sign.
 * Negative values get a '-$' prefix; positive values get a '+$' prefix.
 *
 * @param {number} amount - The raw numeric amount
 * @returns {string} Formatted string, e.g. "-$1,240.00" or "+$15,000.00"
 *
 * @example
 * formatAmount(-1240)   // "-$1,240.00"
 * formatAmount(15000)   // "+$15,000.00"
 */
export function formatAmount(amount) {
    const abs = Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2 });
    return amount < 0 ? `-$${abs}` : `+$${abs}`;
}

/**
 * Determine the Tailwind text-color class for a transaction amount.
 *
 * @param {number} amount
 * @returns {string} Tailwind class string
 */
export function amountColor(amount) {
    return amount < 0 ? 'text-red-600' : 'text-green-600';
}

/**
 * Return Tailwind color classes for a given status string.
 *
 * @param {'CLEARED'|'PENDING'|'OVERDUE'|'POSTED'|'DRAFT'|'REVERSED'} status
 * @returns {{ text: string, dot: string, badge: string }}
 */
export function statusStyles(status) {
    switch (status) {
        case 'CLEARED':
        case 'POSTED':
            return { text: 'text-green-700', dot: 'bg-green-500', badge: 'bg-green-50 text-green-700 ring-green-600/20' };
        case 'PENDING':
        case 'DRAFT':
            return { text: 'text-blue-700',  dot: 'bg-blue-500',  badge: 'bg-blue-50 text-blue-700 ring-blue-600/20' };
        case 'OVERDUE':
            return { text: 'text-red-700',   dot: 'bg-red-500',   badge: 'bg-red-50 text-red-700 ring-red-600/20' };
        case 'REVERSED':
            return { text: 'text-gray-600',  dot: 'bg-gray-400',  badge: 'bg-gray-100 text-gray-600 ring-gray-500/20' };
        default:
            return { text: 'text-gray-600',  dot: 'bg-gray-400',  badge: 'bg-gray-100 text-gray-600 ring-gray-500/20' };
    }
}
