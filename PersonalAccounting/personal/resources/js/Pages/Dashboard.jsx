import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Ticket, AlertCircle, CheckCircle, Clock, TrendingUp, Users, DollarSign,Download } from 'lucide-react';
import {
    AnimatedStatCard,
    DataTable,
    PageHeader,
    FilterTabs,
    Button,
    StatsGridResponsive,
    Card,
    LineChart,
    BarChart,
    ChartContainer,
    ActivityList,
    ProgressBar,
    SummaryCard,
} from '../Components';

// Dashboard menu - passes to AuthenticatedLayout
const dashboardMenu = [
    { name: 'Dashboard', route: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'Accounts', route: '/accounts', icon: 'Receipt' },
    { name: 'Customers', route: '/customers', icon: 'Users' },
    { name: 'Vendors', route: '/vendors', icon: 'Truck' },
    { name: 'Reports', route: '/reports', icon: 'FileText' },
];

export default function Dashboard() {
    const [activeFilter, setActiveFilter] = useState('all');

    const stats = [
        { title: 'Total Tickets', value: '24', change: '+12%', changeType: 'increase', icon: Ticket, color: 'blue' },
        { title: 'High Priority', value: '3', change: '-8%', changeType: 'decrease', icon: AlertCircle, color: 'red' },
        { title: 'In Progress', value: '8', change: '+5%', changeType: 'increase', icon: Clock, color: 'orange' },
        { title: 'Resolved', value: '13', change: '+24%', changeType: 'increase', icon: CheckCircle, color: 'green' },
    ];

    const allTickets = [
        {
            id: 'ATK-6821',
            subject: 'Unable to sync QBO bank feed',
            category: 'Technical Integration • Financial Year 2024',
            status: 'Open',
            priority: 'High',
            lastUpdate: '2 hours ago',
        },
        {
            id: 'ATK-6794',
            subject: 'API Webhook timeout error',
            category: 'Developer Tools • Ledger API v2',
            status: 'In-Progress',
            priority: 'Medium',
            lastUpdate: '5 hours ago',
        },
        {
            id: 'ATK-6742',
            subject: 'Request for bulk invoice export',
            category: 'Feature Request • Invoicing Module',
            status: 'Resolved',
            priority: 'Low',
            lastUpdate: 'Yesterday',
        },
        {
            id: 'ATK-6751',
            subject: 'Monthly report generation failing',
            category: 'Reporting • System Failure',
            status: 'In-Progress',
            priority: 'High',
            lastUpdate: '2 days ago',
        },
    ];

    const filterTabs = [
        { id: 'all', label: 'All Tickets' },
        { id: 'open', label: 'Open' },
        { id: 'in-progress', label: 'In Progress' },
        { id: 'resolved', label: 'Resolved' },
    ];

    const filteredTickets = allTickets.filter((ticket) => {
        if (activeFilter === 'all') return true;
        return ticket.status.toLowerCase().replace('-', '') === activeFilter.replace('-', '');
    });

    const columns = [
        { key: 'id', label: 'TICKET ID' },
        { key: 'subject', label: 'SUBJECT' },
        { key: 'status', label: 'STATUS' },
        { key: 'priority', label: 'PRIORITY' },
        { key: 'lastUpdate', label: 'LAST UPDATE' },
    ];

    // Chart data
    const revenueData = [
        { label: 'Jan', value: 45 },
        { label: 'Feb', value: 52 },
        { label: 'Mar', value: 48 },
        { label: 'Apr', value: 61 },
        { label: 'May', value: 55 },
    ];

    const expenseData = [
        { label: 'Jan', value: 28 },
        { label: 'Feb', value: 32 },
        { label: 'Mar', value: 29 },
        { label: 'Apr', value: 35 },
        { label: 'May', value: 31 },
    ];

    const activityItems = [
        {
            icon: DollarSign,
            backgroundColor: 'bg-green-100',
            iconColor: 'text-green-600',
            title: 'Invoice #INV-2024-001',
            description: 'Payment received from Acme Corp',
            amount: '+$5,450',
            amountColor: 'text-green-600',
            amountPrefix: '',
            badge: { text: 'Completed', className: 'bg-green-100 text-green-800' },
            timestamp: '2 hours ago',
        },
        {
            icon: AlertCircle,
            backgroundColor: 'bg-orange-100',
            iconColor: 'text-orange-600',
            title: 'Bill #BIL-2024-045',
            description: 'Payment due to Global Suppliers',
            amount: '$3,200',
            amountColor: 'text-orange-600',
            amountPrefix: '',
            badge: { text: 'Pending', className: 'bg-orange-100 text-orange-800' },
            timestamp: '5 hours ago',
        },
        {
            icon: Users,
            backgroundColor: 'bg-blue-100',
            iconColor: 'text-blue-600',
            title: 'New Customer',
            description: 'Tech Solutions Inc registered',
            badge: { text: 'New', className: 'bg-blue-100 text-blue-800' },
            timestamp: '1 day ago',
        },
        {
            icon: TrendingUp,
            backgroundColor: 'bg-purple-100',
            iconColor: 'text-purple-600',
            title: 'Monthly Report',
            description: 'Revenue report for May 2024',
            amount: '+12.5%',
            amountColor: 'text-purple-600',
            amountPrefix: '',
            timestamp: '2 days ago',
        },
    ];

    return (
        <AuthenticatedLayout
            menu={dashboardMenu}
            theme="default"
            pageTitle="Dashboard"
        >
            <Head title="Dashboard" />
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




                   <Card title="Metrics">
                      
                    </Card>
                </div>



            
        </AuthenticatedLayout>
    );
}
