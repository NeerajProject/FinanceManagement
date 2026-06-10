import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Truck, Package, CreditCard, AlertCircle } from 'lucide-react';
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

const vendorMenu = [
    { name: 'Dashboard', route: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'Vendors', route: '/vendors', icon: 'Truck' },
    { name: 'Purchases', route: '/vendors/purchases', icon: 'Package' },
    { name: 'Payments', route: '/vendors/payments', icon: 'CreditCard' },
];

export default function Vendors() {
    const stats = [
        { title: 'Total Vendors', value: '67', change: '+3', changeType: 'increase', icon: Truck, color: 'indigo' },
        { title: 'Outstanding Bills', value: '$45,320', change: '-$2,100', changeType: 'decrease', icon: CreditCard, color: 'indigo' },
        { title: 'Pending Orders', value: '12', change: '+2', changeType: 'increase', icon: Package, color: 'indigo' },
        { title: 'Alerts', value: '3', change: '-1', changeType: 'decrease', icon: AlertCircle, color: 'red' },
    ];

    const vendorData = [
        { id: 'VEND-001', name: 'Global Suppliers Ltd', category: 'Raw Materials', status: 'Active', payable: '$8,450' },
        { id: 'VEND-002', name: 'Tech Equipment Co', category: 'Equipment', status: 'Active', payable: '$12,890' },
        { id: 'VEND-003', name: 'Office Supplies Inc', category: 'Supplies', status: 'Pending', payable: '$24,000' },
    ];

    const columns = [
        { key: 'id', label: 'VENDOR ID' },
        { key: 'name', label: 'VENDOR NAME' },
        { key: 'category', label: 'CATEGORY' },
        { key: 'status', label: 'STATUS' },
        { key: 'payable', label: 'PAYABLE' },
    ];

    const activityItems = [
        {
            icon: CreditCard,
            backgroundColor: 'bg-green-100',
            iconColor: 'text-green-600',
            title: 'Payment Processed',
            description: 'Payment to Global Suppliers Ltd',
            amount: '-$8,450',
            amountColor: 'text-green-600',
            badge: { text: 'Paid', className: 'bg-green-100 text-green-800' },
            timestamp: '2 hours ago',
        },
        {
            icon: Package,
            backgroundColor: 'bg-blue-100',
            iconColor: 'text-blue-600',
            title: 'Order Received',
            description: 'Purchase order #PO-2024-156 received',
            badge: { text: 'Received', className: 'bg-blue-100 text-blue-800' },
            timestamp: '5 hours ago',
        },
        {
            icon: AlertCircle,
            backgroundColor: 'bg-orange-100',
            iconColor: 'text-orange-600',
            title: 'Bill Due',
            description: 'Invoice from Tech Equipment Co due soon',
            amount: '$12,890',
            amountColor: 'text-orange-600',
            badge: { text: 'Pending', className: 'bg-orange-100 text-orange-800' },
            timestamp: '1 day ago',
        },
    ];

    return (
        <AuthenticatedLayout
            menu={vendorMenu}
            theme="indigo"
            pageTitle="Vendors"
        >
            <Head title="Vendors" />

            <div className="space-y-6">
                <PageHeader
                    title="Vendor Management"
                    description="Track and manage vendors, purchases, and payments efficiently."
                    actions={
                        <Button variant="primary" size="md">
                            + Add Vendor
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
                            title="Vendor Activities"
                            items={activityItems}
                        />
                    </div>

                    <Card title="Metrics">
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">On-Time Delivery</p>
                                <ProgressBar label="" value={88} color="indigo" showPercentage={false} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Quality Score</p>
                                <ProgressBar label="" value={94} color="green" showPercentage={false} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Cost Optimization</p>
                                <ProgressBar label="" value={71} color="blue" showPercentage={false} />
                            </div>
                        </div>
                    </Card>
                </div>

                <DataTable
                    columns={columns}
                    data={vendorData}
                    title="Vendor List"
                />
            </div>
        </AuthenticatedLayout>
    );
}
