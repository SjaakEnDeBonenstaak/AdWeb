import { useAuth } from "../contexts/AuthContext";
import { useHuishoudboekjes } from "../hooks/useHuishoudboekjes";

export default function HuishoudboekjesPage() {
  const { user } = useAuth();
  const { boekjes, loading, toevoegen, archiveren } = useHuishoudboekjes(user?.uid);

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <h1 className="text-2xl font-semibold text-slate-900">Mijn huishoudboekjes</h1>
      {/* TODO (studentenduo): vervang dit door HuishoudboekjeForm /
          HuishoudboekjeLijst components in src/components/huishoudboekjes/ */}
      {loading ? (
        <p className="text-slate-500">Laden...</p>
      ) : (
        <ul className="space-y-2">
          {boekjes.map((b) => (
            <li key={b.id} className="rounded-md border border-slate-200 p-3">
              {b.naam}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
