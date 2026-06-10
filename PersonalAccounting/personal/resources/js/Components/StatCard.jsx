import Card from './Card';

export default function StatCard({ icon: Icon, title, value, color = 'blue', trend, trendValue }) {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        orange: 'bg-orange-50 text-orange-600',
        red: 'bg-red-50 text-red-600',
        purple: 'bg-purple-50 text-purple-600',
    };

    return (
        <Card className="h-full">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <p className="text-gray-600 text-sm font-medium">{title}</p>
                        <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{value}</p>
                        {trend && (
                            <p className={`text-xs font-medium mt-2 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {trend === 'up' ? '↑' : '↓'} {trendValue}
                            </p>
                        )}
                    </div>
                    <div className={`p-3 rounded-lg ${colorClasses[color]} flex-shrink-0`}>
                        <Icon size={24} />
                    </div>
                </div>
            </div>
        </Card>
    );
}
