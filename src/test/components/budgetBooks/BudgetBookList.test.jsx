import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BudgetBookList from "../../../components/budgetBooks/BudgetBookList";

const budgetBooks = [
  { id: "book-1", name: "Vaste lasten", description: "Maandelijkse kosten" },
  { id: "book-2", name: "Vakantie", description: "" },
];

function renderList(props = {}) {
  return render(
    <MemoryRouter>
      <BudgetBookList
        budgetBooks={budgetBooks}
        loading={false}
        emptyMessage="Geen huishoudboekjes"
        onArchiveBudgetBook={vi.fn()}
        onRestoreBudgetBook={vi.fn()}
        onUpdateBudgetBook={vi.fn()}
        {...props}
      />
    </MemoryRouter>
  );
}

describe("BudgetBookList", () => {
  it("shows a loading state", () => {
    renderList({ loading: true });

    expect(screen.getByText("Laden...")).toBeInTheDocument();
  });

  it("shows the empty message when there are no budget books", () => {
    renderList({ budgetBooks: [] });

    expect(screen.getByText("Geen huishoudboekjes")).toBeInTheDocument();
  });

  it("renders all budget books", () => {
    renderList();

    expect(screen.getByText("Vaste lasten")).toBeInTheDocument();
    expect(screen.getByText("Vakantie")).toBeInTheDocument();
  });

  it("passes archived mode to budget book items", () => {
    renderList({ archived: true });

    expect(screen.getAllByText("Gearchiveerd")).toHaveLength(2);
    expect(screen.queryByRole("link", { name: "Openen" })).not.toBeInTheDocument();
  });
});
