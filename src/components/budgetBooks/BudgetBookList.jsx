import BudgetBookItem from "./BudgetBookItem";

export default function BudgetBookList({
  budgetBooks,
  loading,
  archived = false,
  emptyMessage,
  onArchiveBudgetBook,
  onRestoreBudgetBook,
  onUpdateBudgetBook,
}) {
  if (loading) {
    return <p className="text-slate-500">Laden...</p>;
  }

  if (budgetBooks.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-slate-300 p-4 text-sm text-slate-500">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {budgetBooks.map((budgetBook) => (
        <BudgetBookItem key={budgetBook.id}
          budgetBook={budgetBook}
          archived={archived}
          onArchiveBudgetBook={onArchiveBudgetBook}
          onRestoreBudgetBook={onRestoreBudgetBook}
          onUpdateBudgetBook={onUpdateBudgetBook} />
      ))}
    </ul>
  );
}
