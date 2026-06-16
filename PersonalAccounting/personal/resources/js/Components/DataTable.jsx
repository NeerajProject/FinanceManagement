import { useState } from 'react';

import TableHeader from './TableHeader';
import TableRow from './TableRow';
import Pagination from './Pagination';

export default function DataTable({

    columns,

    data = [],

    itemsPerPage = 10,

    master,

    onEdit,

    onDelete,

}) {

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const endIndex = startIndex + itemsPerPage;

    const paginatedData = data.slice(startIndex, endIndex);


    return (

        <div
            className="
                bg-white

                rounded-xl

                border

                border-gray-200

                overflow-hidden

                shadow-sm
            "
        >

            {/* Table */}

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <TableHeader columns={columns} />

                    <tbody className="divide-y divide-gray-100">

                        {

                            paginatedData.length > 0 ?

                            (

                                paginatedData.map((row,index) => (

                                    <TableRow

                                        key={row.id || index}

                                        columns={columns}

                                        data={row}

                                        master={master}

                                        onEdit={onEdit}

                                        onDelete={onDelete}

                                    />

                                ))

                            )

                            :

                            (

                                <tr>

                                    <td

                                        colSpan={columns.length + 1}

                                        className="
                                            py-16

                                            text-center

                                            text-gray-500
                                        "

                                    >

                                        <div className="space-y-2">

                                            <div className="text-lg">

                                                No records found

                                            </div>

                                            <div className="text-sm">

                                                Try changing filters or create a new record.

                                            </div>

                                        </div>

                                    </td>

                                </tr>

                            )

                        }

                    </tbody>

                </table>

            </div>


            {/* Footer */}

            {

                data.length > 0 && (

                    <div

                        className="
                            px-6

                            py-4

                            border-t

                            border-gray-200

                            flex

                            flex-col

                            md:flex-row

                            md:items-center

                            md:justify-between

                            gap-4
                        "

                    >

                        {/* Count */}

                        <div className="text-sm text-gray-500">

                            Showing

                            <span className="font-medium text-gray-700 mx-1">

                                {startIndex + 1}

                            </span>

                            -

                            <span className="font-medium text-gray-700 mx-1">

                                {

                                    Math.min(

                                        endIndex,

                                        data.length

                                    )

                                }

                            </span>

                            of

                            <span className="font-medium text-gray-700 mx-1">

                                {data.length}

                            </span>

                            records

                        </div>


                        {/* Pagination */}

                        {

                            totalPages > 1 && (

                                <Pagination

                                    currentPage={currentPage}

                                    totalPages={totalPages}

                                    onPageChange={setCurrentPage}

                                />

                            )

                        }

                    </div>

                )

            }

        </div>

    );

}