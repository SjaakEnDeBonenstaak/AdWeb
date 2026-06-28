import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  query, where, onSnapshot, serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const COLLECTION = "budgetBooks";

export function subscribeToBudgetBooks(userId, callback, { archived = false } = {}) {
  const q = query(
    collection(db, COLLECTION),
    where("ownerId", "==", userId),
    where("archived", "==", archived)
  );
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function createBudgetBook({ name, description, ownerId }) {
  if (!name?.trim()) throw new Error("Naam is verplicht");
  return addDoc(collection(db, COLLECTION), {
    name: name.trim(),
    description: description?.trim() ?? "",
    ownerId,
    archived: false,
    createdAt: serverTimestamp(),
  });
}

export async function updateBudgetBook(id, { name, description }) {
  if (!name?.trim()) throw new Error("Naam is verplicht");
  return updateDoc(doc(db, COLLECTION, id), {
    name: name.trim(),
    description: description?.trim() ?? "",
  });
}

export async function setArchivedStatus(id, archived) {
  return updateDoc(doc(db, COLLECTION, id), { archived });
}

export async function deleteBudgetBook(id) {
  return deleteDoc(doc(db, COLLECTION, id));
}

export function subscribeToBudgetBook(id, callback) {
  return onSnapshot(doc(db, COLLECTION, id), (snapshot) => {
    callback(snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null);
  });
}
