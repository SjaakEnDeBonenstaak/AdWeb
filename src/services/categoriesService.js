import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

function catCollection(budgetBookId) {
  return collection(db, "budgetBooks", budgetBookId, "categories");
}

export function subscribeToCategories(budgetBookId, callback) {
  const q = query(catCollection(budgetBookId), orderBy("name", "asc"));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function createCategory(budgetBookId, { name, maxBudget, endDate }) {
  if (!name?.trim()) throw new Error("Naam is verplicht");
  const budget = Number(maxBudget);
  if (isNaN(budget) || budget <= 0) throw new Error("Maximaal budget is verplicht");
  return addDoc(catCollection(budgetBookId), {
    name: name.trim(),
    maxBudget: budget,
    endDate: endDate ?? null,
    createdAt: serverTimestamp(),
  });
}

export async function updateCategory(budgetBookId, id, { name, maxBudget, endDate }) {
  if (!name?.trim()) throw new Error("Naam is verplicht");
  const budget = Number(maxBudget);
  if (isNaN(budget) || budget <= 0) throw new Error("Maximaal budget is verplicht");
  return updateDoc(doc(db, "budgetBooks", budgetBookId, "categories", id), {
    name: name.trim(),
    maxBudget: budget,
    endDate: endDate ?? null,
  });
}

export async function deleteCategory(budgetBookId, id) {
  return deleteDoc(doc(db, "budgetBooks", budgetBookId, "categories", id));
}
