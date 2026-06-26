import { useNavigate } from "react-router-dom";
import BudgetBookForm from "../components/budgetBooks/BudgetBookForm";
import BudgetBookList from "../components/budgetBooks/BudgetBookList";
import { useAuth } from "../contexts/AuthContext";
import { useBudgetBooks } from "../hooks/useBudgetBooks";

export default function BudgetBooksPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const {
    budgetBooks,
    archivedBudgetBooks,
    loading,
    archivedLoading,
    error,
    add,
    update,
    archive,
    restore,
  } = useBudgetBooks(user?.uid);

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

      <BudgetBookForm error={error} onAddBudgetBook={add} />

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Actieve huishoudboekjes</h2>
        <BudgetBookList budgetBooks={budgetBooks}
          loading={loading}
          emptyMessage="Je hebt nog geen huishoudboekjes."
          onArchiveBudgetBook={archive}
          onUpdateBudgetBook={update} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Gearchiveerde huishoudboekjes</h2>
        <BudgetBookList budgetBooks={archivedBudgetBooks}
          loading={archivedLoading}
          archived
          emptyMessage="Je hebt geen gearchiveerde huishoudboekjes."
          onRestoreBudgetBook={restore}
          onUpdateBudgetBook={update} />
      </section>
    </div>
  );
}
