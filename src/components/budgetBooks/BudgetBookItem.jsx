import { useState } from "react";
import { Button, ButtonLink } from "../common/Button";
import { Field, TextArea, TextInput } from "../common/Field";
import Panel from "../common/Panel";

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
  const panelClass = archived
    ? "border-dashed border-(--color-archived-border) bg-(--color-archived-surface) shadow-none"
    : "shadow-none";

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
      <li>
        <Panel className="shadow-none">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field id={`budget-book-${budgetBook.id}-name`} label="Naam">
              <TextInput id={`budget-book-${budgetBook.id}-name`} type="text" value={name}
              onChange={(e) => setName(e.target.value)} required
              placeholder="Naam" />
            </Field>
            <Field id={`budget-book-${budgetBook.id}-description`} label="Omschrijving">
              <TextArea id={`budget-book-${budgetBook.id}-description`} value={description}
              onChange={(e) => setDescription(e.target.value)} rows={3}
              placeholder="Omschrijving" />
            </Field>
            <div className="flex flex-wrap gap-2">
              <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? "Opslaan..." : "Opslaan"}
              </Button>
              <Button type="button" variant="secondary" onClick={cancelEditing}>
                Annuleren
              </Button>
            </div>
          </form>
        </Panel>
      </li>
    );
  }

  return (
    <li>
      <Panel className={panelClass}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className={`font-semibold ${archived ? "text-(--color-text-secondary)" : "text-(--color-text-primary)"}`}>
                {budgetBook.name}
              </h2>
              {archived && (
                <span className="rounded-full bg-(--color-archived-badge) px-2.5 py-1 text-xs font-semibold text-(--color-text-muted)">
                  Gearchiveerd
                </span>
              )}
            </div>
            {budgetBook.description && (
              <p className="mt-1 text-sm text-(--color-text-muted)">
                {budgetBook.description}
              </p>
            )}
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            {!archived && (
              <ButtonLink to={openPath} variant="secondary">
                Openen
              </ButtonLink>
            )}
            {!archived && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => setEditing(true)}
              >
                Bewerken
              </Button>
            )}
            {archived ? (
              <Button
                type="button"
                variant="secondary"
                onClick={() => onRestoreBudgetBook(budgetBook.id)}
              >
                Herstellen
              </Button>
            ) : (
              <Button
                type="button"
                variant="danger"
                onClick={() => onArchiveBudgetBook(budgetBook.id)}
              >
                Archiveren
              </Button>
            )}
          </div>
        </div>
      </Panel>
    </li>
  );
}
