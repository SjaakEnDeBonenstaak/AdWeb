import Panel from "../common/Panel";

function euro(amount) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(amount);
}

export default function TransactionStats({ transactions }) {
  const income = transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const expenses = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const balance = income - expenses;

  return (
    <Panel className="grid grid-cols-3 gap-4 shadow-none">
      <div>
        <p className="text-xs text-(--color-text-muted)">Inkomsten</p>
        <p className="mt-1 text-lg font-semibold text-(--color-accent)">{euro(income)}</p>
      </div>
      <div>
        <p className="text-xs text-(--color-text-muted)">Uitgaven</p>
        <p className="mt-1 text-lg font-semibold text-(--color-danger)">{euro(expenses)}</p>
      </div>
      <div>
        <p className="text-xs text-(--color-text-muted)">Saldo</p>
        <p className={`mt-1 text-lg font-semibold ${balance >= 0 ? "text-(--color-accent)" : "text-(--color-danger)"}`}>
          {euro(balance)}
        </p>
      </div>
    </Panel>
  );
}
