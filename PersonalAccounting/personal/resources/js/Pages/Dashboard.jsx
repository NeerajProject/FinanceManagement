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
    { name: 'Dashboard', route: '/dashboard', icon: 'AlertCircle' },

    { name: 'Expense', route: '/expenses', icon: 'AlertCircle' },
    { name: 'Income', route: '/income', icon: 'AlertCircle' },

    { name: 'Payment Transfer', route: '/payment-transfer', icon: 'AlertCircle' },
    { name: 'Recurrent Payment', route: '/recurrent-payment', icon: 'AlertCircle' },

    { name: 'Journal Entry', route: '/journal-entry', icon: 'AlertCircle' },
    { name: 'Journal', route: '/journal', icon: 'AlertCircle' },

    { name: 'Chart of Accounts', route: '/chart-of-accounts', icon: 'AlertCircle' },

    { name: 'Trial Balance', route: '/trial-balance', icon: 'AlertCircle' },
    { name: 'Balance Sheets', route: '/balance-sheet', icon: 'AlertCircle' },
    { name: 'Profit and Loss Sheets', route: '/profit-loss', icon: 'AlertCircle' },

    { name: 'General Ledgers', route: '/general-ledger', icon: 'AlertCircle' },
];

export default function Dashboard() {
    const [activeFilter, setActiveFilter] = useState('all');

   
    return (
        <AuthenticatedLayout>


        </AuthenticatedLayout>
    );
}
