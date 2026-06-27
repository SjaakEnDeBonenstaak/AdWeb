import { useState } from "react";
import { Button } from "../common/Button";
import Panel from "../common/Panel";
import TransactionForm from "./TransactionForm";

function euro(amount) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(amount);
}

function formatDate(date) {
  if (!date) return "";
  return new Intl.DateTimeFormat("nl-NL", { day: "numeric", month: "short" }).format(new Date(date + "T00:00:00"));
}

export default function TransactionItem({ transaction, categories, error, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);

  async function handleUpdate(data) {
    await onUpdate(transaction.id, data);
    setEditing(false);
  }

  if (editing) {
    return (
      <li>
        <TransactionForm
          initialData={transaction}
          categories={categories}
          error={error}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(false)}
        />
      </li>
    );
  }

  const isIncome = transaction.type === "income";

  return (
    <li>
      <Panel className="shadow-none">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className={`shrink-0 text-base font-semibold ${isIncome ? "text-(--color-accent)" : "text-(--color-danger)"}`}>
              {isIncome ? "+" : "-"}{euro(transaction.amount)}
            </span>
            <div className="min-w-0">
              {transaction.description && (
                <p className="truncate text-sm text-(--color-text-primary)">{transaction.description}</p>
              )}
              <p className="text-xs text-(--color-text-muted)">{formatDate(transaction.date)}</p>
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button type="button" variant="secondary" onClick={() => setEditing(true)}>
              Bewerken
            </Button>
            <Button type="button" variant="danger" onClick={() => onDelete(transaction.id)}>
              Verwijderen
            </Button>
          </div>
        </div>
      </Panel>
    </li>
  );
}
