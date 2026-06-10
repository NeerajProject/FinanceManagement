export default function ProgressBar({ label, value, maxValue = 100, color = 'blue', showPercentage = true, animated = true }) {
    const percentage = (value / maxValue) * 100;

    const colorClasses = {
        blue: 'from-blue-400 to-blue-600',
        green: 'from-green-400 to-green-600',
        orange: 'from-orange-400 to-orange-600',
        red: 'from-red-400 to-red-600',
        purple: 'from-purple-400 to-purple-600',
        emerald: 'from-emerald-400 to-emerald-600',
        indigo: 'from-indigo-400 to-indigo-600',
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">{label}</p>
                {showPercentage && (
                    <p className="text-sm font-semibold text-gray-900">{Math.round(percentage)}%</p>
                )}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                    className={`h-full bg-gradient-to-r ${colorClasses[color]} ${animated ? 'transition-all duration-500' : ''}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
