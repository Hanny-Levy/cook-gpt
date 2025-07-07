import { useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

function TestFirebase() {
    useEffect(() => {
        const sendTestDoc = async () => {
            await addDoc(collection(db, "testCollection"), {
                test: "working"
            });
            console.log("נשמר בהצלחה!");
        };

        sendTestDoc();
    }, []);

    return <div>בודקת חיבור לפיירבייס...</div>;
}

export default TestFirebase;
