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


export default function Dashboard() {
    const [activeFilter, setActiveFilter] = useState('all');

   
    return (
        <AuthenticatedLayout>


        </AuthenticatedLayout>
    );
}
