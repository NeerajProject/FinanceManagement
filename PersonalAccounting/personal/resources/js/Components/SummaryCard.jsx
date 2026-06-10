export default function SummaryCard({ title, items, layout = 'grid' }) {
    const layoutClasses = layout === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 gap-4' : 'space-y-3';

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
            <div className={layoutClasses}>
                {items.map((item, idx) => (
                    <div key={idx} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:border-gray-300 transition">
                        <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">{item.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                        {item.subtext && (
                            <p className="text-xs text-gray-500 mt-2">{item.subtext}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
