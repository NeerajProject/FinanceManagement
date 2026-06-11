import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ parentAccounts = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        name: '',
        account_type: '',
        parent_id: '',
        currency_code: 'INR',
        reconcile: false,
        is_active: true,
        notes: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('accounts.store'));
    };

    // ✅ STATIC ACCOUNT TYPES (NO DB)
    const accountTypeGroups = [
        {
            label: 'Assets',
            options: [
                { value: 'asset_receivable', label: 'Receivable' },
                { value: 'asset_cash', label: 'Cash' },
                { value: 'asset_current', label: 'Current Asset' },
                { value: 'asset_non_current', label: 'Non Current Asset' },
                { value: 'asset_prepayments', label: 'Prepayments' },
                { value: 'asset_fixed', label: 'Fixed Asset' },
            ],
        },
        {
            label: 'Liabilities',
            options: [
                { value: 'liability_payable', label: 'Payable' },
                { value: 'liability_credit_card', label: 'Credit Card' },
                { value: 'liability_current', label: 'Current Liability' },
                { value: 'liability_non_current', label: 'Non Current Liability' },
            ],
        },
        {
            label: 'Equity',
            options: [
                { value: 'equity', label: 'Equity' },
                { value: 'equity_unaffected', label: 'Current Year Earnings' },
            ],
        },
        {
            label: 'Income',
            options: [
                { value: 'income', label: 'Income' },
                { value: 'income_other', label: 'Other Income' },
            ],
        },
        {
            label: 'Expenses',
            options: [
                { value: 'expense', label: 'Expense' },
                { value: 'expense_other', label: 'Other Expense' },
                { value: 'expense_depreciation', label: 'Depreciation' },
                { value: 'expense_direct_cost', label: 'Direct Cost' },
            ],
        },
        {
            label: 'Off Balance',
            options: [
                { value: 'off_balance', label: 'Off Balance' },
            ],
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Create Account" />

            <div className="max-w-6xl mx-auto p-6">
                <div className="bg-white shadow rounded-lg border">

                    {/* Header */}
                    <div className="border-b px-6 py-4">
                        <h1 className="text-2xl font-bold">
                            Create Account
                        </h1>
                    </div>

                    <form onSubmit={submit} className="p-6 space-y-6">

                        {/* CODE */}
                        <div>
                            <label className="block mb-1 font-medium">
                                Account Code
                            </label>

                            <input
                                type="text"
                                value={data.code}
                                onChange={(e) =>
                                    setData('code', e.target.value)
                                }
                                className="w-full border rounded px-3 py-2"
                            />

                            {errors.code && (
                                <p className="text-red-500 text-sm">
                                    {errors.code}
                                </p>
                            )}
                        </div>

                        {/* NAME */}
                        <div>
                            <label className="block mb-1 font-medium">
                                Account Name
                            </label>

                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className="w-full border rounded px-3 py-2"
                            />

                            {errors.name && (
                                <p className="text-red-500 text-sm">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* ACCOUNT TYPE (FIXED SELECT ISSUE) */}
                        <div>
                            <label className="block mb-1 font-medium">
                                Account Type
                            </label>

                            <select
                                name="account_type"
                                value={data.account_type || ''}
                                onChange={(e) =>
                                    setData('account_type', e.target.value)
                                }
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">
                                    Select Account Type
                                </option>

                                {accountTypeGroups.map((group) => (
                                    <optgroup
                                        key={group.label}
                                        label={group.label}
                                    >
                                        {group.options.map((opt) => (
                                            <option
                                                key={opt.value}
                                                value={opt.value}
                                            >
                                                {opt.label}
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>

                            {errors.account_type && (
                                <p className="text-red-500 text-sm">
                                    {errors.account_type}
                                </p>
                            )}
                        </div>

                        {/* PARENT ACCOUNT */}
                        <div>
                            <label className="block mb-1 font-medium">
                                Parent Account
                            </label>

                            <select
                                value={data.parent_id || ''}
                                onChange={(e) =>
                                    setData('parent_id', e.target.value)
                                }
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">None</option>

                                {parentAccounts.map((acc) => (
                                    <option
                                        key={acc.id}
                                        value={acc.id}
                                    >
                                        {acc.code} - {acc.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* CURRENCY */}
                        <div>
                            <label className="block mb-1 font-medium">
                                Currency
                            </label>

                            <input
                                type="text"
                                value={data.currency_code}
                                onChange={(e) =>
                                    setData('currency_code', e.target.value)
                                }
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        {/* CHECKBOXES */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={data.reconcile}
                                    onChange={(e) =>
                                        setData('reconcile', e.target.checked)
                                    }
                                />
                                Allow Reconciliation
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) =>
                                        setData('is_active', e.target.checked)
                                    }
                                />
                                Active
                            </label>
                        </div>

                        {/* NOTES */}
                        <div>
                            <label className="block mb-1 font-medium">
                                Notes
                            </label>

                            <textarea
                                rows={4}
                                value={data.notes}
                                onChange={(e) =>
                                    setData('notes', e.target.value)
                                }
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        {/* BUTTONS */}
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="px-4 py-2 bg-gray-500 text-white rounded"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Account'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}