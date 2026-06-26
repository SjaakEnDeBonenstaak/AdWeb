export default function BudgetBookList({ budgetBooks, loading }) {
  if (loading) {
    return <p className="text-slate-500">Laden...</p>;
  }

  if (budgetBooks.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-slate-300 p-4 text-sm text-slate-500">
        Je hebt nog geen huishoudboekjes.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {budgetBooks.map((budgetBook) => (
        <li key={budgetBook.id} className="rounded-md border border-slate-200 p-3">
          <h2 className="font-medium text-slate-900">{budgetBook.name}</h2>
          {budgetBook.description && (
            <p className="mt-1 text-sm text-slate-500">{budgetBook.description}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
