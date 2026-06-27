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

function txCollection(budgetBookId) {
  return collection(db, "budgetBooks", budgetBookId, "transactions");
}

export function subscribeToTransactions(budgetBookId, callback) {
  const q = query(txCollection(budgetBookId), orderBy("date", "desc"));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function createTransaction(budgetBookId, { type, amount, description, date, categoryId }) {
  const parsed = Number(amount);
  if (isNaN(parsed) || parsed <= 0) throw new Error("Bedrag is verplicht");
  return addDoc(txCollection(budgetBookId), {
    type,
    amount: parsed,
    description: description?.trim() ?? "",
    date,
    categoryId: categoryId ?? null,
    createdAt: serverTimestamp(),
  });
}

export async function updateTransaction(budgetBookId, id, { type, amount, description, date, categoryId }) {
  const parsed = Number(amount);
  if (isNaN(parsed) || parsed <= 0) throw new Error("Bedrag is verplicht");
  return updateDoc(doc(db, "budgetBooks", budgetBookId, "transactions", id), {
    type,
    amount: parsed,
    description: description?.trim() ?? "",
    date,
    categoryId: categoryId ?? null,
  });
}

export async function deleteTransaction(budgetBookId, id) {
  return deleteDoc(doc(db, "budgetBooks", budgetBookId, "transactions", id));
}
