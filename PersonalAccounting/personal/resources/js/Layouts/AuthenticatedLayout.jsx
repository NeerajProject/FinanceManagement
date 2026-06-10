import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    Receipt,
    Truck,
    FileText,
    Menu,
    X,
    LogOut,
    User,
    Settings,
    HelpCircle,
} from 'lucide-react';

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const menus = [
        {
            name: 'Dashboard',
            route: '/dashboard',
            icon: LayoutDashboard,
        },
        {
            name: 'Accounts',
            route: '/accounts',
            icon: Receipt,
        },
        {
            name: 'Customers',
            route: '/customers',
            icon: Users,
        },
        {
            name: 'Vendors',
            route: '/vendors',
            icon: Truck,
        },
        {
            name: 'Reports',
            route: '/reports',
            icon: FileText,
        },
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
                    bg-gradient-to-b from-blue-900 to-blue-800
                    text-white
                    transform
                    transition-transform
                    duration-300
                    ${
                        sidebarOpen
                            ? 'translate-x-0'
                            : '-translate-x-full lg:translate-x-0'
                    }
                `}
            >
                {/* Logo */}
                <div className="h-16 px-6 flex items-center justify-between border-b border-blue-700">
                    <h1 className="text-xl font-bold text-white">
                        LedgerFlow
                    </h1>

                    <button
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Menus */}
                <nav className="p-3">
                    {menus.map((menu) => {
                        const Icon = menu.icon;

                        return (
                            <Link
                                key={menu.name}
                                href={menu.route}
                                onClick={() =>
                                    setSidebarOpen(false)
                                }
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    px-4
                                    py-3
                                    rounded-lg
                                    hover:bg-blue-700
                                    transition
                                    mb-1
                                "
                            >
                                <Icon size={20} />

                                <span>
                                    {menu.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Navbar */}
                <header
                    className="
                        h-16
                        bg-white
                        border-b
                        border-gray-200
                        flex
                        items-center
                        justify-between
                        px-4 md:px-6
                        shadow-sm
                    "
                >
                    <div className="flex items-center gap-3">

                        <button
                            className="lg:hidden"
                            onClick={() =>
                                setSidebarOpen(true)
                            }
                        >
                            <Menu size={24} />
                        </button>

                        <h2 className="font-semibold text-gray-800">
                            Dashboard
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2">
                            <div
                                className="
                                    h-10
                                    w-10
                                    rounded-full
                                    bg-blue-100
                                    flex
                                    items-center
                                    justify-center
                                    text-blue-600
                                "
                            >
                                <User size={18} />
                            </div>

                            <div>
                                <div className="font-medium text-sm">
                                    {user.name}
                                </div>

                                <div className="text-xs text-gray-500">
                                    Administrator
                                </div>
                            </div>
                        </div>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="
                                flex
                                items-center
                                gap-2
                                px-3
                                py-2
                                rounded-lg
                                text-red-600
                                hover:bg-red-50
                            "
                        >
                            <LogOut size={18} />

                            <span className="hidden sm:block">
                                Logout
                            </span>
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}