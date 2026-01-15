"use client";

import { getFirebaseApp } from "./config";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const app = getFirebaseApp();
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  // connectAuthEmulator(auth, 'http://localhost:9099');
  // connectFirestoreEmulator(firestore, 'localhost', 8080);
  // connectStorageEmulator(storage, 'localhost', 9199);
}

export { app, auth, firestore, storage };