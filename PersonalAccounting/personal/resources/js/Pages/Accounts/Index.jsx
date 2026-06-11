import AuthenticatedLayout
from '@/Layouts/AuthenticatedLayout';

import { Head, Link }
from '@inertiajs/react';

export default function Index({
    accounts
}) {
    return (
        <AuthenticatedLayout>

            <Head title="Accounts" />

            <div className="p-6">

                <div className="flex justify-between">

                    <h1 className="text-2xl font-bold">
                        Chart Of Accounts
                    </h1>

                    <Link
                        href={route('accounts.create')}
                        className="btn btn-primary"
                    >
                        Create
                    </Link>

                </div>

                <table className="w-full mt-5">

                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Parent</th>
                        </tr>
                    </thead>

                    <tbody>

                        {accounts.data.map(
                            account => (
                                <tr key={account.id}>
                                    <td>
                                        {account.code}
                                    </td>

                                    <td>
                                        {account.name}
                                    </td>

                                    <td>
                                        {account.account_type}
                                    </td>

                                    <td>
                                        {
                                            account.parent?.name
                                        }
                                    </td>
                                </tr>
                            )
                        )}

                    </tbody>

                </table>

            </div>

        </AuthenticatedLayout>
    );
}