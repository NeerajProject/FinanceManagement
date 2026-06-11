import { useState } from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import Pagination from './Pagination';
import Card from './Card';
import FilterBuilder from './FilterBuilder';

export default function DataTable({
    columns,
    data,
    title,
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
        <Card title={title}>
          
            <div className="space-y-4">

                <div className="overflow-x-auto">
                    <table className="w-full">

                        <TableHeader columns={columns} />

                        <tbody>
                            {paginatedData.map((row) => (
                                <TableRow
                                    key={row.id}
                                    columns={columns}
                                    data={row}
                                    master={master}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))}
                        </tbody>

                    </table>
                </div>

                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}

                <div className="text-sm text-gray-600 text-center md:text-left">
                    Showing {startIndex + 1}-
                    {Math.min(endIndex, data.length)} of {data.length} items
                </div>

            </div>
        </Card>
    );
}