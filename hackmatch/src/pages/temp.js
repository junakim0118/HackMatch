import React, { useEffect, useState } from "react";
import Messages from "./messages";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

// Function to get user data
async function getData(collectionName, document, field) {
  const docref = doc(db, collectionName, document);
  const docsnap = await getDoc(docref);
  return docsnap.exists() ? String(docsnap.data()[field]) : "Unknown User";
}

function Temp() {
  const [chatId, setChatId] = useState("");
  const [recipient, setRecipient] = useState("");
  const [chats, setChats] = useState([]);
  const [chatNames, setChatNames] = useState({});
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) {
      alert("You must be logged in to view your chats.");
      return;
    }

    // Fetch chats involving the current user's email
    const fetchChats = async () => {
      const chatsRef = collection(db, "chats");
      const querySnapshot = await getDocs(chatsRef);

      const chatList = [];

      // Check each chat for the user's email
      querySnapshot.forEach((doc) => {
        const chatKey = doc.id; // e.g., "email1-email2"
        const participants = chatKey.split("-");

        if (participants.includes(email)) {
          chatList.push({ id: chatKey });
        }
      });

      setChats(chatList);
    };

    fetchChats();
  }, [email]);

  useEffect(() => {
    const fetchNames = async () => {
      const names = {};

      // Fetch names for all chats concurrently
      await Promise.all(
        chats.map(async (chat) => {
          const participants = chat.id.split("-");
          const otherEmail = participants.find((participant) => participant !== email);

          if (otherEmail) {
            try {
              const firstname = await getData("Users", otherEmail, "firstName");
              const lastName = await getData("Users", otherEmail, "lastName");
              names[chat.id] = `${firstname} ${lastName}`; // Store name using chat ID as key
            } catch (error) {
              console.error("Error fetching user data:", error);
              names[chat.id] = "Unknown User"; // Fallback if fetching data fails
            }
          }
        })
      );

      setChatNames(names);
    };

    if (chats.length > 0) {
      fetchNames();
    }
  }, [chats, email]);

  const handleChatSelect = (chatId) => {
    setChatId(chatId);

    // Extract participants from chat ID
    const participants = chatId.split("-");
    const otherEmail = participants.find((participant) => participant !== email);

    // Set recipient to the other email
    setRecipient(otherEmail);
  };

  return (
    <div className="app">
      {!chatId ? (
        <div className="chat-list">
          <h2>Your Chats</h2>
          {chats.length > 0 ? (
            chats.map((chat) => (
              <div
                key={chat.id}
                className="chat-item"
                onClick={() => handleChatSelect(chat.id)}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  border: "1px solid #ddd",
                  margin: "5px 0",
                }}
              >
                {chatNames[chat.id] || "Loading..."}
              </div>
            ))
          ) : (
            <p>No chats found.</p>
          )}
        </div>
      ) : (
        <Messages chatId={chatId} email1={recipient} />
      )}
    </div>
  );
}

export default Temp;
