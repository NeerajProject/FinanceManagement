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
    ChevronDown,
} from 'lucide-react';
import { getTheme } from '../Config/themes';

// Icon mapping for dynamic icons
const iconMap = {
    LayoutDashboard,
    Users,
    Receipt,
    Truck,
    FileText,
    Settings,
    HelpCircle,
};

export default function AuthenticatedLayout({ children, menu, theme = 'default', pageTitle = 'Dashboard' }) {
    const { auth } = usePage().props;
    const { menus: propsMenus, url: currentUrl } = usePage().props;
    const user = auth.user;

    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Use passed menu or default
    const menus = menu || propsMenus || [
        {
            name: 'Dashboard',
            route: '/dashboard',
            icon: 'LayoutDashboard',
        },
        {
            name: 'Accounts',
            route: '/accounts',
            icon: 'Receipt',
        },
        {
            name: 'Customers',
            route: '/customers',
            icon: 'Users',
        },
        {
            name: 'Vendors',
            route: '/vendors',
            icon: 'Truck',
        },
        {
            name: 'Reports',
            route: '/reports',
            icon: 'FileText',
        },
    ];

    const currentTheme = getTheme(theme);

    // Check if a route is active
    const isActive = (route) => {
        return currentUrl === route || currentUrl?.startsWith(route);
    };

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
                    transform
                    transition-transform
                    duration-300
                    flex
                    flex-col
                    ${
                        sidebarOpen
                            ? 'translate-x-0'
                            : '-translate-x-full lg:translate-x-0'
                    }
                `}
            >
                {/* Logo Section */}
                <div className={`h-16 px-6 flex items-center justify-between border-b border-blue-500 border-opacity-30`}>
                    <div>
                        <h1 className="text-xl font-bold text-white">
                            LedgerFlow
                        </h1>
                        <p className="text-xs opacity-75">Finance Manager</p>
                    </div>

                    <button
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Main Menu - Scrollable */}
                <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                    {/* Main Section */}
                    <div>
                        <p className="px-4 py-2 text-xs font-semibold opacity-60 uppercase tracking-wider">Main</p>
                        {menus.map((menu) => {
                            // Handle both component references and string icon names
                            const Icon = typeof menu.icon === 'string' ? iconMap[menu.icon] : menu.icon;
                            const active = isActive(menu.route);

                            return (
                                <Link
                                    key={menu.name}
                                    href={menu.route}
                                    onClick={() =>
                                        setSidebarOpen(false)
                                    }
                                    className={`
                                        flex
                                        items-center
                                        gap-3
                                        px-4
                                        py-3
                                        rounded-lg
                                        transition
                                        mb-1
                                        ${active 
                                            ? 'bg-white bg-opacity-20 font-semibold' 
                                            : 'hover:bg-white hover:bg-opacity-10'
                                        }
                                    `}
                                >
                                    <Icon size={20} className={active ? 'text-white' : 'opacity-75'} />
                                    <span className={active ? 'text-white' : 'opacity-90'}>
                                        {menu.name}
                                    </span>
                                    {active && (
                                        <div className="ml-auto w-1 h-6 bg-white rounded-r opacity-100" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Bottom Actions */}
                <div className={`border-t border-blue-500 border-opacity-30 p-3 space-y-2`}>
                    {/* User Profile Card */}
                    <div className="px-4 py-3 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm mb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0">
                                <User size={18} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm truncate">
                                    {user.name}
                                </p>
                                <p className="text-xs opacity-75 truncate">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Settings & Help */}
                    <Link
                        href={route('profile.edit')}
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                        className={`
                            flex
                            items-center
                            gap-3
                            px-4
                            py-2
                            rounded-lg
                            transition
                            hover:bg-white
                            hover:bg-opacity-10
                        `}
                    >
                        <Settings size={18} />
                        <span className="text-sm">Settings</span>
                    </Link>

                    {/* Logout */}
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className={`
                            w-full
                            flex
                            items-center
                            gap-3
                            px-4
                            py-2
                            rounded-lg
                            transition
                            hover:bg-red-500
                            hover:bg-opacity-30
                            text-left
                        `}
                    >
                        <LogOut size={18} />
                        <span className="text-sm">Logout</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Navbar */}
                <header
                    className={`
                        h-16
                        ${currentTheme.header.bg}
                        ${currentTheme.header.text}
                        flex
                        items-center
                        justify-between
                        px-4 md:px-6
                        shadow-sm
                        border-b border-opacity-10
                        border-gray-400
                    `}
                >
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition"
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
                            <p className="text-xs opacity-60">
                                Manage your finances efficiently
                            </p>
                        </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-3">
                        <button className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition">
                            <HelpCircle size={20} />
                        </button>
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