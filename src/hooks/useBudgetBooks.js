import { useEffect, useState } from "react";
import {
  subscribeToBudgetBooks,
  createBudgetBook,
  updateBudgetBook,
  setArchivedStatus,
  deleteBudgetBook,
} from "../services/budgetBooksService";

function archiveBudgetBook(id) {
  return setArchivedStatus(id, true);
}

function restoreBudgetBook(id) {
  return setArchivedStatus(id, false);
}

export function useBudgetBooks(userId) {
  const [budgetBooks, setBudgetBooks] = useState([]);
  const [archivedBudgetBooks, setArchivedBudgetBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [archivedLoading, setArchivedLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setBudgetBooks([]);
      setArchivedBudgetBooks([]);
      setLoading(false);
      setArchivedLoading(false);
      return;
    }
    setLoading(true);
    setArchivedLoading(true);
    const unsubscribe = subscribeToBudgetBooks(userId, (data) => {
      setBudgetBooks(data);
      setLoading(false);
    });
    const unsubscribeArchived = subscribeToBudgetBooks(
      userId,
      (data) => {
        setArchivedBudgetBooks(data);
        setArchivedLoading(false);
      },
      { archived: true },
    );
    return () => {
      unsubscribe();
      unsubscribeArchived();
    };
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

  async function update(id, { name, description }) {
    try {
      setError(null);
      await updateBudgetBook(id, { name, description });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  return {
    budgetBooks,
    archivedBudgetBooks,
    loading,
    archivedLoading,
    error,
    add,
    update,
    archive: archiveBudgetBook,
    restore: restoreBudgetBook,
    remove: deleteBudgetBook,
  };
}
