import { beforeEach, describe, expect, it, vi } from "vitest";
import { addDoc, updateDoc } from "firebase/firestore";
import { createBudgetBook, updateBudgetBook } from "./budgetBooksService";

vi.mock("../lib/firebase", () => ({
  db: {},
}));

vi.mock("firebase/firestore", () => ({
  addDoc: vi.fn(),
  collection: vi.fn(() => "budgetBooksCollection"),
  deleteDoc: vi.fn(),
  doc: vi.fn((db, collectionName, id) => `${collectionName}/${id}`),
  onSnapshot: vi.fn(),
  query: vi.fn(),
  serverTimestamp: vi.fn(() => "server timestamp"),
  updateDoc: vi.fn(),
  where: vi.fn(),
}));

describe("budgetBooksService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects creating a budget book without a name", async () => {
    await expect(
      createBudgetBook({ name: "   ", description: "Ignored", ownerId: "user-1" })
    ).rejects.toThrow("Naam is verplicht");

    expect(addDoc).not.toHaveBeenCalled();
  });

  it("creates a budget book with trimmed values", async () => {
    await createBudgetBook({
      name: "  Vaste lasten  ",
      description: "  Huur en energie  ",
      ownerId: "user-1",
    });

    expect(addDoc).toHaveBeenCalledWith("budgetBooksCollection", {
      name: "Vaste lasten",
      description: "Huur en energie",
      ownerId: "user-1",
      archived: false,
      createdAt: "server timestamp",
    });
  });

  it("rejects updating a budget book without a name", async () => {
    await expect(
      updateBudgetBook("book-1", { name: "", description: "Ignored" })
    ).rejects.toThrow("Naam is verplicht");

    expect(updateDoc).not.toHaveBeenCalled();
  });
});
