// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkSmM_RucJFTywh7ezo6Kk_soQNQ3BQJQ",
    authDomain: "netflix-clone-1817a.firebaseapp.com",
    projectId: "netflix-clone-1817a",
    storageBucket: "netflix-clone-1817a.firebasestorage.app",
    messagingSenderId: "984115148033",
    appId: "1:984115148033:web:d235d2760b561091565700"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
export default app;