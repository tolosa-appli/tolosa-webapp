// Server-side Firebase Admin initialization for Firestore
// Note: Requires `firebase-admin` to be installed in your project.
// This file only runs on the server (never import in the client).

import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

function initFirebaseAdmin() {
  if (getApps().length) {
    return getApp();
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Missing Firebase Admin environment variables. Please set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY.'
    );
  }

  // Handle escaped newlines in the private key (common in env files)
  privateKey = privateKey.replace(/\\n/g, '\n');

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    // databaseURL is optional, uncomment if needed
    // databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

export const adminApp = initFirebaseAdmin();
export const db = getFirestore(adminApp);

