import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    LayoutDashboard,
    Receipt,
    Settings,
    FileText,
    Menu,
    X,
    LogOut,
    User,
    HelpCircle,
    ChevronDown,
    ChevronRight,
} from 'lucide-react';

export default function AuthenticatedLayout({
    children,
    pageTitle = 'Dashboard',
}) {
    const { props, url } = usePage();
    const { auth } = props;

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [openMenus, setOpenMenus] = useState({
        Entries: true,
        Configuration: false,
        Reports: false,
    });

    const toggleMenu = (menu) => {
        setOpenMenus((prev) => ({
            ...prev,
            [menu]: !prev[menu],
        }));
    };

    const isActive = (route) => {
        return url === route || url.startsWith(route);
    };

    const menuGroups = [
        {
            name: 'Entries',
            icon: Receipt,
            children: [
                { name: 'Expense', route: '/expenses' },
                { name: 'Income', route: '/income' },
                { name: 'Payment Transfer', route: '/payment-transfer' },
                { name: 'Recurrent Payment', route: '/recurrent-payment' },
                { name: 'Journal Entry', route: '/journal-entry' },
            ],
        },
       
        {
            name: 'Reports',
            icon: FileText,
            children: [
                {
                    name: 'Trial Balance',
                    route: '/trial-balance',
                },
                {
                    name: 'Balance Sheet',
                    route: '/balance-sheet',
                },
                {
                    name: 'Profit & Loss',
                    route: '/profit-loss',
                },
                {
                    name: 'General Ledger',
                    route: '/general-ledger',
                },
            ],
        },
         {
            name: 'Configuration',
            icon: Settings,
            children: [
                {
                    name: 'Chart of Accounts',
                    route: '/chart-of-accounts',
                },
                {
                    name: 'Journal',
                    route: '/journals',
                },
                {
                    name: 'Expense Type',
                    route: '/expense-types',
                },
                {
                    name: 'Income Type',
                    route: '/income-types',
                },
            ],
        }
    ];

    return (
        <div className="h-screen flex bg-gray-50 overflow-hidden">

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:static
                    inset-y-0 left-0
                    z-50
                    w-64
                    bg-gradient-to-b from-blue-600 to-blue-800
                    text-white
                    flex flex-col
                    transform transition-transform duration-300
                    ${
                        sidebarOpen
                            ? 'translate-x-0'
                            : '-translate-x-full lg:translate-x-0'
                    }
                `}
            >
                {/* Logo */}
                <div className="h-16 px-6 flex items-center justify-between border-b border-blue-500/30">
                    <div>
                        <h1 className="text-xl font-bold">
                            LedgerFlow
                        </h1>
                        <p className="text-xs opacity-75">
                            Finance Manager
                        </p>
                    </div>

                    <button
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Dashboard */}
                <div className="p-3">
                    <Link
                        href="/dashboard"
                        className={`
                            flex items-center gap-3 px-4 py-3 rounded-lg
                            ${
                                isActive('/dashboard')
                                    ? 'bg-white/20'
                                    : 'hover:bg-white/10'
                            }
                        `}
                    >
                        <LayoutDashboard size={20} />
Accounting
                    </Link>
                </div>

                {/* Menu Groups */}
                <nav className="flex-1 overflow-y-auto px-3 pb-3">
                    {menuGroups.map((group) => {
                        const Icon = group.icon;

                        return (
                            <div
                                key={group.name}
                                className="mb-2"
                            >
                                {/* Parent */}
                                <button
                                    onClick={() =>
                                        toggleMenu(group.name)
                                    }
                                    className="
                                        w-full
                                        flex
                                        items-center
                                        justify-between
                                        px-4
                                        py-3
                                        rounded-lg
                                        hover:bg-white/10
                                        transition
                                    "
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon size={18} />
                                        <span className="font-medium">
                                            {group.name}
                                        </span>
                                    </div>

                                    {openMenus[group.name] ? (
                                        <ChevronDown
                                            size={16}
                                        />
                                    ) : (
                                        <ChevronRight
                                            size={16}
                                        />
                                    )}
                                </button>

                                {/* Child Menus */}
                                {openMenus[group.name] && (
                                    <div className="ml-6 mt-1 space-y-1">
                                        {group.children.map(
                                            (item) => (
                                                <Link
                                                    key={
                                                        item.route
                                                    }
                                                    href={
                                                        item.route
                                                    }
                                                    onClick={() =>
                                                        setSidebarOpen(
                                                            false
                                                        )
                                                    }
                                                    className={`
                                                        block
                                                        px-4
                                                        py-2
                                                        rounded-lg
                                                        text-sm
                                                        transition
                                                        ${
                                                            isActive(
                                                                item.route
                                                            )
                                                                ? 'bg-white/20 font-semibold'
                                                                : 'hover:bg-white/10'
                                                        }
                                                    `}
                                                >
                                                    {
                                                        item.name
                                                    }
                                                </Link>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* User Section */}
                <div className="border-t border-blue-500/30 p-3">

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 mb-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <User size={18} />
                        </div>

                        <div className="min-w-0">
                            <p className="font-semibold text-sm truncate">
                                {auth.user.name}
                            </p>
                            <p className="text-xs opacity-70 truncate">
                                {auth.user.email}
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route('profile.edit')}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10"
                    >
                        <HelpCircle size={18} />
                        Profile
                    </Link>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-500/30 text-left"
                    >
                        <LogOut size={18} />
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Header */}
                <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
                    <div className="flex items-center gap-4">

                        <button
                            className="lg:hidden"
                            onClick={() =>
                                setSidebarOpen(true)
                            }
                        >
                            <Menu size={24} />
                        </button>

                        <div>
                            <h2 className="font-semibold text-lg">
                                {pageTitle}
                            </h2>
                            <p className="text-xs text-gray-500">
                                Manage your finances efficiently
                            </p>
                        </div>
                    </div>

                    <button className="p-2 rounded-lg hover:bg-gray-100">
                        <HelpCircle size={20} />
                    </button>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}