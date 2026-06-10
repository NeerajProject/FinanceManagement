export default function TableHeader({ columns }) {
    return (
        <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
                {columns.map((col) => (
                    <th
                        key={col.key}
                        className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
                    >
                        {col.label}
                    </th>
                ))}
            </tr>
        </thead>
    );
}
