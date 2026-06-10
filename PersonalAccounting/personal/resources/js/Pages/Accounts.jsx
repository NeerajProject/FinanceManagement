import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Wallet, TrendingUp, DollarSign, PieChart } from 'lucide-react';
import {
    AnimatedStatCard,
    StatsGridResponsive,
    PageHeader,
    Button,
    Card,
    ChartContainer,
    ProgressBar,
    ActivityList,
} from '../Components';

const accountMenu = [
    { name: 'Dashboard', route: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'All Accounts', route: '/accounts', icon: 'Wallet' },
    { name: 'Bank Accounts', route: '/accounts/bank', icon: 'Receipt' },
    { name: 'Settings', route: '/accounts/settings', icon: 'Settings' },
];

export default function Accounts() {
    const stats = [
        { title: 'Total Accounts', value: '12', change: '+2', changeType: 'increase', icon: Wallet, color: 'emerald' },
        { title: 'Total Balance', value: '$125,430', change: '+8.2%', changeType: 'increase', icon: DollarSign, color: 'emerald' },
        { title: 'Monthly Growth', value: '+12.5%', change: '+2.3%', changeType: 'increase', icon: TrendingUp, color: 'emerald' },
        { title: 'Active Accounts', value: '10', change: '+1', changeType: 'increase', icon: PieChart, color: 'emerald' },
    ];

    const accountActivity = [
        {
            icon: DollarSign,
            backgroundColor: 'bg-emerald-100',
            iconColor: 'text-emerald-600',
            title: 'Checking Account',
            description: 'Transfer out: $5,000',
            amount: '-$5,000',
            amountColor: 'text-red-600',
            badge: { text: 'Completed', className: 'bg-emerald-100 text-emerald-800' },
            timestamp: '2 hours ago',
        },
        {
            icon: DollarSign,
            backgroundColor: 'bg-green-100',
            iconColor: 'text-green-600',
            title: 'Savings Account',
            description: 'Interest credited',
            amount: '+$125.50',
            amountColor: 'text-green-600',
            badge: { text: 'Interest', className: 'bg-green-100 text-green-800' },
            timestamp: '1 day ago',
        },
        {
            icon: Wallet,
            backgroundColor: 'bg-blue-100',
            iconColor: 'text-blue-600',
            title: 'Business Account',
            description: 'Opening balance transferred',
            amount: '+$50,000',
            amountColor: 'text-green-600',
            badge: { text: 'Setup', className: 'bg-blue-100 text-blue-800' },
            timestamp: '3 days ago',
        },
    ];

    return (
        <AuthenticatedLayout
            menu={accountMenu}
            theme="emerald"
            pageTitle="Accounts"
        >
            <Head title="Accounts" />

            <div className="space-y-6">
                <PageHeader
                    title="Bank Accounts"
                    description="Manage and monitor all your financial accounts with real-time balance tracking."
                    actions={
                        <Button variant="primary" size="md">
                            + Add Account
                        </Button>
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <ActivityList
                            title="Recent Account Activities"
                            items={accountActivity}
                        />
                    </div>

                    <Card title="Account Health">
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Liquidity Score</p>
                                <ProgressBar label="" value={85} color="emerald" showPercentage={false} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Account Balance</p>
                                <ProgressBar label="" value={72} color="green" showPercentage={false} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Transaction Activity</p>
                                <ProgressBar label="" value={65} color="blue" showPercentage={false} />
                            </div>
                        </div>
                    </Card>
                </div>

                <Card title="Account Summary">
                    <div className="space-y-4">
                        {[
                            { name: 'Checking Account', type: 'Checking', balance: '$45,230', status: 'Active', statusColor: 'bg-green-100 text-green-800' },
                            { name: 'Savings Account', type: 'Savings', balance: '$80,200', status: 'Active', statusColor: 'bg-green-100 text-green-800' },
                            { name: 'Money Market', type: 'Investment', balance: '$0', status: 'Inactive', statusColor: 'bg-gray-100 text-gray-800' },
                        ].map((account, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-lg border border-gray-200 hover:border-emerald-200 transition">
                                <div>
                                    <p className="font-semibold text-gray-900">{account.name}</p>
                                    <p className="text-sm text-gray-600">{account.type}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-emerald-600 text-lg">{account.balance}</p>
                                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${account.statusColor}`}>
                                        {account.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
