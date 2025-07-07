import './App.css'
import TestFirebase from "./TestFirebase.jsx";
import Login from "./Login.jsx";
import { useState } from "react";

function App() {
    const [user, setUser] = useState(null);
    const handleLogin = (user) => {
        setUser(user);
        console.log("משתמש התחבר:", user);
    };
  return (
    <>
      <div>
          {!user ? (
              <Login onLogin={handleLogin} />
          ) : (
              <div>ברוכה הבאה, {user.email}!</div>
          )}
      </div>
    </>
  )
}

export default App
