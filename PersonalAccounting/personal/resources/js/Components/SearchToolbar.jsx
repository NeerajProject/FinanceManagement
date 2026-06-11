import {
    Search,
    Filter,
    Star,
    Layers3,
    ChevronDown,
} from 'lucide-react';

export default function SearchToolbar({
    search,
    setSearch,
    onFilter,
}) {
    return (
        <div className="space-y-3">

            <div className="relative">

                <Search
                    size={18}
                    className="
                        absolute
                        left-3
                        top-3
                        text-gray-400
                    "
                />

                <input
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    placeholder="Search..."
                    className="
                        w-full
                        pl-10
                        pr-4
                        py-2.5
                        border
                        rounded-lg
                        focus:ring-2
                        focus:ring-blue-500
                    "
                />

            </div>

            <div className="flex flex-wrap gap-2">

                <button
                    onClick={onFilter}
                    className="
                        flex items-center gap-2
                        px-3 py-2
                        border rounded-md
                        hover:bg-gray-50
                    "
                >
                    <Filter size={16} />
                    Filters
                    <ChevronDown size={14} />
                </button>

                <button
                    className="
                        flex items-center gap-2
                        px-3 py-2
                        border rounded-md
                    "
                >
                    <Layers3 size={16} />
                    Group By
                    <ChevronDown size={14} />
                </button>

                <button
                    className="
                        flex items-center gap-2
                        px-3 py-2
                        border rounded-md
                    "
                >
                    <Star size={16} />
                    Favorites
                    <ChevronDown size={14} />
                </button>

            </div>

        </div>
    );
}