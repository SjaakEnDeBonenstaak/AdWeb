import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TransactionForm from "../../../components/transactions/TransactionForm";

describe("TransactionForm", () => {
  it("submits an expense with the entered values and resets the form", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<TransactionForm categories={[]} error={null} onSubmit={onSubmit} />);

    await user.clear(screen.getByLabelText("Bedrag (€)"));
    await user.type(screen.getByLabelText("Bedrag (€)"), "42.50");
    await user.type(screen.getByLabelText("Omschrijving"), "Supermarkt");
    await user.click(screen.getByRole("button", { name: "Toevoegen" }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "expense",
        amount: 42.5,
        description: "Supermarkt",
      })
    );

    expect(screen.getByLabelText("Bedrag (€)")).toHaveValue(null);
    expect(screen.getByLabelText("Omschrijving")).toHaveValue("");
  });

  it("switches to income type when the Inkomst button is clicked", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<TransactionForm categories={[]} error={null} onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: "Inkomst" }));
    await user.type(screen.getByLabelText("Bedrag (€)"), "1500");
    await user.click(screen.getByRole("button", { name: "Toevoegen" }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ type: "income", amount: 1500 })
    );
  });

  it("shows categories dropdown when categories are provided", () => {
    const categories = [{ id: "cat-1", name: "Eten" }];
    render(<TransactionForm categories={categories} error={null} onSubmit={vi.fn()} />);

    expect(screen.getByLabelText("Categorie")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Eten" })).toBeInTheDocument();
  });

  it("shows an error message", () => {
    render(<TransactionForm categories={[]} error="Bedrag is verplicht" onSubmit={vi.fn()} />);

    expect(screen.getByText("Bedrag is verplicht")).toBeInTheDocument();
  });

  it("calls onCancel when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    render(
      <TransactionForm
        categories={[]}
        error={null}
        onSubmit={vi.fn()}
        onCancel={onCancel}
        initialData={{ type: "expense", amount: 10, description: "", date: "2026-06-27", categoryId: null }}
      />
    );

    await user.click(screen.getByRole("button", { name: "Annuleren" }));

    expect(onCancel).toHaveBeenCalled();
  });
});
