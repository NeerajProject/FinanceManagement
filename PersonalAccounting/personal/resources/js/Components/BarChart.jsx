export default function BarChart({ data, title, height = 300 }) {
    const maxValue = Math.max(...data.map(d => d.value));
    const barWidth = 100 / (data.length * 1.5);

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
                
                {/* Bars */}
                {data.map((d, i) => {
                    const x = 15 + i * (barWidth * 1.5);
                    const barHeight = (d.value / maxValue) * 75;
                    const y = 100 - barHeight;
                    
                    return (
                        <g key={`bar-${i}`}>
                            <rect
                                x={x}
                                y={y}
                                width={barWidth}
                                height={barHeight}
                                fill="#3b82f6"
                                rx="1"
                                className="hover:fill-blue-700 transition"
                                style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.05))' }}
                            />
                        </g>
                    );
                })}
            </svg>
            <div className="grid grid-cols-5 gap-2">
                {data.map((d, i) => (
                    <div key={`label-${i}`} className="text-center">
                        <p className="text-xs text-gray-500">{d.label}</p>
                        <p className="text-xs font-semibold text-gray-900">${d.value}k</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
