import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ account, parentAccounts = [] }) {

    const [tab, setTab] = useState('general');

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

            <div className="min-h-screen bg-gray-100">

                {/* HEADER BAR */}

                <div className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-20">

                    <div className="flex gap-3">

                        <button
                            onClick={submit}
                            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded"
                        >
                            Save
                        </button>

                        <button
                            onClick={() => window.history.back()}
                            className="border px-6 py-2 rounded bg-gray-50 hover:bg-gray-100"
                        >
                            Discard
                        </button>

                    </div>

                    <div className="text-gray-600">
                        Accounts /
                        <span className="font-semibold text-gray-900">
                            {' '}Edit
                        </span>
                    </div>

                </div>

                {/* FORM SHEET */}

                <div className="p-8">

                    <form onSubmit={submit}>

                        <div className="bg-white border rounded shadow-sm">

                            {/* TITLE */}

                            <div className="px-10 pt-10">

                                <div className="uppercase text-gray-400 text-sm font-semibold">
                                    ACCOUNT TITLE
                                </div>

                                <h1 className="text-4xl font-bold text-violet-600 mt-2">
                                    {data.name || 'New'}
                                </h1>

                            </div>


                            <div className="border-t mt-8"></div>


                            {/* FORM GRID */}

                            <div className="grid grid-cols-2 gap-x-16 gap-y-4 px-10 py-10">

                                {/* LEFT */}

                                <Field
                                    label="Account Code"
                                    error={errors.code}
                                >

                                    <input
                                        type="text"
                                        value={data.code}
                                        onChange={(e) =>
                                            setData('code', e.target.value)
                                        }
                                        className="input"
                                        placeholder="e.g. 101000"
                                    />

                                </Field>


                                <Field label="Parent Account">

                                    <select
                                        value={data.parent_id}
                                        onChange={(e) =>
                                            setData(
                                                'parent_id',
                                                e.target.value
                                            )
                                        }
                                        className="input"
                                    >

                                        <option value="">
                                            None
                                        </option>

                                        {parentAccounts.map(acc => (

                                            <option
                                                key={acc.id}
                                                value={acc.id}
                                            >

                                                {acc.code} - {acc.name}

                                            </option>

                                        ))}

                                    </select>

                                </Field>


                                <Field
                                    label="Account Name"
                                    error={errors.name}
                                >

                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData(
                                                'name',
                                                e.target.value
                                            )
                                        }
                                        className="input"
                                        placeholder="e.g Current Assets"
                                    />

                                </Field>


                                <Field label="Currency">

                                    <input
                                        type="text"
                                        value={data.currency_code}
                                        onChange={(e) =>
                                            setData(
                                                'currency_code',
                                                e.target.value
                                            )
                                        }
                                        className="input"
                                    />

                                </Field>


                                <Field
                                    label="Account Type"
                                    error={errors.account_type}
                                >

                                    <select
                                        value={data.account_type}
                                        onChange={(e) =>
                                            setData(
                                                'account_type',
                                                e.target.value
                                            )
                                        }
                                        className="input"
                                    >

                                        <option value="">
                                            Select Account Type...
                                        </option>

                                        <option value="asset_cash">
                                            Cash
                                        </option>

                                        <option value="asset_receivable">
                                            Receivable
                                        </option>

                                        <option value="asset_current">
                                            Current Asset
                                        </option>

                                        <option value="asset_non_current">
                                            Non Current Asset
                                        </option>

                                        <option value="liability_payable">
                                            Payable
                                        </option>

                                        <option value="liability_credit_card">
                                            Credit Card
                                        </option>

                                        <option value="equity">
                                            Equity
                                        </option>

                                        <option value="income">
                                            Income
                                        </option>

                                        <option value="expense">
                                            Expense
                                        </option>

                                    </select>

                                </Field>


                                <Field label="Allow Reconcile">

                                    <input
                                        type="checkbox"
                                        checked={data.reconcile}
                                        onChange={(e) =>
                                            setData(
                                                'reconcile',
                                                e.target.checked
                                            )
                                        }
                                        className="w-5 h-5"
                                    />

                                </Field>


                                <div></div>


                                <Field label="Active">

                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) =>
                                            setData(
                                                'is_active',
                                                e.target.checked
                                            )
                                        }
                                        className="w-5 h-5"
                                    />

                                </Field>

                            </div>


                            {/* TABS */}

                       
                        </div>

                    </form>

                </div>

            </div>

        </AuthenticatedLayout>

    );
}



function Field({ label, children, error }) {

    return (

        <div className="flex items-center border-b pb-3">

            <div className="w-52 font-semibold text-gray-700">

                {label}

            </div>

            <div className="flex-1">

                {children}

                {error && (

                    <div className="text-red-500 text-sm mt-1">

                        {error}

                    </div>

                )}

            </div>

        </div>

    );

}


function TabButton({
    children,
    active,
    onClick
}) {

    return (

        <button
            type="button"
            onClick={onClick}
            className={`
                px-5 py-3 text-lg
                border-b-2
                transition
                ${
                    active
                    ? 'border-violet-600 text-violet-600 font-semibold'
                    : 'border-transparent text-gray-500'
                }
            `}
        >

            {children}

        </button>

    );

}