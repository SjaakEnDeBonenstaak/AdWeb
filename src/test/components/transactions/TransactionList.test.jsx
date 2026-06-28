import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TransactionList from "../../../components/transactions/TransactionList";

const transactions = [
  {
    id: "tx-1",
    type: "expense",
    amount: 25.5,
    description: "Boodschappen",
    date: "2026-06-28",
    categoryId: null,
  },
  {
    id: "tx-2",
    type: "income",
    amount: 100,
    description: "Salaris",
    date: "2026-06-27",
    categoryId: null,
  },
];

function renderList(props = {}) {
  return render(
    <TransactionList
      transactions={transactions}
      categories={[]}
      loading={false}
      error={null}
      onUpdate={vi.fn()}
      onDelete={vi.fn()}
      {...props}
    />
  );
}

describe("TransactionList", () => {
  it("shows a loading state", () => {
    renderList({ loading: true });

    expect(screen.getByText("Laden...")).toBeInTheDocument();
  });

  it("shows the empty state when there are no transactions", () => {
    renderList({ transactions: [] });

    expect(screen.getByText("Geen transacties voor deze maand.")).toBeInTheDocument();
  });

  it("renders all transactions", () => {
    renderList();

    expect(screen.getByText("Boodschappen")).toBeInTheDocument();
    expect(screen.getByText("Salaris")).toBeInTheDocument();
  });
});
