export default function ActivityList({ items, title }) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
            <div className="space-y-4">
                {items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        {/* Avatar/Icon */}
                        {item.icon && (
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.backgroundColor}`}>
                                <item.icon size={20} className={item.iconColor} />
                            </div>
                        )}
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <p className="font-medium text-gray-900 truncate">{item.title}</p>
                                    <p className="text-sm text-gray-600 truncate">{item.description}</p>
                                </div>
                                {item.badge && (
                                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${item.badge.className}`}>
                                        {item.badge.text}
                                    </span>
                                )}
                            </div>
                            {item.timestamp && (
                                <p className="text-xs text-gray-500 mt-1">{item.timestamp}</p>
                            )}
                        </div>
                        
                        {/* Amount */}
                        {item.amount && (
                            <div className="text-right flex-shrink-0">
                                <p className={`font-semibold text-sm ${item.amountColor}`}>
                                    {item.amountPrefix}{item.amount}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
