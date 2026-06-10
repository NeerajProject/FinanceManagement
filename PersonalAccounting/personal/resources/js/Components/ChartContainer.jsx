export default function ChartContainer({ title, subtitle, children }) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {(title || subtitle) && (
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-transparent">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
                </div>
            )}
            <div className="p-6">
                {children}
            </div>
        </div>
    );
}
