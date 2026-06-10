export default function Card({ children, title, subtitle, header, className = '' }) {
    return (
        <div className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden ${className}`}>
            {(title || header) && (
                <div className="px-6 py-4 border-b border-gray-100">
                    {header ? (
                        header
                    ) : (
                        <>
                            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
                        </>
                    )}
                </div>
            )}
            <div className="px-6 py-4">{children}</div>
        </div>
    );
}
