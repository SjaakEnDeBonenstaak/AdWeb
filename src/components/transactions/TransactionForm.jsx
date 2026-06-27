import { useState } from "react";
import { Button } from "../common/Button";
import { Field, Select, TextInput } from "../common/Field";
import Panel from "../common/Panel";

const today = () => new Date().toISOString().slice(0, 10);

export default function TransactionForm({ categories = [], error, onSubmit, onCancel, initialData }) {
  const [type, setType] = useState(initialData?.type ?? "expense");
  const [amount, setAmount] = useState(initialData?.amount ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [date, setDate] = useState(initialData?.date ?? today());
  const [categoryId, setCategoryId] = useState(initialData?.categoryId ?? "");
  const [submitting, setSubmitting] = useState(false);

  const isEditing = Boolean(initialData);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({ type, amount: Number(amount), description, date, categoryId: categoryId || null });
      if (!isEditing) {
        setType("expense");
        setAmount("");
        setDescription("");
        setDate(today());
        setCategoryId("");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Panel className="shadow-none">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Button
            type="button"
            variant={type === "expense" ? "danger" : "secondary"}
            onClick={() => setType("expense")}
          >
            Uitgave
          </Button>
          <Button
            type="button"
            variant={type === "income" ? "primary" : "secondary"}
            onClick={() => setType("income")}
          >
            Inkomst
          </Button>
        </div>
        <Field id="tx-amount" label="Bedrag (€)">
          <TextInput
            id="tx-amount"
            type="number"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="0,00"
          />
        </Field>
        <Field id="tx-description" label="Omschrijving">
          <TextInput
            id="tx-description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optioneel"
          />
        </Field>
        <Field id="tx-date" label="Datum">
          <TextInput
            id="tx-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Field>
        {categories.length > 0 && (
          <Field id="tx-category" label="Categorie">
            <Select
              id="tx-category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Geen categorie</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </Field>
        )}
        {error && <p className="text-sm text-(--color-danger)">{error}</p>}
        <div className="flex flex-wrap gap-2">
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? "Opslaan..." : isEditing ? "Opslaan" : "Toevoegen"}
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
