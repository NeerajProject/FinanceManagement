# Dynamic Menu & Theme System

This system allows you to pass dynamic menus and themes from the backend (via Inertia) to frontend pages. Each section can have its own custom menu and color theme.

## Available Themes

The system includes 5 pre-configured themes:
- **default** (Blue) - Primary theme
- **emerald** (Emerald Green) - For accounts/financial sections
- **purple** (Purple) - For customer management
- **indigo** (Indigo) - For vendor management
- **rose** (Rose/Pink) - For reports and analytics

## Usage

### Basic Usage in Pages

```jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const myMenu = [
    { name: 'Dashboard', route: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'Accounts', route: '/accounts', icon: 'Receipt' },
    { name: 'Settings', route: '/settings', icon: 'Settings' },
];

export default function MyPage() {
    return (
        <AuthenticatedLayout
            menu={myMenu}
            theme="emerald"
            pageTitle="My Page Title"
        >
            {/* Your page content */}
        </AuthenticatedLayout>
    );
}
```

## Props

### AuthenticatedLayout Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `menu` | Array | Default menu | Custom menu items array |
| `theme` | String | 'default' | Theme name (default, emerald, purple, indigo, rose) |
| `pageTitle` | String | 'Dashboard' | Page title shown in header |
| `children` | ReactNode | Required | Page content |

## Menu Item Structure

Each menu item should have:
```javascript
{
    name: 'Item Name',           // Display name
    route: '/path/to/page',      // Route URL
    icon: 'IconName',            // Lucide icon name (as string)
}
```

### Available Icon Names
All Lucide React icons are available as strings:
- `LayoutDashboard`
- `Receipt`
- `Users`
- `Truck`
- `FileText`
- `Settings`
- `HelpCircle`
- And any other Lucide icon name

## Backend Integration (Laravel)

To pass menus and theme from your Laravel backend:

```php
// In your Controller
public function dashboard()
{
    return Inertia::render('Dashboard', [
        'menus' => [
            ['name' => 'Dashboard', 'route' => '/dashboard', 'icon' => 'LayoutDashboard'],
            ['name' => 'Accounts', 'route' => '/accounts', 'icon' => 'Receipt'],
        ],
    ]);
}
```

Then in your React page, use it from props:

```jsx
export default function Dashboard() {
    const { menus } = usePage().props;
    
    return (
        <AuthenticatedLayout
            menu={menus}
            theme="default"
        >
            {/* Content */}
        </AuthenticatedLayout>
    );
}
```

## Theme Customization

### Viewing Theme Configuration

Check `resources/js/Config/themes.js` to see all theme configurations.

### Adding a New Theme

```javascript
// In themes.js
export const themes = {
    // ... existing themes
    ocean: {
        name: 'Ocean',
        sidebar: {
            bg: 'from-cyan-900 to-cyan-800',
            hover: 'hover:bg-cyan-700',
            border: 'border-cyan-700',
        },
        header: {
            bg: 'bg-cyan-600',
            text: 'text-white',
        },
        accent: 'cyan',
        button: {
            primary: 'bg-cyan-600 hover:bg-cyan-700',
            secondary: 'bg-cyan-50 text-cyan-600 border border-cyan-200',
        },
    },
};
```

## Examples

### Example 1: Accounts Page
```jsx
const accountMenu = [
    { name: 'Dashboard', route: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'All Accounts', route: '/accounts', icon: 'Wallet' },
    { name: 'Bank Accounts', route: '/accounts/bank', icon: 'Receipt' },
];

export default function Accounts() {
    return (
        <AuthenticatedLayout
            menu={accountMenu}
            theme="emerald"
            pageTitle="Accounts"
        >
            {/* Accounts page content */}
        </AuthenticatedLayout>
    );
}
```

### Example 2: Reports Page
```jsx
const reportMenu = [
    { name: 'Dashboard', route: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'Reports', route: '/reports', icon: 'BarChart3' },
];

export default function Reports() {
    return (
        <AuthenticatedLayout
            menu={reportMenu}
            theme="rose"
            pageTitle="Reports"
        >
            {/* Reports page content */}
        </AuthenticatedLayout>
    );
}
```

## Responsive Design

The layout is fully responsive:
- **Mobile**: Sidebar collapses with hamburger menu
- **Tablet**: Sidebar visible with adjustable width
- **Desktop**: Full layout with sidebar always visible

## Features

✅ Dynamic menu items per page
✅ Theme switching per section
✅ Responsive layout
✅ Icon support (all Lucide icons)
✅ Custom page titles
✅ Smooth transitions
✅ Mobile-friendly navigation
