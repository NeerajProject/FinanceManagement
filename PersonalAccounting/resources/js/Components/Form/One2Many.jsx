import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function One2Many({
    columns = [],
    data = [],
    onAdd,
    onRemove,
    onChange,
    emptyMessage = "No items added yet."
}) {
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            {columns.map((col, index) => (
                                <th key={index} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    {col.label}
                                </th>
                            ))}
                            <th className="px-4 py-3 w-10"></th> {/* Actions column */}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-gray-500 text-sm">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((row, rowIndex) => (
                                <tr key={row.id || rowIndex} className="hover:bg-gray-50/50 transition-colors">
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex} className="px-4 py-2 align-top">
                                            {col.render ? (
                                                col.render(row, (field, value) => onChange(rowIndex, field, value))
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={row[col.field] || ''}
                                                    onChange={(e) => onChange(rowIndex, col.field, e.target.value)}
                                                    className="w-full text-sm px-3 py-1.5 border-transparent bg-transparent hover:bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md transition-colors"
                                                />
                                            )}
                                        </td>
                                    ))}
                                    <td className="px-4 py-2 align-top text-right">
                                        <button
                                            type="button"
                                            onClick={() => onRemove(rowIndex)}
                                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Footer Actions */}
            <div className="p-3 bg-gray-50/50 border-t border-gray-200">
                <button
                    type="button"
                    onClick={onAdd}
                    className="inline-flex items-center space-x-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add a line</span>
                </button>
            </div>
        </div>
    );
}
