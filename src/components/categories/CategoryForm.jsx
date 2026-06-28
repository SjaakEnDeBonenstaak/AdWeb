import { useState } from "react";
import { Button } from "../common/Button";
import { Field, TextInput } from "../common/Field";
import Panel from "../common/Panel";

export default function CategoryForm({ error, onSubmit, onCancel, initialData }) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [maxBudget, setMaxBudget] = useState(initialData?.maxBudget ?? "");
  const [endDate, setEndDate] = useState(initialData?.endDate ?? "");
  const [submitting, setSubmitting] = useState(false);

  const isEditing = Boolean(initialData);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({ name, maxBudget: Number(maxBudget), endDate: endDate || null });
      if (!isEditing) {
        setName("");
        setMaxBudget("");
        setEndDate("");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Panel className="shadow-none">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field id="cat-name" label="Naam">
          <TextInput
            id="cat-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Bijv. Boodschappen"
          />
        </Field>
        <Field id="cat-budget" label="Maximaal budget (€)">
          <TextInput
            id="cat-budget"
            type="number"
            step="0.01"
            min="0.01"
            value={maxBudget}
            onChange={(e) => setMaxBudget(e.target.value)}
            required
            placeholder="0,00"
          />
        </Field>
        <Field id="cat-enddate" label="Einddatum (optioneel)">
          <TextInput
            id="cat-enddate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Field>
        {error && <p className="text-sm text-(--color-danger)">{error}</p>}
        <div className="flex flex-wrap gap-2">
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? "Opslaan..." : isEditing ? "Opslaan" : "Categorie toevoegen"}
          </Button>
          {onCancel && (
            <Button type="button" variant="secondary" onClick={onCancel}>
              Annuleren
            </Button>
          )}
        </div>
      </form>
    </Panel>
  );
}
