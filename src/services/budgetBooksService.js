import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  query, where, onSnapshot, serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const COLLECTION = "budgetBooks";

export function subscribeToBudgetBooks(userId, callback) {
  const q = query(
    collection(db, COLLECTION),
    where("ownerId", "==", userId),
    where("archived", "==", false)
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

export async function setArchivedStatus(id, archived) {
  return updateDoc(doc(db, COLLECTION, id), { archived });
}

export async function deleteBudgetBook(id) {
  return deleteDoc(doc(db, COLLECTION, id));
}
