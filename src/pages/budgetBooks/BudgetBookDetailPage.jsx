import { useParams } from "react-router-dom";
import { ButtonLink } from "../../components/common/Button";
import Panel from "../../components/common/Panel";

export default function BudgetBookDetailPage() {
  const { id } = useParams();

  return (
    <main className="mx-auto max-w-3xl space-y-7 px-4 py-8 sm:px-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-(--color-accent)">Huishoudboekje</p>
          <h1 className="mt-1 text-3xl font-semibold text-(--color-text-primary)">Huishoudboekje</h1>
          <p className="mt-1 text-sm text-(--color-text-muted)">ID: {id}</p>
        </div>
        <ButtonLink to="/budget-books" variant="secondary">
          Terug
        </ButtonLink>
      </header>

      <Panel className="space-y-2">
        <h2 className="text-lg font-semibold text-(--color-text-primary)">Uitgaven en inkomsten</h2>
        <p className="text-sm text-(--color-text-muted)">Hier komt het overzicht van uitgaven en inkomsten.</p>
      </Panel>

      <Panel className="space-y-2">
        <h2 className="text-lg font-semibold text-(--color-text-primary)">Categorieën</h2>
        <p className="text-sm text-(--color-text-muted)">Hier komt het overzicht van categorieën.</p>
      </Panel>
    </main>
  );
}
