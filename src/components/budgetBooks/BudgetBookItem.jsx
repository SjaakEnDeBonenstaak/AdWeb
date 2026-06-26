import { useState } from "react";
import { Link } from "react-router-dom";

const secondaryButtonClass =
  "inline-flex items-center rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50";

export default function BudgetBookItem({
  budgetBook,
  archived = false,
  onArchiveBudgetBook,
  onRestoreBudgetBook,
  onUpdateBudgetBook,
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(budgetBook.name);
  const [description, setDescription] = useState(budgetBook.description ?? "");
  const [submitting, setSubmitting] = useState(false);
  const openPath = `/budget-books/${budgetBook.id}`;

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onUpdateBudgetBook(budgetBook.id, { name, description });
      setEditing(false);
    } finally {
      setSubmitting(false);
    }
  }

  function cancelEditing() {
    setName(budgetBook.name);
    setDescription(budgetBook.description ?? "");
    setEditing(false);
  }

  if (editing) {
    return (
      <li className="rounded-md border border-slate-200 p-3">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor={`budget-book-${budgetBook.id}-name`}
              className="block text-sm font-medium text-slate-700">
              Naam
            </label>
            <input id={`budget-book-${budgetBook.id}-name`} type="text" value={name}
              onChange={(e) => setName(e.target.value)} required
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label htmlFor={`budget-book-${budgetBook.id}-description`}
              className="block text-sm font-medium text-slate-700">
              Omschrijving
            </label>
            <textarea id={`budget-book-${budgetBook.id}-description`} value={description}
              onChange={(e) => setDescription(e.target.value)} rows={3}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={submitting}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400">
              {submitting ? "Opslaan..." : "Opslaan"}
            </button>
            <button type="button" onClick={cancelEditing}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Annuleren
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="rounded-md border border-slate-200 p-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-medium text-slate-900">{budgetBook.name}</h2>
          {budgetBook.description && (
            <p className="mt-1 text-sm text-slate-500">{budgetBook.description}</p>
          )}
        </div>
        <div className="flex shrink-0 gap-2">
          {!archived && (
            <Link to={openPath} className={secondaryButtonClass}>
              Openen
            </Link>
          )}
          {!archived && (
            <button type="button" onClick={() => setEditing(true)} className={secondaryButtonClass}>
              Bewerken
            </button>
          )}
          {archived ? (
            <button type="button" onClick={() => onRestoreBudgetBook(budgetBook.id)} className={secondaryButtonClass}>
              Herstellen
            </button>
          ) : (
            <button type="button" onClick={() => onArchiveBudgetBook(budgetBook.id)} className={secondaryButtonClass}>
              Archiveren
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
