import { Search, X } from 'lucide-react';

export default function SearchInput({ placeholder = 'Search...', value, onChange, onClear }) {
    return (
        <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
            {value && (
                <button
                    onClick={onClear}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
}
