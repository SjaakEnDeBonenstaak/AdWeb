import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import BudgetBookItem from "../../../components/budgetBooks/BudgetBookItem";

const budgetBook = {
  id: "book-1",
  name: "Vaste lasten",
  description: "Maandelijkse kosten",
};

function renderItem(props = {}) {
  return render(
    <MemoryRouter>
      <ul>
        <BudgetBookItem
          budgetBook={budgetBook}
          onArchiveBudgetBook={vi.fn()}
          onRestoreBudgetBook={vi.fn()}
          onUpdateBudgetBook={vi.fn()}
          {...props}
        />
      </ul>
    </MemoryRouter>
  );
}

describe("BudgetBookItem", () => {
  it("shows active budget book actions", () => {
    renderItem();

    expect(screen.getByText("Vaste lasten")).toBeInTheDocument();
    expect(screen.getByText("Maandelijkse kosten")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Openen" })).toHaveAttribute("href", "/budget-books/book-1");
    expect(screen.getByRole("button", { name: "Bewerken" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Archiveren" })).toBeInTheDocument();
  });

  it("archives active budget books", async () => {
    const user = userEvent.setup();
    const onArchiveBudgetBook = vi.fn();
    renderItem({ onArchiveBudgetBook });

    await user.click(screen.getByRole("button", { name: "Archiveren" }));

    expect(onArchiveBudgetBook).toHaveBeenCalledWith("book-1");
  });

  it("shows restore action for archived budget books", async () => {
    const user = userEvent.setup();
    const onRestoreBudgetBook = vi.fn();
    renderItem({ archived: true, onRestoreBudgetBook });

    expect(screen.getByText("Gearchiveerd")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Openen" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Herstellen" }));

    expect(onRestoreBudgetBook).toHaveBeenCalledWith("book-1");
  });

  it("updates a budget book from edit mode", async () => {
    const user = userEvent.setup();
    const onUpdateBudgetBook = vi.fn().mockResolvedValue();
    renderItem({ onUpdateBudgetBook });

    await user.click(screen.getByRole("button", { name: "Bewerken" }));
    await user.clear(screen.getByLabelText("Naam"));
    await user.type(screen.getByLabelText("Naam"), "Nieuwe naam");
    await user.click(screen.getByRole("button", { name: "Opslaan" }));

    expect(onUpdateBudgetBook).toHaveBeenCalledWith("book-1", {
      name: "Nieuwe naam",
      description: "Maandelijkse kosten",
    });
  });
});
