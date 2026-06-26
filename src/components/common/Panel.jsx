export default function Panel({ children, className = "" }) {
  return (
    <div className={`rounded-[2rem] border border-(--color-border) bg-(--color-surface) p-5 shadow-2xl shadow-(--color-shadow) backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}
