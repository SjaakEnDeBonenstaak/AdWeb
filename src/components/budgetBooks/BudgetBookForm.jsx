import { useState } from "react";
import { Button } from "../common/Button";
import { Field, TextArea, TextInput } from "../common/Field";
import Panel from "../common/Panel";

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
    <Panel>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field id="budget-book-name" label="Naam">
          <TextInput id="budget-book-name" type="text" value={name}
          onChange={(e) => setName(e.target.value)} required
          placeholder="Bijvoorbeeld vaste lasten" />
        </Field>
        <Field id="budget-book-description" label="Omschrijving">
          <TextArea id="budget-book-description" value={description}
          onChange={(e) => setDescription(e.target.value)} rows={3}
          placeholder="Waar gebruik je dit huishoudboekje voor?" />
        </Field>
        {error && <p className="text-sm text-(--color-danger)">{error}</p>}
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? "Opslaan..." : "Huishoudboekje toevoegen"}
        </Button>
      </form>
    </Panel>
  );
}
