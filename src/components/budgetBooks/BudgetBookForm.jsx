import { useState } from "react";

export default function BudgetBookForm({ error, onAddBudgetBook }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onAddBudgetBook({ name, description });
      setName("");
      setDescription("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-md border border-slate-200 p-4">
      <div>
        <label htmlFor="budget-book-name" className="block text-sm font-medium text-slate-700">
          Naam
        </label>
        <input id="budget-book-name" type="text" value={name}
          onChange={(e) => setName(e.target.value)} required
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
      </div>
      <div>
        <label htmlFor="budget-book-description" className="block text-sm font-medium text-slate-700">
          Omschrijving
        </label>
        <textarea id="budget-book-description" value={description}
          onChange={(e) => setDescription(e.target.value)} rows={3}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={submitting}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400">
        {submitting ? "Opslaan..." : "Huishoudboekje toevoegen"}
      </button>
    </form>
  );
}
