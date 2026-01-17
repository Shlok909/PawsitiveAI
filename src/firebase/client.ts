"use client";

import { getFirebaseApp } from "./config";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// Initialize Firebase App
const app = getFirebaseApp();

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// Connect to emulators only in browser and localhost
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  // Uncomment these lines if you want to use Firebase emulators
  // try {
  //   connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
  //   connectFirestoreEmulator(firestore, 'localhost', 8080);
  //   connectStorageEmulator(storage, 'localhost', 9199);
  // } catch (error) {
  //   console.log('Emulator already connected');
  // }
}

export { app, auth, firestore, storage };