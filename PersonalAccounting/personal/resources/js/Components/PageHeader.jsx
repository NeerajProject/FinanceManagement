export default function PageHeader({ title, description, actions }) {
    return (
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                {description && <p className="text-gray-600 mt-2">{description}</p>}
            </div>
            {actions && <div className="flex gap-3 flex-wrap md:flex-nowrap">{actions}</div>}
        </div>
    );
}
