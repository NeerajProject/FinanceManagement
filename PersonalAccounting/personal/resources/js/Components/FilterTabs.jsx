import Button from './Button';

export default function FilterTabs({ tabs, activeTab, onTabChange }) {
    return (
        <div className="flex gap-3 flex-wrap">
            {tabs.map((tab) => (
                <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => onTabChange(tab.id)}
                >
                    {tab.label}
                </Button>
            ))}
        </div>
    );
}
