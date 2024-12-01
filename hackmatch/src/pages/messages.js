import './messages.css';
import React, { useState, useEffect } from "react";
import {
  collection,
  doc,
  updateDoc,
  onSnapshot,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase";

function Messages({ chatId, email1 }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const chatDoc = doc(db, "chats", chatId);

    const unsubscribe = onSnapshot(chatDoc, (doc) => {
      setMessages(doc.data().messages || []);
    });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    const chatDoc = doc(db, "chats", chatId);
    await updateDoc(chatDoc, {
      messages: arrayUnion({
        text: newMessage,
        sender: email1,
        timestamp: new Date().toISOString(),
      }),
    });

    setNewMessage("");
  };

  return (
    <div className="chat">
      <div className="messages">
        {messages
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
          .map((msg, idx) => (
            <fieldset
              key={idx}
              className={msg.sender === email1 ? "messagesent" : "messagereceived"}
            >
              {msg.text}
            </fieldset>
          ))}
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="Message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className='send' onClick={sendMessage}>&gt;</button>
      </div>
    </div>
  );
}

export default Messages;
