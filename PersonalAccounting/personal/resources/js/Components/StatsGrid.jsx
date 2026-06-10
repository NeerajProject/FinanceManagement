export default function StatsGrid({ children, columns = { default: 1, sm: 1, md: 2, lg: 4 } }) {
    return (
        <div
            className={`grid gap-6 grid-cols-${columns.default} sm:grid-cols-${columns.sm} md:grid-cols-${columns.md} lg:grid-cols-${columns.lg}`}
        >
            {children}
        </div>
    );
}

// Better approach with explicit grid classes
export function StatsGridResponsive({ children }) {
    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{children}</div>;
}
