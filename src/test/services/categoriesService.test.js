import { beforeEach, describe, expect, it, vi } from "vitest";
import { addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../services/categoriesService";

vi.mock("../../lib/firebase", () => ({ db: {} }));

vi.mock("firebase/firestore", () => ({
  addDoc: vi.fn(),
  collection: vi.fn(() => "catCollection"),
  deleteDoc: vi.fn(),
  doc: vi.fn((_db, ...parts) => parts.join("/")),
  onSnapshot: vi.fn(),
  orderBy: vi.fn(),
  query: vi.fn(),
  serverTimestamp: vi.fn(() => "server timestamp"),
  updateDoc: vi.fn(),
}));

describe("categoriesService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createCategory", () => {
    it("rejects when name is missing", async () => {
      await expect(
        createCategory("book-1", { name: "   ", maxBudget: 300, endDate: null })
      ).rejects.toThrow("Naam is verplicht");

      expect(addDoc).not.toHaveBeenCalled();
    });

    it("rejects when maxBudget is missing", async () => {
      await expect(
        createCategory("book-1", { name: "Eten", maxBudget: "", endDate: null })
      ).rejects.toThrow("Maximaal budget is verplicht");

      expect(addDoc).not.toHaveBeenCalled();
    });

    it("rejects when maxBudget is zero", async () => {
      await expect(
        createCategory("book-1", { name: "Eten", maxBudget: 0, endDate: null })
      ).rejects.toThrow("Maximaal budget is verplicht");

      expect(addDoc).not.toHaveBeenCalled();
    });

    it("creates a category with correct shape", async () => {
      await createCategory("book-1", {
        name: "  Eten  ",
        maxBudget: "300",
        endDate: null,
      });

      expect(addDoc).toHaveBeenCalledWith("catCollection", {
        name: "Eten",
        maxBudget: 300,
        endDate: null,
        createdAt: "server timestamp",
      });
    });

    it("creates a category with an endDate", async () => {
      await createCategory("book-1", {
        name: "Vakantie",
        maxBudget: 1000,
        endDate: "2026-08-31",
      });

      expect(addDoc).toHaveBeenCalledWith("catCollection", {
        name: "Vakantie",
        maxBudget: 1000,
        endDate: "2026-08-31",
        createdAt: "server timestamp",
      });
    });
  });

  describe("updateCategory", () => {
    it("rejects when name is missing", async () => {
      await expect(
        updateCategory("book-1", "cat-1", { name: "", maxBudget: 300, endDate: null })
      ).rejects.toThrow("Naam is verplicht");

      expect(updateDoc).not.toHaveBeenCalled();
    });

    it("rejects when maxBudget is missing", async () => {
      await expect(
        updateCategory("book-1", "cat-1", { name: "Eten", maxBudget: 0, endDate: null })
      ).rejects.toThrow("Maximaal budget is verplicht");

      expect(updateDoc).not.toHaveBeenCalled();
    });

    it("updates a category with correct data", async () => {
      await updateCategory("book-1", "cat-1", {
        name: "Transport",
        maxBudget: 150,
        endDate: null,
      });

      expect(updateDoc).toHaveBeenCalledWith("budgetBooks/book-1/categories/cat-1", {
        name: "Transport",
        maxBudget: 150,
        endDate: null,
      });
    });
  });

  describe("deleteCategory", () => {
    it("deletes a category by id", async () => {
      await deleteCategory("book-1", "cat-1");

      expect(deleteDoc).toHaveBeenCalledWith("budgetBooks/book-1/categories/cat-1");
    });
  });
});
