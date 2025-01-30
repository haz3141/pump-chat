/**
 * File: /components/Button.tsx
 *
 * Description:
 * - A reusable button component for consistent styling.
 * - Supports gradient buttons using a `gradient` prop.
 * - Works as both a `<button>` and a `<Link>` when `href` is provided.
 */

import Link from "next/link";

type ButtonProps = {
    href?: string; // Optional link destination
    children: React.ReactNode; // Button text or icon
    variant?: "primary" | "secondary" | "outline" | "custom"; // Standard styles
    size?: "sm" | "md" | "lg"; // Button sizes
    className?: string; // Additional custom styles
    onClick?: () => void; // Optional click handler
    disabled?: boolean; // Disabled state
};

export default function Button({
    href,
    children,
    variant = "primary",
    size = "md",
    className = "",
    onClick,
    disabled = false,
}: ButtonProps) {
    // Base button styles
    const baseStyle = `flex items-center justify-center font-semibold transition rounded-lg`;

    // Variant styles (primary, secondary, outline)
    const variantStyles = {
        primary: "bg-green-600 text-white hover:bg-green-700 shadow",
        secondary: "bg-gray-800 text-white hover:bg-gray-700",
        outline: "border border-white text-white hover:bg-white hover:text-black",
        custom: "", // Allows custom styling via `className`
    };

    // Size styles (sm, md, lg)
    const sizeStyles = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    const finalClassName = `${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`;

    if (href) {
        return (
            <Link href={href} className={finalClassName}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={finalClassName} disabled={disabled}>
            {children}
        </button>
    );
}
