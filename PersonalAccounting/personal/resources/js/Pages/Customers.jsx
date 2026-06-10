import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Users, UserPlus, TrendingUp, MessageCircle } from 'lucide-react';
import {
    AnimatedStatCard,
    StatsGridResponsive,
    PageHeader,
    Button,
    Card,
    DataTable,
    ActivityList,
    ProgressBar,
} from '../Components';

const customerMenu = [
    { name: 'Dashboard', route: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'Customers', route: '/customers', icon: 'Users' },
    { name: 'Add Customer', route: '/customers/create', icon: 'UserPlus' },
    { name: 'Reports', route: '/customers/reports', icon: 'FileText' },
];

export default function Customers() {
    const stats = [
        { title: 'Total Customers', value: '284', change: '+23', changeType: 'increase', icon: Users, color: 'purple' },
        { title: 'New This Month', value: '23', change: '+15%', changeType: 'increase', icon: UserPlus, color: 'purple' },
        { title: 'Active Contracts', value: '156', change: '+5', changeType: 'increase', icon: TrendingUp, color: 'purple' },
        { title: 'Messages', value: '42', change: '+8%', changeType: 'increase', icon: MessageCircle, color: 'purple' },
    ];

    const customerData = [
        { id: 'CUST-001', name: 'Acme Corporation', email: 'contact@acme.com', status: 'Active', balance: '$12,450' },
        { id: 'CUST-002', name: 'Tech Solutions Inc', email: 'sales@tech.com', status: 'Active', balance: '$8,920' },
        { id: 'CUST-003', name: 'Global Enterprises', email: 'info@global.com', status: 'Pending', balance: '$0' },
    ];

    const columns = [
        { key: 'id', label: 'CUSTOMER ID' },
        { key: 'name', label: 'NAME' },
        { key: 'email', label: 'EMAIL' },
        { key: 'status', label: 'STATUS' },
        { key: 'balance', label: 'BALANCE' },
    ];

    const activityItems = [
        {
            icon: Users,
            backgroundColor: 'bg-purple-100',
            iconColor: 'text-purple-600',
            title: 'New Customer Registration',
            description: 'Creative Design Ltd joined your network',
            badge: { text: 'New', className: 'bg-purple-100 text-purple-800' },
            timestamp: '1 hour ago',
        },
        {
            icon: TrendingUp,
            backgroundColor: 'bg-green-100',
            iconColor: 'text-green-600',
            title: 'Customer Milestone',
            description: 'Acme Corp reached 5 years with us',
            badge: { text: 'Milestone', className: 'bg-green-100 text-green-800' },
            timestamp: '3 hours ago',
        },
    ];

    return (
        <AuthenticatedLayout
            menu={customerMenu}
            theme="purple"
            pageTitle="Customers"
        >
            <Head title="Customers" />

            <div className="space-y-6">
                <PageHeader
                    title="Customer Management"
                    description="View and manage all your customers with detailed insights and analytics."
                    actions={
                        <Button variant="primary" size="md">
                            + Add Customer
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
                            title="Customer Updates"
                            items={activityItems}
                        />
                    </div>

                    <Card title="Performance">
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Satisfaction Rate</p>
                                <ProgressBar label="" value={87} color="purple" showPercentage={false} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Retention Rate</p>
                                <ProgressBar label="" value={92} color="green" showPercentage={false} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Growth Rate</p>
                                <ProgressBar label="" value={78} color="blue" showPercentage={false} />
                            </div>
                        </div>
                    </Card>
                </div>

                <DataTable
                    columns={columns}
                    data={customerData}
                    title="Customer List"
                />
            </div>
        </AuthenticatedLayout>
    );
}
