import BudgetBookItem from "./BudgetBookItem";
import Panel from "../common/Panel";

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
    return <p className="text-(--color-text-muted)">Laden...</p>;
  }

  if (budgetBooks.length === 0) {
    return (
      <Panel className="border-dashed shadow-none">
        <p className="text-sm text-(--color-text-muted)">
        {emptyMessage}
        </p>
      </Panel>
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
