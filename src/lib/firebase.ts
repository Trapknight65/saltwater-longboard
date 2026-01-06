import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDDE_axImzjLLaWmpYDMcthGFDzkQCMdyk",
    authDomain: "saltwater-longboard.firebaseapp.com",
    projectId: "saltwater-longboard",
    storageBucket: "saltwater-longboard.firebasestorage.app",
    messagingSenderId: "787403881864",
    appId: "1:787403881864:web:6feb0992c0e097cfba0e3d",
    measurementId: "G-ZS7JNBNP36"
};

// Initialize Firebase
// Check if firebase apps are already initialized to avoid "Firebase: Firebase App named '[DEFAULT]' already exists" error
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let analytics: Analytics | undefined;

// Analytics is only available in the browser environment
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
