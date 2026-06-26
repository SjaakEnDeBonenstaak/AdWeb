import { useEffect, useState } from "react";
import {
  subscribeToBudgetBooks,
  createBudgetBook,
  setArchivedStatus,
  deleteBudgetBook,
} from "../services/budgetBooksService";

export function useBudgetBooks(userId) {
  const [budgetBooks, setBudgetBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setBudgetBooks([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsubscribe = subscribeToBudgetBooks(userId, (data) => {
      setBudgetBooks(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [userId]);

  async function add({ name, description }) {
    try {
      setError(null);
      await createBudgetBook({ name, description, ownerId: userId });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function archive(id) {
    return setArchivedStatus(id, true);
  }

  async function remove(id) {
    return deleteBudgetBook(id);
  }

  return { budgetBooks, loading, error, add, archive, remove };
}
