import './index.css'
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth, provider } from "./firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = isLogin
                ? await signInWithEmailAndPassword(auth, email, password)
                : await createUserWithEmailAndPassword(auth, email, password);

            onLogin(userCredential.user);
        } catch (err) {
            setError("אירעה שגיאה: " + translateError(err.code));
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            onLogin(result.user);
        } catch (err) {
            setError("שגיאת התחברות עם גוגל: " + translateError(err.code));
        }
    };

    const translateError = (code) => {
        switch (code) {
            case "auth/user-not-found":
                return "המשתמש לא נמצא";
            case "auth/wrong-password":
                return "סיסמה שגויה";
            case "auth/email-already-in-use":
                return "כתובת האימייל כבר רשומה";
            case "auth/invalid-email":
                return "אימייל לא תקין";
            case "auth/weak-password":
                return "הסיסמה חלשה מדי (לפחות 6 תווים)";
            default:
                return code;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4" dir="rtl">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">
                        {isLogin ? "התחברות" : "הרשמה ל־Cook GPT"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="email"
                            placeholder="אימייל"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="סיסמה"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button type="submit" className="w-full">
                            {isLogin ? "התחבר" : "הירשם"}
                        </Button>
                        <Button variant="outline" onClick={handleGoogleLogin} className="w-full">
                            התחברות עם Google
                        </Button>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <div className="text-center text-sm mt-2">
                            {isLogin ? "אין לך חשבון?" : "כבר יש לך חשבון?"}{" "}
                            <Button
                                type="button"
                                variant="link"
                                className="p-0 h-auto text-blue-600"
                                onClick={() => setIsLogin(!isLogin)}
                            >
                                {isLogin ? "להרשמה" : "להתחברות"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
