import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  query, where, onSnapshot, serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const COLLECTION = "huishoudboekjes";

export function subscribeToHuishoudboekjes(userId, callback) {
  const q = query(
    collection(db, COLLECTION),
    where("ownerId", "==", userId),
    where("gearchiveerd", "==", false)
  );
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function maakHuishoudboekje({ naam, omschrijving, ownerId }) {
  if (!naam?.trim()) throw new Error("Naam is verplicht");
  return addDoc(collection(db, COLLECTION), {
    naam: naam.trim(),
    omschrijving: omschrijving?.trim() ?? "",
    ownerId,
    gearchiveerd: false,
    aangemaaktOp: serverTimestamp(),
  });
}

export async function setArchiveerStatus(id, gearchiveerd) {
  return updateDoc(doc(db, COLLECTION, id), { gearchiveerd });
}

export async function verwijderHuishoudboekje(id) {
  return deleteDoc(doc(db, COLLECTION, id));
}
