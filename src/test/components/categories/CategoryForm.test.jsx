import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import CategoryForm from "../../../components/categories/CategoryForm";

describe("CategoryForm", () => {
  it("verstuurt naam en budget en reset het formulier", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<CategoryForm error={null} onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Naam"), "Boodschappen");
    await user.type(screen.getByLabelText("Maximaal budget (€)"), "300");
    await user.click(screen.getByRole("button", { name: "Categorie toevoegen" }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Boodschappen",
      maxBudget: 300,
      endDate: null,
    });
    expect(screen.getByLabelText("Naam")).toHaveValue("");
    expect(screen.getByLabelText("Maximaal budget (€)")).toHaveValue(null);
  });

  it("verstuurt ook een einddatum als die is ingevuld", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<CategoryForm error={null} onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Naam"), "Vakantie");
    await user.type(screen.getByLabelText("Maximaal budget (€)"), "1000");
    await user.type(screen.getByLabelText("Einddatum (optioneel)"), "2026-08-31");
    await user.click(screen.getByRole("button", { name: "Categorie toevoegen" }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Vakantie",
      maxBudget: 1000,
      endDate: "2026-08-31",
    });
  });

  it("toont een foutmelding", () => {
    render(<CategoryForm error="Naam is verplicht" onSubmit={vi.fn()} />);
    expect(screen.getByText("Naam is verplicht")).toBeInTheDocument();
  });

  it("toont annuleerknop en roept onCancel aan", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    render(
      <CategoryForm
        error={null}
        onSubmit={vi.fn()}
        onCancel={onCancel}
        initialData={{ name: "Test", maxBudget: 100, endDate: null }}
      />
    );

    await user.click(screen.getByRole("button", { name: "Annuleren" }));
    expect(onCancel).toHaveBeenCalled();
  });
});
