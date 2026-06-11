import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';

export default function Index({ accounts }) {

    const columns = [

        {
            header: 'Code',
            accessor: 'code',
        },
        {
            header: 'Name',
            accessor: 'name',
        },
        {
            header: 'Type',
            accessor: 'account_type'
        },
    ];
    console.log('Accounts data:', accounts);

    return (
        <AuthenticatedLayout>
            <Head title="Accounts" />

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
                    itemsPerPage={10}
                />

            </div>
        </AuthenticatedLayout>
    );
}