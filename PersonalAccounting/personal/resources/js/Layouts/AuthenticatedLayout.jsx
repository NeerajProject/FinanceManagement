import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    LayoutDashboard,
    Menu,
    X,
    LogOut,
    User,
    Settings,
    HelpCircle,
} from 'lucide-react';

export default function AuthenticatedLayout({
    children,
    menu = [],
    pageTitle = 'Dashboard',
}) {
    const { props, url } = usePage();
    const { auth, menus: pageMenus } = props;

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const menus = menu.length
        ? menu
        : pageMenus || [
              { name: 'Dashboard', route: '/dashboard' },
              { name: 'Expense', route: '/expenses' },
              { name: 'Income', route: '/income' },
              { name: 'Payment Transfer', route: '/payment-transfer' },
              { name: 'Recurring Transactions', route: '/recurring-transactions' },
              { name: 'Journal Entry', route: '/journal-entry' },
              { name: 'Chart of Accounts', route: '/chart-of-accounts' },
              { name: 'Journal', route: '/journal' },
              { name: 'Report', route: '/report-accounting' },


            

          ];

    const isActive = (route) => url.startsWith(route);

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside
                className={`fixed lg:static w-64 bg-blue-700 text-white flex flex-col transition-transform
                ${
                    sidebarOpen
                        ? 'translate-x-0'
                        : '-translate-x-full lg:translate-x-0'
                }`}
            >
                {/* Logo */}
                <div className="h-16 px-6 flex items-center justify-between border-b border-blue-600">
                    <div>
                        <h1 className="font-bold">LedgerFlow</h1>
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

                {/* Menu */}
                <nav className="flex-1 p-3">
                    {menus.map((item) => (
                        <Link
                            key={item.route}
                            href={item.route}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1
                            ${
                                isActive(item.route)
                                    ? 'bg-white/20'
                                    : 'hover:bg-white/10'
                            }`}
                        >
                            <LayoutDashboard size={18} />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* User */}
                <div className="p-3 border-t border-blue-600">
                    <div className="flex items-center gap-3 mb-3">
                        <User size={18} />
                        <div>
                            <p>{auth.user.name}</p>
                            <p className="text-xs opacity-70">
                                {auth.user.email}
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route('profile.edit')}
                        className="flex items-center gap-2 py-2"
                    >
                        <Settings size={16} />
                        Settings
                    </Link>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex items-center gap-2 py-2 w-full text-left"
                    >
                        <LogOut size={16} />
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Content */}
            <div className="flex-1 flex flex-col">
                <header className="h-16 flex items-center justify-between px-6 border-b bg-white">
                    <div className="flex items-center gap-3">
                        <button
                            className="lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu size={22} />
                        </button>

                        <h2 className="font-semibold">{pageTitle}</h2>
                    </div>

                    <HelpCircle size={20} />
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}