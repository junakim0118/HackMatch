import React, { useState } from "react";
import Messages from "./messages";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function Temp() {
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [chatId, setChatId] = useState("");

  const startChat = async () => {
    const chatKey = [email1, email2].sort().join("-");
    const chatDoc = doc(db, "chats", chatKey);

    const chatSnapshot = await getDoc(chatDoc);
    if (!chatSnapshot.exists()) {
      await setDoc(chatDoc, { messages: [] });
    }
    setChatId(chatKey);
  };

  return (
    <div className="app">
      {!chatId ? (
        <div className="login">
          <h2>Start a Chat</h2>
          <input
            type="email"
            placeholder="Your Email"
            value={email1}
            onChange={(e) => setEmail1(e.target.value)}
          />
          <input
            type="email"
            placeholder="Recipient's Email"
            value={email2}
            onChange={(e) => setEmail2(e.target.value)}
          />
          <button onClick={startChat}>Start Chat</button>
        </div>
      ) : (
        <Messages chatId={chatId} email1={email1} />
      )}
    </div>
  );
}

export default Temp;
