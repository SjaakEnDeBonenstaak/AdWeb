import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CategoryList from "../../../components/categories/CategoryList";

const categories = [
  { id: "cat-1", name: "Boodschappen", maxBudget: 300, endDate: null },
  { id: "cat-2", name: "Vrije tijd", maxBudget: 100, endDate: null },
];

const transactions = [
  { id: "tx-1", type: "expense", amount: 80, categoryId: "cat-1" },
  { id: "tx-2", type: "expense", amount: 20, categoryId: "cat-1" },
  { id: "tx-3", type: "income", amount: 200, categoryId: "cat-1" },
  { id: "tx-4", type: "expense", amount: 150, categoryId: "cat-2" },
];

function renderList(props = {}) {
  return render(
    <CategoryList
      categories={categories}
      transactions={transactions}
      loading={false}
      error={null}
      onUpdate={vi.fn()}
      onDelete={vi.fn()}
      {...props}
    />
  );
}

describe("CategoryList", () => {
  it("shows a loading state", () => {
    renderList({ loading: true });

    expect(screen.getByText("Laden...")).toBeInTheDocument();
  });

  it("shows the empty state when there are no categories", () => {
    renderList({ categories: [] });

    expect(screen.getByText("Nog geen categorieën aangemaakt.")).toBeInTheDocument();
  });

  it("renders categories with spending based on expense transactions only", () => {
    renderList();

    expect(screen.getByText("Boodschappen")).toBeInTheDocument();
    expect(screen.getByText(/€\s*100,00 van €\s*300,00 uitgegeven/)).toBeInTheDocument();
    expect(screen.getByText("Vrije tijd")).toBeInTheDocument();
    expect(screen.getByText(/€\s*150,00 van €\s*100,00 uitgegeven/)).toBeInTheDocument();
  });
});
