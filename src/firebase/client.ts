"use client";

import { getFirebaseApp } from "./config";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// Lazy initialization to avoid errors during build
let app: any;
let auth: any;
let firestore: any;
let storage: any;

// Initialize only when in browser
if (typeof window !== 'undefined') {
  app = getFirebaseApp();
  auth = getAuth(app);
  firestore = getFirestore(app);
  storage = getStorage(app);

  // Connect to emulators only in localhost
  if (window.location.hostname === 'localhost') {
    // Uncomment these lines if you want to use Firebase emulators
    // try {
    //   connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    //   connectFirestoreEmulator(firestore, 'localhost', 8080);
    //   connectStorageEmulator(storage, 'localhost', 9199);
    // } catch (error) {
    //   console.log('Emulator already connected');
    // }
  }
}

export { app, auth, firestore, storage };