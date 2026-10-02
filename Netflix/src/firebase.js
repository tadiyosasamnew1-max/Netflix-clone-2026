import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Keep your own values here (copy them from the Firebase console).
const firebaseConfig = {
    apiKey: "AIzaSyDkSmM_RucJFTywh7ezo6Kk_soQNQ3BQJQ",
    authDomain: "netflix-clone-1817a.firebaseapp.com",
    projectId: "netflix-clone-1817a",
    storageBucket: "netflix-clone-1817a.firebasestorage.app",
    messagingSenderId: "984115148033",
    appId: "1:984115148033:web:d235d2760b561091565700"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // NEW

export { auth, db }; // NEW: db exported
export default app;