import { useNavigate } from "react-router-dom";
import BudgetBookForm from "../../components/budgetBooks/BudgetBookForm";
import BudgetBookList from "../../components/budgetBooks/BudgetBookList";
import { Button } from "../../components/common/Button";
import { useAuth } from "../../contexts/AuthContext";
import { useBudgetBooks } from "../../hooks/useBudgetBooks";

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
    <main className="mx-auto max-w-3xl space-y-7 px-4 py-8 sm:px-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-(--color-accent)">Huishoudboekje</p>
          <h1 className="mt-1 text-3xl font-semibold text-(--color-text-primary)">Mijn huishoudboekjes</h1>
          {user?.email && <p className="mt-1 text-sm text-(--color-text-muted)">{user.email}</p>}
        </div>
        <Button type="button" variant="secondary" onClick={handleLogout}>
          Uitloggen
        </Button>
      </header>

      <BudgetBookForm error={error} onAddBudgetBook={add} />

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-(--color-text-primary)">Actieve huishoudboekjes</h2>
        <BudgetBookList budgetBooks={budgetBooks}
          loading={loading}
          emptyMessage="Je hebt nog geen huishoudboekjes."
          onArchiveBudgetBook={archive}
          onUpdateBudgetBook={update} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-(--color-text-primary)">Gearchiveerde huishoudboekjes</h2>
        <BudgetBookList budgetBooks={archivedBudgetBooks}
          loading={archivedLoading}
          archived
          emptyMessage="Je hebt geen gearchiveerde huishoudboekjes."
          onRestoreBudgetBook={restore}
          onUpdateBudgetBook={update} />
      </section>
    </main>
  );
}
