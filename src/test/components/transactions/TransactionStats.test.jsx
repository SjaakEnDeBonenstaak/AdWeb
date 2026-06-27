import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TransactionStats from "../../../components/transactions/TransactionStats";

const transactions = [
  { id: "1", type: "income", amount: 1500, date: "2026-06-01" },
  { id: "2", type: "income", amount: 200, date: "2026-06-10" },
  { id: "3", type: "expense", amount: 300, date: "2026-06-15" },
  { id: "4", type: "expense", amount: 50, date: "2026-06-20" },
];

describe("TransactionStats", () => {
  it("shows the correct income total", () => {
    render(<TransactionStats transactions={transactions} />);
    expect(screen.getByText(/1\.700/)).toBeInTheDocument();
  });

  it("shows the correct expense total", () => {
    render(<TransactionStats transactions={transactions} />);
    const section = screen.getByText("Uitgaven").closest("div");
    expect(section).toHaveTextContent("350");
  });

  it("shows the correct balance", () => {
    render(<TransactionStats transactions={transactions} />);
    expect(screen.getByText(/1\.350/)).toBeInTheDocument();
  });

  it("shows zero stats when there are no transactions", () => {
    render(<TransactionStats transactions={[]} />);
    const zeros = screen.getAllByText(/0,00/);
    expect(zeros.length).toBe(3);
  });
});
