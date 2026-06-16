export default function SmartButton({ title, count, icon, onClick }) {
    return (
        <button
            onClick={onClick}
            className="px-4 py-3 flex flex-col items-center gap-1 text-sm hover:bg-gray-100 transition-colors text-center min-w-[100px]"
        >
            <div className="flex items-center gap-1 justify-center">
                {icon}
            </div>
            <span className="font-medium text-gray-700">{count}</span>
            <span className="text-xs text-gray-600">{title}</span>
        </button>
    );
}
