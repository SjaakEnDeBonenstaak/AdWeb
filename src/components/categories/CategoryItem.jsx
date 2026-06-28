import { useState } from "react";
import { Button } from "../common/Button";
import Panel from "../common/Panel";
import CategoryForm from "./CategoryForm";

function euro(amount) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(amount);
}

function budgetStatus(spent, maxBudget) {
  const pct = maxBudget > 0 ? spent / maxBudget : 0;
  if (pct > 1) return "over";
  if (pct >= 0.8) return "bijna";
  return "normaal";
}

const statusStyles = {
  normaal: {
    bar: "bg-(--color-accent)",
    text: "text-(--color-accent)",
    badge: null,
  },
  bijna: {
    bar: "bg-(--color-warning)",
    text: "text-(--color-warning)",
    badge: "Bijna op",
  },
  over: {
    bar: "bg-(--color-danger)",
    text: "text-(--color-danger)",
    badge: "Over budget",
  },
};

export default function CategoryItem({ category, spent, error, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);

  const remaining = category.maxBudget - spent;
  const pct = category.maxBudget > 0 ? Math.min((spent / category.maxBudget) * 100, 100) : 0;
  const status = budgetStatus(spent, category.maxBudget);
  const styles = statusStyles[status];

  async function handleUpdate(data) {
    await onUpdate(category.id, data);
    setEditing(false);
  }

  if (editing) {
    return (
      <li>
        <CategoryForm
          initialData={category}
          error={error}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(false)}
        />
      </li>
    );
  }

  return (
    <li>
      <Panel className="shadow-none space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-(--color-text-primary)">{category.name}</h3>
              {styles.badge && (
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles.text} bg-(--color-surface)`}>
                  {styles.badge}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-sm text-(--color-text-muted)">
              {euro(spent)} van {euro(category.maxBudget)} uitgegeven
            </p>
            <p className={`text-sm font-semibold ${styles.text}`}>
              {remaining >= 0 ? `${euro(remaining)} over` : `${euro(Math.abs(remaining))} te veel`}
            </p>
            {category.endDate && (
              <p className="mt-1 text-xs text-(--color-text-muted)">
                Einddatum: {new Intl.DateTimeFormat("nl-NL").format(new Date(category.endDate + "T00:00:00"))}
              </p>
            )}
          </div>
          <div className="flex shrink-0 gap-2">
            <Button type="button" variant="secondary" onClick={() => setEditing(true)}>
              Bewerken
            </Button>
            <Button type="button" variant="danger" onClick={() => onDelete(category.id)}>
              Verwijderen
            </Button>
          </div>
        </div>

        <div className="h-1.5 w-full rounded-full bg-(--color-surface)">
          <div
            className={`h-1.5 rounded-full transition-all ${styles.bar}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </Panel>
    </li>
  );
}
