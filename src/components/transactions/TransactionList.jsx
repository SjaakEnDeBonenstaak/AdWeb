import Panel from "../common/Panel";
import TransactionItem from "./TransactionItem";

export default function TransactionList({ transactions, categories, loading, error, onUpdate, onDelete }) {
  if (loading) {
    return <p className="text-(--color-text-muted)">Laden...</p>;
  }

  if (transactions.length === 0) {
    return (
      <Panel className="border-dashed shadow-none">
        <p className="text-sm text-(--color-text-muted)">Geen transacties voor deze maand.</p>
      </Panel>
    );
  }

  return (
    <ul className="space-y-2">
      {transactions.map((tx) => (
        <TransactionItem
          key={tx.id}
          transaction={tx}
          categories={categories}
          error={error}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
