import { useEffect, useState } from "react";
import {
  createTransaction,
  deleteTransaction,
  subscribeToTransactions,
  updateTransaction,
} from "../services/transactionsService";

export function useTransactions(budgetBookId) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!budgetBookId) {
      setTransactions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsubscribe = subscribeToTransactions(budgetBookId, (data) => {
      setTransactions(data);
      setLoading(false);
    });
    return unsubscribe;
  }, [budgetBookId]);

  async function add(data) {
    try {
      setError(null);
      await createTransaction(budgetBookId, data);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function update(id, data) {
    try {
      setError(null);
      await updateTransaction(budgetBookId, id, data);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function remove(id) {
    try {
      setError(null);
      await deleteTransaction(budgetBookId, id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  return { transactions, loading, error, add, update, remove };
}
