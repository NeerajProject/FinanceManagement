import LedgerFlowLayout from '@/Layouts/LedgerFlowLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <LedgerFlowLayout activePath="/dashboard">
            <Head title="Dashboard" />
            
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
                        <p className="text-gray-500 text-sm mt-1">Overview of your fiscal activities.</p>
                    </div>
                </div>

                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg border border-gray-200">
                    <div className="p-6 text-gray-900">
                        You're logged in!
                    </div>
                </div>
            </div>
        </LedgerFlowLayout>
    );
}
