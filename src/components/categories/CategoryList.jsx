import Panel from "../common/Panel";
import CategoryItem from "./CategoryItem";

export default function CategoryList({ categories, transactions, loading, error, onUpdate, onDelete }) {
  if (loading) {
    return <p className="text-(--color-text-muted)">Laden...</p>;
  }

  if (categories.length === 0) {
    return (
      <Panel className="border-dashed shadow-none">
        <p className="text-sm text-(--color-text-muted)">Nog geen categorieën aangemaakt.</p>
      </Panel>
    );
  }

  function spentForCategory(categoryId) {
    return transactions
      .filter((tx) => tx.categoryId === categoryId && tx.type === "expense")
      .reduce((sum, tx) => sum + tx.amount, 0);
  }

  return (
    <ul className="space-y-2">
      {categories.map((cat) => (
        <CategoryItem
          key={cat.id}
          category={cat}
          spent={spentForCategory(cat.id)}
          error={error}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
