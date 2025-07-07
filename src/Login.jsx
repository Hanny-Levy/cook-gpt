import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "./firebase";

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let userCredential;
            if (isLogin) {
                userCredential = await signInWithEmailAndPassword(auth, email, password);
            } else {
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
            }
            onLogin(userCredential.user);
        } catch (err) {
            alert("שגיאה: " + err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            onLogin(result.user);
        } catch (err) {
            alert("שגיאת התחברות עם גוגל: " + err.message);
        }
    };

    return (
        <div style={{ direction: "rtl", maxWidth: 400, margin: "auto" }}>
            <h2>{isLogin ? "התחברות" : "הרשמה"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="אימייל"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br />
                <input
                    type="password"
                    placeholder="סיסמה"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br />
                <button type="submit">{isLogin ? "התחבר" : "הירשם"}</button>
            </form>
            <button type="button" onClick={handleGoogleLogin}>
                התחבר עם Google
            </button>
            <p>
                {isLogin ? "אין לך חשבון?" : "כבר יש לך חשבון?"} {" "}
                <button type="button" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "הרשמה" : "התחברות"}
                </button>
            </p>
        </div>
    );
}
