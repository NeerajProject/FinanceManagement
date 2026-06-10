import { ChevronUp, ChevronDown } from 'lucide-react';

export default function Badge({ children, type = 'status', variant = 'default' }) {
    const statusVariants = {
        open: 'bg-red-50 text-red-700 border border-red-200',
        'in-progress': 'bg-blue-50 text-blue-700 border border-blue-200',
        resolved: 'bg-green-50 text-green-700 border border-green-200',
        pending: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
        default: 'bg-gray-50 text-gray-700 border border-gray-200',
    };

    const priorityVariants = {
        high: 'text-red-600',
        medium: 'text-orange-600',
        low: 'text-green-600',
    };

    const styles = type === 'status' ? statusVariants[variant] : priorityVariants[variant];

    if (type === 'priority') {
        return (
            <div className={`flex items-center gap-1 ${styles}`}>
                {variant === 'high' && <ChevronUp size={16} />}
                {variant === 'medium' && <ChevronDown size={16} />}
                {children}
            </div>
        );
    }

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
            {children}
        </span>
    );
}
