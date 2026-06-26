import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useBudgetBooks } from "../hooks/useBudgetBooks";

export default function BudgetBooksPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { budgetBooks, loading } = useBudgetBooks(user?.uid);

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Mijn huishoudboekjes</h1>
          {user?.email && <p className="text-sm text-slate-500">{user.email}</p>}
        </div>
        <button type="button" onClick={handleLogout}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          Uitloggen
        </button>
      </header>
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
