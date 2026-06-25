import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../lib/firebase";

export function subscribeToAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}
export async function login(email, wachtwoord) {
  return signInWithEmailAndPassword(auth, email, wachtwoord);
}
export async function registreer(email, wachtwoord) {
  return createUserWithEmailAndPassword(auth, email, wachtwoord);
}
export async function uitloggen() {
  return firebaseSignOut(auth);
}
