import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TransactionItem from "../../../components/transactions/TransactionItem";

const expense = {
  id: "tx-1",
  type: "expense",
  amount: 25.5,
  description: "Boodschappen",
  date: "2026-06-28",
  categoryId: null,
};

function renderItem(props = {}) {
  return render(
    <ul>
      <TransactionItem
        transaction={expense}
        categories={[]}
        error={null}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
        {...props}
      />
    </ul>
  );
}

describe("TransactionItem", () => {
  it("shows expense details", () => {
    renderItem();

    expect(screen.getByText(/-€\s*25,50/)).toBeInTheDocument();
    expect(screen.getByText("Boodschappen")).toBeInTheDocument();
    expect(screen.getByText("28 jun")).toBeInTheDocument();
  });

  it("shows income with a plus sign", () => {
    renderItem({
      transaction: {
        ...expense,
        type: "income",
        amount: 100,
        description: "Salaris",
      },
    });

    expect(screen.getByText(/\+€\s*100,00/)).toBeInTheDocument();
    expect(screen.getByText("Salaris")).toBeInTheDocument();
  });

  it("deletes a transaction", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    renderItem({ onDelete });

    await user.click(screen.getByRole("button", { name: "Verwijderen" }));

    expect(onDelete).toHaveBeenCalledWith("tx-1");
  });

  it("updates a transaction from edit mode", async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn().mockResolvedValue();
    renderItem({ onUpdate });

    await user.click(screen.getByRole("button", { name: "Bewerken" }));
    await user.clear(screen.getByLabelText("Bedrag (€)"));
    await user.type(screen.getByLabelText("Bedrag (€)"), "30");
    await user.click(screen.getByRole("button", { name: "Opslaan" }));

    expect(onUpdate).toHaveBeenCalledWith("tx-1", {
      type: "expense",
      amount: 30,
      description: "Boodschappen",
      date: "2026-06-28",
      categoryId: null,
    });
  });
});
