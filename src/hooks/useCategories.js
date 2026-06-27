import { useEffect, useState } from "react";
import {
  createCategory,
  deleteCategory,
  subscribeToCategories,
  updateCategory,
} from "../services/categoriesService";

export function useCategories(budgetBookId) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!budgetBookId) {
      setCategories([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsubscribe = subscribeToCategories(budgetBookId, (data) => {
      setCategories(data);
      setLoading(false);
    });
    return unsubscribe;
  }, [budgetBookId]);

  async function add(data) {
    try {
      setError(null);
      await createCategory(budgetBookId, data);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function update(id, data) {
    try {
      setError(null);
      await updateCategory(budgetBookId, id, data);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function remove(id) {
    try {
      setError(null);
      await deleteCategory(budgetBookId, id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  return { categories, loading, error, add, update, remove };
}
