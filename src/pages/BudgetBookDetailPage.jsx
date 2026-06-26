import { Link, useParams } from "react-router-dom";

export default function BudgetBookDetailPage() {
  const { id } = useParams();

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <Link to="/budget-books" className="text-sm font-medium text-blue-700 hover:text-blue-800">
        Terug naar huishoudboekjes
      </Link>

      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Huishoudboekje</h1>
        <p className="mt-1 text-sm text-slate-500">ID: {id}</p>
      </header>

      <section className="space-y-2 rounded-md border border-slate-200 p-4">
        <h2 className="text-lg font-semibold text-slate-900">Uitgaven en inkomsten</h2>
        <p className="text-sm text-slate-500">
          Hier komt het overzicht van uitgaven en inkomsten.
        </p>
      </section>

      <section className="space-y-2 rounded-md border border-slate-200 p-4">
        <h2 className="text-lg font-semibold text-slate-900">Categorieën</h2>
        <p className="text-sm text-slate-500">
          Hier komt het overzicht van categorieën.
        </p>
      </section>
    </div>
  );
}
