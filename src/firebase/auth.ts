"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth, firestore, storage } from "./client";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import type { SignUpFormValues, SignInFormValues } from "@/types/auth";


export async function signUp(
  data: SignUpFormValues
): Promise<User> {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  const user = userCredential.user;

  // For now, just update the profile with the name.
  // We can add photo uploads and Firestore writes back in later when needed.
  await updateProfile(user, {
    displayName: data.name,
  });

  return user;
}


export async function signIn(
  data: SignInFormValues
): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  return userCredential.user;
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}
