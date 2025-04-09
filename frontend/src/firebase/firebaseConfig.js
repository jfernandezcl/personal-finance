import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzYpAu4qq_54-bh07QGDk3x_gdOP87EBw",
  authDomain: "personal-finance-4a883.firebaseapp.com",
  projectId: "personal-finance-4a883",
  storageBucket: "personal-finance-4a883.firebasestorage.app",
  messagingSenderId: "1010982711873",
  appId: "1:1010982711873:web:2c9072e5bc74f35e324cc0",
};

// Inicializa Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Exporta auth y proveedor de Google
export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
