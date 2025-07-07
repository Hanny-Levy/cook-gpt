import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCiJXEi99CAhmqfK_bLyqwqZ6MTBGvjFiw",
    authDomain: "cook-gpt-a9999.firebaseapp.com",
    projectId: "cook-gpt-a9999",
    storageBucket: "cook-gpt-a9999.appspot.com",
    messagingSenderId: "969841027423",
    appId: "1:969841027423:web:6f7d302d51547494132eea"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export { db };
export default app;
