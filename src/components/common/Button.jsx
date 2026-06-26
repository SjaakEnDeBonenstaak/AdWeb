import { Link } from "react-router-dom";

const baseClass =
  "inline-flex cursor-pointer items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary: "bg-(--color-accent) text-(--color-accent-contrast) shadow-lg shadow-(--color-shadow) hover:bg-(--color-accent-strong)",
  secondary: "border border-(--color-border) bg-(--color-surface) text-(--color-text-primary) backdrop-blur hover:bg-(--color-surface-hover)",
  ghost: "text-(--color-accent) hover:text-(--color-text-primary)",
  danger: "border border-(--color-danger-border) bg-(--color-danger-surface) text-(--color-danger) hover:bg-(--color-danger-surface-hover)",
};

function getButtonClass(variant, className) {
  return `${baseClass} ${variants[variant]} ${className}`;
}

export function Button({ children, variant = "secondary", className = "", ...props }) {
  return (
    <button className={getButtonClass(variant, className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({ children, to, variant = "secondary", className = "", ...props }) {
  return (
    <Link to={to} className={getButtonClass(variant, className)} {...props}>
      {children}
    </Link>
  );
}
