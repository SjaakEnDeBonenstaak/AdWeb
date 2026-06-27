import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ButtonLink } from "../../components/common/Button";
import Panel from "../../components/common/Panel";
import TransactionForm from "../../components/transactions/TransactionForm";
import TransactionList from "../../components/transactions/TransactionList";
import TransactionStats from "../../components/transactions/TransactionStats";
import { useCategories } from "../../hooks/useCategories";
import { useTransactions } from "../../hooks/useTransactions";
import { subscribeToBudgetBook } from "../../services/budgetBooksService";

function currentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export default function BudgetBookDetailPage() {
  const { id } = useParams();
  const [budgetBook, setBudgetBook] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const { transactions, loading, error, add, update, remove } = useTransactions(id);
  const { categories } = useCategories(id);

  useEffect(() => {
    return subscribeToBudgetBook(id, setBudgetBook);
  }, [id]);

  const filtered = transactions.filter((tx) => tx.date?.startsWith(selectedMonth));

  return (
    <main className="mx-auto max-w-3xl space-y-7 px-4 py-8 sm:px-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-(--color-accent)">Huishoudboekje</p>
          <h1 className="mt-1 text-3xl font-semibold text-(--color-text-primary)">
            {budgetBook?.name ?? "Laden..."}
          </h1>
          {budgetBook?.description && (
            <p className="mt-1 text-sm text-(--color-text-muted)">{budgetBook.description}</p>
          )}
        </div>
        <ButtonLink to="/budget-books" variant="secondary">
          Terug
        </ButtonLink>
      </header>

      <section className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-(--color-text-primary)">Uitgaven en inkomsten</h2>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="rounded-full border border-(--color-border) bg-(--color-surface-strong) px-4 py-2 text-sm text-(--color-text-primary) outline-none focus:border-(--color-accent) focus:ring-4 focus:ring-cyan-300/10"
          />
        </div>

        <TransactionStats transactions={filtered} />

        <TransactionForm categories={categories} error={error} onSubmit={add} />

        <TransactionList
          transactions={filtered}
          categories={categories}
          loading={loading}
          error={error}
          onUpdate={update}
          onDelete={remove}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-(--color-text-primary)">Categorieën</h2>
        <Panel className="border-dashed shadow-none">
          <p className="text-sm text-(--color-text-muted)">Categorieën komen in de volgende stap.</p>
        </Panel>
      </section>
    </main>
  );
}
