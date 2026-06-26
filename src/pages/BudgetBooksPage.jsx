import { useAuth } from "../contexts/AuthContext";
import { useBudgetBooks } from "../hooks/useBudgetBooks";

export default function BudgetBooksPage() {
  const { user } = useAuth();
  const { budgetBooks, loading } = useBudgetBooks(user?.uid);

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <h1 className="text-2xl font-semibold text-slate-900">Mijn huishoudboekjes</h1>
      {/* TODO: Replace this with BudgetBookForm and BudgetBookList components. */}
      {loading ? (
        <p className="text-slate-500">Laden...</p>
      ) : (
        <ul className="space-y-2">
          {budgetBooks.map((budgetBook) => (
            <li key={budgetBook.id} className="rounded-md border border-slate-200 p-3">
              {budgetBook.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
