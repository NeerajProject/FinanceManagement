import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { BarChart3, TrendingUp, Calendar, Download } from 'lucide-react';
import {
    AnimatedStatCard,
    StatsGridResponsive,
    PageHeader,
    Button,
    Card,
    ChartContainer,
    BarChart,
    LineChart,
    PieChart,
    ActivityList,
    ProgressBar,
} from '../Components';

const reportMenu = [
    { name: 'Dashboard', route: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'Financial Reports', route: '/reports', icon: 'BarChart3' },
    { name: 'Expense Reports', route: '/reports/expenses', icon: 'TrendingUp' },
    { name: 'Schedules', route: '/reports/schedule', icon: 'Calendar' },
];

export default function Reports() {
    const stats = [
        { title: 'Total Revenue', value: '$456,230', change: '+18.5%', changeType: 'increase', icon: TrendingUp, color: 'rose' },
        { title: 'Total Expenses', value: '$128,450', change: '+5.2%', changeType: 'increase', icon: BarChart3, color: 'rose' },
        { title: 'Net Income', value: '$327,780', change: '+25.3%', changeType: 'increase', icon: TrendingUp, color: 'rose' },
        { title: 'Reports Generated', value: '234', change: '+42', changeType: 'increase', icon: Download, color: 'rose' },
    ];

    const revenueData = [
        { label: 'Jan', value: 65 },
        { label: 'Feb', value: 72 },
        { label: 'Mar', value: 68 },
        { label: 'Apr', value: 81 },
        { label: 'May', value: 75 },
    ];

    const expenseData = [
        { label: 'Jan', value: 35 },
        { label: 'Feb', value: 38 },
        { label: 'Mar', value: 32 },
        { label: 'Apr', value: 42 },
        { label: 'May', value: 38 },
    ];

    const categoryData = [
        { label: 'Salaries', value: 35, color: 'bg-rose-400' },
        { label: 'Operations', value: 22, color: 'bg-orange-400' },
        { label: 'Marketing', value: 17, color: 'bg-pink-400' },
        { label: 'Other', value: 26, color: 'bg-red-400' },
    ];

    const activityItems = [
        {
            icon: TrendingUp,
            backgroundColor: 'bg-green-100',
            iconColor: 'text-green-600',
            title: 'Q2 Revenue Report',
            description: 'Quarterly report generated and approved',
            amount: '+$456,230',
            amountColor: 'text-green-600',
            badge: { text: 'Approved', className: 'bg-green-100 text-green-800' },
            timestamp: '3 hours ago',
        },
        {
            icon: BarChart3,
            backgroundColor: 'bg-blue-100',
            iconColor: 'text-blue-600',
            title: 'Expense Analysis',
            description: 'Monthly expense report completed',
            badge: { text: 'Complete', className: 'bg-blue-100 text-blue-800' },
            timestamp: '1 day ago',
        },
    ];

    return (
        <AuthenticatedLayout
            menu={reportMenu}
            theme="rose"
            pageTitle="Reports"
        >
            <Head title="Reports" />

            <div className="space-y-6">
                <PageHeader
                    title="Financial Reports"
                    description="Comprehensive financial analytics and performance metrics."
                    actions={
                        <>
                            <Button variant="primary" size="md">
                                + Generate Report
                            </Button>
                            <Button variant="secondary" size="md">
                                <Download size={18} />
                                Export
                            </Button>
                        </>
                    }
                />

                <StatsGridResponsive>
                    {stats.map((stat) => (
                        <AnimatedStatCard
                            key={stat.title}
                            title={stat.title}
                            value={stat.value}
                            change={stat.change}
                            changeType={stat.changeType}
                            icon={stat.icon}
                            color={stat.color}
                            lastUpdated
                        />
                    ))}
                </StatsGridResponsive>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ChartContainer
                        title="Revenue Trend"
                        subtitle="6-month overview"
                    >
                        <LineChart data={revenueData} title="" height={280} />
                    </ChartContainer>

                    <ChartContainer
                        title="Expense Breakdown"
                        subtitle="Monthly expenses"
                    >
                        <BarChart data={expenseData} title="" height={280} />
                    </ChartContainer>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <ActivityList
                            title="Report Activity"
                            items={activityItems}
                        />
                    </div>

                    <ChartContainer title="Expense Categories">
                        <PieChart data={categoryData} title="" size={180} />
                    </ChartContainer>
                </div>

                <Card title="Report Details">
                    <div className="space-y-4">
                        {[
                            { month: 'January 2024', gross: '$65,240', expenses: '$35,180', net: '$30,060' },
                            { month: 'February 2024', gross: '$72,450', expenses: '$38,920', net: '$33,530' },
                            { month: 'March 2024', gross: '$68,720', expenses: '$32,450', net: '$36,270' },
                        ].map((item, idx) => (
                            <div key={idx} className="p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-lg border border-gray-200 hover:border-rose-200 transition">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="font-semibold text-gray-900">{item.month}</p>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-600">Gross Revenue</p>
                                        <p className="font-bold text-gray-900">{item.gross}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Expenses</p>
                                        <p className="font-bold text-gray-900">{item.expenses}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Net Income</p>
                                        <p className="font-bold text-rose-600">{item.net}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
