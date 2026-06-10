export default function LineChart({ data, title, height = 300 }) {
    const maxValue = Math.max(...data.map(d => d.value));
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - (d.value / maxValue) * 80;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="p-6 bg-white rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
            <svg viewBox="0 0 100 100" style={{ height: `${height}px`, width: '100%' }} className="mb-4">
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((y) => (
                    <line key={`grid-${y}`} x1="10" y1={y} x2="95" y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
                ))}
                
                {/* Y-axis */}
                <line x1="10" y1="20" x2="10" y2="100" stroke="#9ca3af" strokeWidth="1" />
                {/* X-axis */}
                <line x1="10" y1="100" x2="95" y2="100" stroke="#9ca3af" strokeWidth="1" />
                
                {/* Line */}
                <polyline
                    points={points}
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                />
                
                {/* Gradient */}
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                    </linearGradient>
                </defs>

                {/* Points */}
                {data.map((d, i) => {
                    const x = (i / (data.length - 1)) * 85 + 10;
                    const y = 100 - (d.value / maxValue) * 80;
                    return (
                        <circle key={`point-${i}`} cx={x} cy={y} r="1.5" fill="#3b82f6" />
                    );
                })}
            </svg>
            <div className="grid grid-cols-5 gap-2">
                {data.map((d, i) => (
                    <div key={`label-${i}`} className="text-center">
                        <p className="text-xs text-gray-500">{d.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
