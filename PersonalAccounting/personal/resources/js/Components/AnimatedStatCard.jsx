import { TrendingUp, TrendingDown } from 'lucide-react';

export default function AnimatedStatCard({ title, value, change, changeType = 'increase', icon: Icon, color = 'blue', lastUpdated }) {
    const colorClasses = {
        blue: 'from-blue-50 to-blue-100 text-blue-600',
        green: 'from-green-50 to-green-100 text-green-600',
        orange: 'from-orange-50 to-orange-100 text-orange-600',
        red: 'from-red-50 to-red-100 text-red-600',
        purple: 'from-purple-50 to-purple-100 text-purple-600',
        emerald: 'from-emerald-50 to-emerald-100 text-emerald-600',
        indigo: 'from-indigo-50 to-indigo-100 text-indigo-600',
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-3">{value}</p>
                    
                    {change && (
                        <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1 text-sm font-semibold ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                                {changeType === 'increase' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                {change}
                            </span>
                            {lastUpdated && <span className="text-xs text-gray-500">vs last month</span>}
                        </div>
                    )}
                </div>
                
                <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} />
                </div>
            </div>
        </div>
    );
}
