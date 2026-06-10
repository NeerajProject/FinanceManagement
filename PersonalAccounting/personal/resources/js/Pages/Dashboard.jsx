import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Ticket, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import StatCard from '../Components/StatCard';
import DataTable from '../Components/DataTable';
import PageHeader from '../Components/PageHeader';
import FilterTabs from '../Components/FilterTabs';
import Button from '../Components/Button';
import { StatsGridResponsive } from '../Components/StatsGrid';

export default function Dashboard() {
    const [activeFilter, setActiveFilter] = useState('all');

    const stats = [
        { title: 'Total Tickets', value: '24', icon: Ticket, color: 'blue' },
        { title: 'High Priority', value: '3', icon: AlertCircle, color: 'red' },
        { title: 'In Progress', value: '8', icon: Clock, color: 'orange' },
        { title: 'Resolved', value: '13', icon: CheckCircle, color: 'green' },
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

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="space-y-6">
                {/* Header */}
                <PageHeader
                    title="Support Tickets"
                    description="Manage and track your technical inquiries and account assistance requests."
                    actions={
                        <>
                            <Button variant="primary" size="md">
                                + Create new Ticket
                            </Button>
                        </>
                    }
                />

                {/* Stats Grid */}
                <StatsGridResponsive>
                    {stats.map((stat) => (
                        <StatCard
                            key={stat.title}
                            title={stat.title}
                            value={stat.value}
                            icon={stat.icon}
                            color={stat.color}
                        />
                    ))}
                </StatsGridResponsive>

                {/* Filters */}
                <FilterTabs tabs={filterTabs} activeTab={activeFilter} onTabChange={setActiveFilter} />

                {/* Data Table */}
                <DataTable
                    columns={columns}
                    data={filteredTickets}
                    title="Support Tickets"
                    itemsPerPage={10}
                />
            </div>
        </AuthenticatedLayout>
    );
}
