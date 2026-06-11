import { Link, router } from '@inertiajs/react';
import {
    Pencil,
    Trash2,
} from 'lucide-react';

export default function TableRow({
    columns = [],
    data = {},
    onEdit,
    onDelete,
}) {
    const handleDelete = () => {

        if (
            confirm(
                'Are you sure you want to delete this record?'
            )
        ) {

            router.delete(
                onDelete(data),
                {
                    preserveScroll: true,
                }
            );

        }
    };

    return (
        <tr className="
            border-b
            border-gray-100
            hover:bg-gray-50
            transition-colors
        ">

            {/* Data Columns */}

            {columns.map((col) => {

                const value =
                    data[col.accessor];

                return (
                    <td
                        key={`${data.id}-${col.accessor}`}
                        className="
                            px-4
                            py-3
                            text-sm
                            text-gray-700
                            whitespace-nowrap
                        "
                    >
                        {col.options
                            ? col.options[value] ??
                              value ??
                              '-'
                            : value ?? '-'}
                    </td>
                );
            })}

            {/* Actions */}

            {(onEdit || onDelete) && (

                <td className="px-4 py-3">

                    <div className="flex items-center gap-3">

                        {onEdit && (

                            <Link
                                href={onEdit(
                                    data
                                )}
                                className="
                                    inline-flex
                                    items-center
                                    gap-1
                                    text-blue-600
                                    hover:text-blue-800
                                "
                            >
                                <Pencil
                                    size={
                                        16
                                    }
                                />

                                <span>
                                    Edit
                                </span>

                            </Link>

                        )}

                        {onDelete && (

                            <button
                                type="button"
                                onClick={
                                    handleDelete
                                }
                                className="
                                    inline-flex
                                    items-center
                                    gap-1
                                    text-red-600
                                    hover:text-red-800
                                "
                            >
                                <Trash2
                                    size={
                                        16
                                    }
                                />

                                <span>
                                    Delete
                                </span>

                            </button>

                        )}

                    </div>

                </td>

            )}

        </tr>
    );
}