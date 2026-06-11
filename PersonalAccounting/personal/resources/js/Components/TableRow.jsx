export default function TableRow({ columns = [], data = {} }) {

    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50 transition">

            {columns.map((col) => {
                const value = col.accessor ? data[col.accessor] : null;

                return (
                    <td
                        key={`${data.id}-${col.accessor}`}
                        className="px-4 md:px-6 py-4 text-sm text-gray-900"
                    >
                        {col.options
                            ? col.options[value] || value || '-'
                            : value || '-'}
                    </td>
                );
            })}

        </tr>
    );
}