import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SearchFilter from '@/Components/FilterBuilder';
import Card from '@/Components/Card';


export default function Index({ accounts }) {

  const columns = [
    {   label:"Code",
        header: 'Code',
        accessor: 'code',
    },
    {   label:"Name",
        header: 'Name',
        accessor: 'name',
    },
    {   label:"Account Type",
        header: 'Type',
        accessor: 'account_type',
        options: {
            asset_receivable: 'Receivable',
            asset_cash: 'Cash',
            asset_current: 'Current Asset',
            asset_non_current: 'Non Current Asset',
            asset_prepayments: 'Prepayments',
            asset_fixed: 'Fixed Asset',

            liability_payable: 'Payable',
            liability_credit_card: 'Credit Card',
            liability_current: 'Current Liability',
            liability_non_current: 'Non Current Liability',

            equity: 'Equity',
            equity_unaffected: 'Current Year Earnings',

            income: 'Income',
            income_other: 'Other Income',

            expense: 'Expense',
            expense_other: 'Other Expense',
            expense_depreciation: 'Depreciation',
            expense_direct_cost: 'Direct Cost',

            off_balance: 'Off Balance',
        },
    },
];
    console.log('Accounts data:', accounts);


    return (
        <AuthenticatedLayout pageTitle="Chart of  Accounts">
            <Head title="Accounts" />

        <SearchFilter
    fields={[
        {
            value: 'code',
            label: 'Code',
            type: 'text',
        },
        {
            value: 'name',
            label: 'Name',
            type: 'text',
        },
        {
            value: 'account_type',
            label: 'Account Type',
            type: 'select',
            options: [
                {
                    value: 'asset_receivable',
                    label: 'Receivable',
                },
                {
                    value: 'asset_cash',
                    label: 'Cash',
                },
            ],
        },
        {
            value: 'is_active',
            label: 'Status',
            type: 'select',
            options: [
                {
                    value: 1,
                    label: 'Active',
                },
                {
                    value: 0,
                    label: 'Inactive',
                },
            ],
        },
        {
            value: 'created_at',
            label: 'Created Date',
            type: 'date',
        },
    ]}
      onSearch={(payload) => {

        router.get(
           '/accounts',
            payload,
            {
                preserveState: true,
                replace: true,
            }
        );


    }}
/>


<Card>
                <div className="p-6 space-y-4">

                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">
                        Chart of Accounts
                    </h1>

                    <Link
                        href={route('accounts.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Create
                    </Link>
                </div>
               
                {/* TABLE */}
                <DataTable
                    title="Accounts"
                    columns={columns}
                    data={accounts.data}
                    itemsPerPage={5}
                    onEdit={(row) => `/accounts/${row.id}/edit`}
                    onDelete={(row) => `/accounts/${row.id}`}
                />

            </div>
        </Card>
        </AuthenticatedLayout>
    );
}