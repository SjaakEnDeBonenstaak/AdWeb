import { beforeEach, describe, expect, it, vi } from "vitest";
import { addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import {
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "../../services/transactionsService";

vi.mock("../../lib/firebase", () => ({ db: {} }));

vi.mock("firebase/firestore", () => ({
  addDoc: vi.fn(),
  collection: vi.fn(() => "txCollection"),
  deleteDoc: vi.fn(),
  doc: vi.fn((_db, ...parts) => parts.join("/")),
  onSnapshot: vi.fn(),
  orderBy: vi.fn(),
  query: vi.fn(),
  serverTimestamp: vi.fn(() => "server timestamp"),
  updateDoc: vi.fn(),
}));

describe("transactionsService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createTransaction", () => {
    it("rejects when amount is missing", async () => {
      await expect(
        createTransaction("book-1", { type: "expense", amount: "", description: "", date: "2026-06-27", categoryId: null })
      ).rejects.toThrow("Bedrag is verplicht");

      expect(addDoc).not.toHaveBeenCalled();
    });

    it("rejects when amount is zero", async () => {
      await expect(
        createTransaction("book-1", { type: "expense", amount: 0, description: "", date: "2026-06-27", categoryId: null })
      ).rejects.toThrow("Bedrag is verplicht");

      expect(addDoc).not.toHaveBeenCalled();
    });

    it("creates a transaction with correct shape", async () => {
      await createTransaction("book-1", {
        type: "expense",
        amount: "25.50",
        description: "  Boodschappen  ",
        date: "2026-06-27",
        categoryId: null,
      });

      expect(addDoc).toHaveBeenCalledWith("txCollection", {
        type: "expense",
        amount: 25.5,
        description: "Boodschappen",
        date: "2026-06-27",
        categoryId: null,
        createdAt: "server timestamp",
      });
    });

    it("creates an income transaction", async () => {
      await createTransaction("book-1", {
        type: "income",
        amount: 1500,
        description: "Salaris",
        date: "2026-06-01",
        categoryId: "cat-1",
      });

      expect(addDoc).toHaveBeenCalledWith("txCollection", {
        type: "income",
        amount: 1500,
        description: "Salaris",
        date: "2026-06-01",
        categoryId: "cat-1",
        createdAt: "server timestamp",
      });
    });
  });

  describe("updateTransaction", () => {
    it("rejects when amount is missing", async () => {
      await expect(
        updateTransaction("book-1", "tx-1", { type: "expense", amount: "", description: "", date: "2026-06-27", categoryId: null })
      ).rejects.toThrow("Bedrag is verplicht");

      expect(updateDoc).not.toHaveBeenCalled();
    });

    it("updates a transaction with correct data", async () => {
      await updateTransaction("book-1", "tx-1", {
        type: "income",
        amount: 200,
        description: "Freelance",
        date: "2026-06-15",
        categoryId: null,
      });

      expect(updateDoc).toHaveBeenCalledWith("budgetBooks/book-1/transactions/tx-1", {
        type: "income",
        amount: 200,
        description: "Freelance",
        date: "2026-06-15",
        categoryId: null,
      });
    });
  });

  describe("deleteTransaction", () => {
    it("deletes a transaction by id", async () => {
      await deleteTransaction("book-1", "tx-1");

      expect(deleteDoc).toHaveBeenCalledWith("budgetBooks/book-1/transactions/tx-1");
    });
  });
});
