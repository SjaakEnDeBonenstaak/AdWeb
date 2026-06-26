import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import BudgetBookForm from "./BudgetBookForm";

describe("BudgetBookForm", () => {
  it("submits the entered name and description, then clears the form", async () => {
    const user = userEvent.setup();
    const addBudgetBook = vi.fn().mockResolvedValue(undefined);

    render(<BudgetBookForm error={null} onAddBudgetBook={addBudgetBook} />);

    const nameInput = screen.getByLabelText("Naam");
    const descriptionInput = screen.getByLabelText("Omschrijving");

    await user.type(nameInput, "Vakantie");
    await user.type(descriptionInput, "Zomerreis");
    await user.click(screen.getByRole("button", { name: "Huishoudboekje toevoegen" }));

    expect(addBudgetBook).toHaveBeenCalledWith({
      name: "Vakantie",
      description: "Zomerreis",
    });
    expect(nameInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
  });

  it("shows a service error message", () => {
    render(<BudgetBookForm error="Naam is verplicht" onAddBudgetBook={vi.fn()} />);

    expect(screen.getByText("Naam is verplicht")).toBeInTheDocument();
  });
});
