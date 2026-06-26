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
export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
export async function register(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
export async function logout() {
  return firebaseSignOut(auth);
}
