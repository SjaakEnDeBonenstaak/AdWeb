const fieldClass =
  "mt-2 w-full rounded-3xl border border-(--color-border) bg-(--color-surface-strong) px-4 py-3 text-sm text-(--color-text-primary) outline-none transition placeholder:text-(--color-text-muted) focus:border-(--color-accent) focus:ring-4 focus:ring-cyan-300/10";

export function Field({ id, label, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-(--color-text-secondary)">
        {label}
      </label>
      {children}
    </div>
  );
}

export function TextInput({ className = "", ...props }) {
  return <input className={`${fieldClass} ${className}`} {...props} />;
}

export function TextArea({ className = "", ...props }) {
  return <textarea className={`${fieldClass} resize-none ${className}`} {...props} />;
}
