export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    onClick,
    ...props
}) {
    const baseStyles = 'font-medium rounded-lg transition inline-flex items-center justify-center gap-2';

    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
        secondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 disabled:bg-gray-100',
        outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50 disabled:opacity-50',
        danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300',
        success: 'bg-green-600 text-white hover:bg-green-700 disabled:bg-green-300',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}
