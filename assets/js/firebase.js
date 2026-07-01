// ══════════════════════════════════════════════════════════════
//  🔥 FIREBASE INITIALIZATION — Murthujavali Portfolio
//  Project: Portfolio (portfolio-4cde5)
//  SDK: Firebase v12 Modular (loaded from CDN as ES modules)
//  Firestore Collection: reviews
//
//  ⚠️ IMPORTANT: appId and measurementId below are placeholders.
//  Get the real values from:
//  Firebase Console → Project Settings → General → Your apps → Web app (Portfolio)
//  Firestore will still work fine even before you paste the real
//  appId, but Analytics (measurementId) needs the real one.
// ══════════════════════════════════════════════════════════════

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBteB0YTx8TvI_WnJY97kfhthvB3e8C6fE",
  authDomain: "portfolio-4cde5.firebaseapp.com",
  projectId: "portfolio-4cde5",
  storageBucket: "portfolio-4cde5.firebasestorage.app",
  messagingSenderId: "364217370442",
  appId: "1:364217370442:web:bb7850714bf96e1f4163b3",
  measurementId: "G-J2JYC707ET"
};

// Initialize Firebase only once
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Expose only what the rest of the site (classic script) needs.
// This lets index.html's non-module <script> use Firestore without
// itself becoming a module (keeps all existing inline onclick=""
// handlers working exactly as before).
window.__fb = {
  db,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
};

// Let the classic script know Firebase is ready (belt-and-braces —
// in practice module scripts finish before DOMContentLoaded anyway).
window.dispatchEvent(new Event("firebase-ready"));
