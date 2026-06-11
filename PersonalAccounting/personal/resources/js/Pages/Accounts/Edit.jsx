import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ account, parentAccounts = [] }) {

    const { data, setData, put, processing, errors } = useForm({
        code: account.code || '',
        name: account.name || '',
        account_type: account.account_type || '',
        parent_id: account.parent_id || '',
        currency_code: account.currency_code || 'INR',
        reconcile: account.reconcile || false,
        is_active: account.is_active ?? true,
        notes: account.notes || '',
    });

    const submit = (e) => {
        e.preventDefault();

        put(route('accounts.update', account.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Account" />

            <div className="max-w-5xl mx-auto p-6">

                <div className="bg-white shadow rounded-lg border">

                    {/* HEADER */}
                    <div className="border-b px-6 py-4">
                        <h1 className="text-2xl font-bold">
                            Edit Account
                        </h1>
                        <p className="text-sm text-gray-500">
                            Update account details
                        </p>
                    </div>

                    {/* FORM */}
                    <form onSubmit={submit} className="p-6 space-y-6">

                        {/* CODE */}
                        <div>
                            <label className="block mb-1 font-medium">
                                Account Code
                            </label>

                            <input
                                type="text"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
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
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            />

                            {errors.name && (
                                <p className="text-red-500 text-sm">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* ACCOUNT TYPE */}
                        <div>
                            <label className="block mb-1 font-medium">
                                Account Type
                            </label>

                            <select
                                value={data.account_type}
                                onChange={(e) =>
                                    setData('account_type', e.target.value)
                                }
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select Account Type</option>

                                <option value="asset_cash">Cash</option>
                                <option value="asset_receivable">Receivable</option>
                                <option value="asset_current">Current Asset</option>
                                <option value="asset_non_current">Non Current Asset</option>

                                <option value="liability_payable">Payable</option>
                                <option value="liability_credit_card">Credit Card</option>

                                <option value="equity">Equity</option>

                                <option value="income">Income</option>
                                <option value="expense">Expense</option>

                                <option value="off_balance">Off Balance</option>
                            </select>

                            {errors.account_type && (
                                <p className="text-red-500 text-sm">
                                    {errors.account_type}
                                </p>
                            )}
                        </div>

                        {/* PARENT */}
                        <div>
                            <label className="block mb-1 font-medium">
                                Parent Account
                            </label>

                            <select
                                value={data.parent_id}
                                onChange={(e) => setData('parent_id', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">None</option>

                                {parentAccounts.map((acc) => (
                                    <option key={acc.id} value={acc.id}>
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

                        {/* FLAGS */}
                        <div className="flex gap-6">

                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={data.reconcile}
                                    onChange={(e) =>
                                        setData('reconcile', e.target.checked)
                                    }
                                />
                                Reconcile
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
                                rows="4"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        {/* ACTIONS */}
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
                                {processing ? 'Updating...' : 'Update Account'}
                            </button>

                        </div>

                    </form>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}