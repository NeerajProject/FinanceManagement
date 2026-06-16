import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

import DataTable from '@/Components/DataTable';
import SearchFilter from '@/Components/FilterBuilder';
import Card from '@/Components/Card';
import ListHeader from '@/Components/ListHeader';

export default function Index({

    accounts,

    filters,

}) {

    const columns = [

        {

            label:"Code",

            header:'Code',

            accessor:'code',

        },

        {

            label:"Name",

            header:'Name',

            accessor:'name',

        },

        {

            label:"Account Type",

            header:'Type',

            accessor:'account_type',

            options:{

                asset_receivable:'Receivable',

                asset_cash:'Cash',

                asset_current:'Current Asset',

                asset_non_current:'Non Current Asset',

                asset_prepayments:'Prepayments',

                asset_fixed:'Fixed Asset',

                liability_payable:'Payable',

                liability_credit_card:'Credit Card',

                liability_current:'Current Liability',

                liability_non_current:'Non Current Liability',

                equity:'Equity',

                equity_unaffected:'Current Year Earnings',

                income:'Income',

                income_other:'Other Income',

                expense:'Expense',

                expense_other:'Other Expense',

                expense_depreciation:'Depreciation',

                expense_direct_cost:'Direct Cost',

                off_balance:'Off Balance',

            },

        },

    ];


    return (

        <AuthenticatedLayout pageTitle="Chart of Accounts">

            <Head title="Accounts" />


            <ListHeader

                title="Chart of Accounts"

                count={accounts.total ?? accounts.data.length}

                createRoute="accounts.create"

                createLabel="Create"


                filters={

                    <SearchFilter

                        initialSearch={filters?.search}

                        initialStatus={filters?.status}

                        initialTypes={filters?.types}

                        initialGroupBy={filters?.group_by}

                        initialCustomFilters={filters?.custom_filters}

                        onSearch={(payload)=>{

                            router.get(

                                route('accounts.index'),

                                payload,

                                {

                                    preserveState:true,

                                    replace:true,

                                }

                            );

                        }}

                    />

                }


                actions={

                    <>

                        <button

                            className="

                                px-4

                                py-2

                                rounded

                                bg-gray-100

                                hover:bg-gray-200

                                text-gray-700

                            "

                        >

                            Import

                        </button>


                        <button

                            className="

                                px-4

                                py-2

                                rounded

                                bg-gray-100

                                hover:bg-gray-200

                                text-gray-700

                            "

                        >

                            Export

                        </button>

                    </>

                }

            />


            <div className="p-6">

     

                    <DataTable

                        columns={columns}

                        data={accounts.data}

                        itemsPerPage={10}

                        onEdit={(row)=>`/accounts/${row.id}/edit`}

                        onDelete={(row)=>`/accounts/${row.id}`}

                    />


            </div>

        </AuthenticatedLayout>

    );

}