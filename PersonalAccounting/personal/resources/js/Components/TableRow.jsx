import Badge from './Badge';

export default function TableRow({ columns, data }) {
    const renderCell = (col, value) => {
        if (col.key === 'status') {
            return <Badge type="status" variant={value.toLowerCase()} children={value} />;
        } else if (col.key === 'priority') {
            return <Badge type="priority" variant={value.toLowerCase()} children={value} />;
        } else if (col.render) {
            return col.render(value, data);
        }
        return value;
    };

    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
            {columns.map((col) => (
                <td
                    key={`${data.id}-${col.key}`}
                    className="px-4 md:px-6 py-4 text-sm text-gray-900 whitespace-nowrap md:whitespace-normal"
                >
                    {renderCell(col, data[col.key])}
                </td>
            ))}
        </tr>
    );
}
