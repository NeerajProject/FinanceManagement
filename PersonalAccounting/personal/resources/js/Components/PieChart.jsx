export default function PieChart({ data, title, size = 200 }) {
    let currentAngle = -90;
    const segments = [];

    data.forEach((item, i) => {
        const sliceAngle = (item.value / 100) * 360;
        const endAngle = currentAngle + sliceAngle;
        
        // SVG arc parameters
        const largeArc = sliceAngle > 180 ? 1 : 0;
        const radius = 35;
        const centerX = 50;
        const centerY = 50;

        // Calculate start point
        const startRad = (currentAngle * Math.PI) / 180;
        const x1 = centerX + radius * Math.cos(startRad);
        const y1 = centerY + radius * Math.sin(startRad);

        // Calculate end point
        const endRad = (endAngle * Math.PI) / 180;
        const x2 = centerX + radius * Math.cos(endRad);
        const y2 = centerY + radius * Math.sin(endRad);

        // Create arc path
        const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
            'Z'
        ].join(' ');

        segments.push({ pathData, color: item.color, label: item.label, value: item.value });
        currentAngle = endAngle;
    });

    return (
        <div className="p-6 bg-white rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
                <svg viewBox="0 0 100 100" style={{ width: `${size}px`, height: `${size}px` }}>
                    {segments.map((segment, i) => (
                        <path key={i} d={segment.pathData} fill={segment.color} opacity="0.8" />
                    ))}
                </svg>
                <div className="space-y-3">
                    {data.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${item.color}`} />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-700">{item.label}</p>
                                <p className="text-xs text-gray-500">{item.value}%</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
