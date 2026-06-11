export default function TableRow({
    columns = [],
    data = {},
    master,
    onEdit,
    onDelete,
}) {

    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50 transition">

            {/* DATA COLUMNS */}
            {columns.map((col) => {
                const value = col.accessor ? data[col.accessor] : null;

                return (
                    <td
                        key={`${data.id}-${col.accessor}`}
                        className="px-4 py-3 text-sm text-gray-900"
                    >
                        {col.options
                            ? col.options[value] || value || '-'
                            : value || '-'}
                    </td>
                );
            })}

            {/* ACTIONS COLUMN */}
            {(onEdit || onDelete) && (
                <td className="px-4 py-3 text-sm flex gap-3">

                    {onEdit && (
                        <a
                            href={onEdit(data)}
                            className="text-blue-600 hover:underline"
                        >
                            Edit
                        </a>
                    )}

                    {onDelete && (
                        <a
                            href={onDelete(data)}
                            className="text-red-600 hover:underline"
                        >
                            Delete
                        </a>
                    )}

                </td>
            )}

        </tr>
    );
}