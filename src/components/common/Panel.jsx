export default function Panel({ children, className = "" }) {
  return (
    <div className={`rounded-4xl border border-(--color-border) bg-(--color-surface) p-5 shadow-2xl backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}
