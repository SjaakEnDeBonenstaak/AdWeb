import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CategoryItem from "../../../components/categories/CategoryItem";

const category = { id: "cat-1", name: "Boodschappen", maxBudget: 300, endDate: null };

describe("CategoryItem", () => {
  it("toont naam en resterend budget", () => {
    render(<CategoryItem category={category} spent={100} error={null} onUpdate={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText("Boodschappen")).toBeInTheDocument();
    expect(screen.getByText(/200/)).toBeInTheDocument();
  });

  it("toont 'Bijna op' badge bij meer dan 80% verbruik", () => {
    render(<CategoryItem category={category} spent={250} error={null} onUpdate={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText("Bijna op")).toBeInTheDocument();
  });

  it("toont 'Over budget' badge bij overschrijding", () => {
    render(<CategoryItem category={category} spent={350} error={null} onUpdate={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText("Over budget")).toBeInTheDocument();
  });

  it("toont geen badge bij normaal verbruik", () => {
    render(<CategoryItem category={category} spent={50} error={null} onUpdate={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.queryByText("Bijna op")).not.toBeInTheDocument();
    expect(screen.queryByText("Over budget")).not.toBeInTheDocument();
  });
});
