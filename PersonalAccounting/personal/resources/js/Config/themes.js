// Theme configuration with different color schemes
export const themes = {
    default: {
        name: 'Default',
        sidebar: {
            bg: 'from-blue-900 to-blue-800',
            hover: 'hover:bg-blue-700',
            border: 'border-blue-700',
        },
        header: {
            bg: 'bg-blue-600',
            text: 'text-white',
        },
        accent: 'blue',
        button: {
            primary: 'bg-blue-600 hover:bg-blue-700',
            secondary: 'bg-blue-50 text-blue-600 border border-blue-200',
        },
    },
    emerald: {
        name: 'Emerald',
        sidebar: {
            bg: 'from-emerald-900 to-emerald-800',
            hover: 'hover:bg-emerald-700',
            border: 'border-emerald-700',
        },
        header: {
            bg: 'bg-emerald-600',
            text: 'text-white',
        },
        accent: 'emerald',
        button: {
            primary: 'bg-emerald-600 hover:bg-emerald-700',
            secondary: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
        },
    },
    purple: {
        name: 'Purple',
        sidebar: {
            bg: 'from-purple-900 to-purple-800',
            hover: 'hover:bg-purple-700',
            border: 'border-purple-700',
        },
        header: {
            bg: 'bg-purple-600',
            text: 'text-white',
        },
        accent: 'purple',
        button: {
            primary: 'bg-purple-600 hover:bg-purple-700',
            secondary: 'bg-purple-50 text-purple-600 border border-purple-200',
        },
    },
    indigo: {
        name: 'Indigo',
        sidebar: {
            bg: 'from-indigo-900 to-indigo-800',
            hover: 'hover:bg-indigo-700',
            border: 'border-indigo-700',
        },
        header: {
            bg: 'bg-indigo-600',
            text: 'text-white',
        },
        accent: 'indigo',
        button: {
            primary: 'bg-indigo-600 hover:bg-indigo-700',
            secondary: 'bg-indigo-50 text-indigo-600 border border-indigo-200',
        },
    },
    rose: {
        name: 'Rose',
        sidebar: {
            bg: 'from-rose-900 to-rose-800',
            hover: 'hover:bg-rose-700',
            border: 'border-rose-700',
        },
        header: {
            bg: 'bg-rose-600',
            text: 'text-white',
        },
        accent: 'rose',
        button: {
            primary: 'bg-rose-600 hover:bg-rose-700',
            secondary: 'bg-rose-50 text-rose-600 border border-rose-200',
        },
    },
};

export const getTheme = (themeName) => themes[themeName] || themes.default;
