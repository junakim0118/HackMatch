import React, { useEffect, useState } from "react";
import Messages from "./messages";
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./temp.css";
import {Link} from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

// Function to get user data
async function getData(collectionName, document, field) {
  const docRef = doc(db, collectionName, document);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? String(docSnap.data()[field]) : "Unknown User";
}

function Temp() {
  const [chatId, setChatId] = useState("");
  const [recipient, setRecipient] = useState("");
  const [chats, setChats] = useState([]);
  const [matches, setMatches] = useState([]);
  const [chatNames, setChatNames] = useState({});
  const [matchNames, setMatchNames] = useState({});
  const [email, setEmail] = useState(""); // Email state from Firebase Auth
  const auth = getAuth();

  useEffect(() => {
    // Check if user is logged in and set email
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email); // Set email from Firebase Auth
      } else {
        alert("You must be logged in to view your chats.");
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [auth]);

  useEffect(() => {
    if (!email) return;

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

    const fetchMatches = async () => {
      const userRef = doc(db, "Users", email);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userMatches = userData.matches || [];
        const existingChatEmails = chats.map((chat) =>
          chat.id.split("-").find((participant) => participant !== email)
        );

        // Exclude matches already in chats
        const filteredMatches = userMatches.filter(
          (match) => !existingChatEmails.includes(match)
        );

        setMatches(filteredMatches); // Set filtered matches
      }
    };

    fetchChats().then(fetchMatches); // Ensure chats are fetched before filtering matches
  }, [email, chats]);

  useEffect(() => {
    const fetchNames = async () => {
      const names = {};
      const matchNameMap = {};

      // Fetch names for all chats concurrently
      await Promise.all(
        chats.map(async (chat) => {
          const participants = chat.id.split("-");
          const otherEmail = participants.find((participant) => participant !== email);

          if (otherEmail) {
            try {
              const firstName = await getData("Users", otherEmail, "firstName");
              const lastName = await getData("Users", otherEmail, "lastName");
              names[chat.id] = `${firstName} ${lastName}`;
            } catch (error) {
              console.error("Error fetching user data:", error);
              names[chat.id] = "Unknown User";
            }
          }
        })
      );

      // Fetch names for matches concurrently
      await Promise.all(
        matches.map(async (matchEmail) => {
          try {
            const firstName = await getData("Users", matchEmail, "firstName");
            const lastName = await getData("Users", matchEmail, "lastName");
            matchNameMap[matchEmail] = `${firstName} ${lastName}`;
          } catch (error) {
            console.error("Error fetching user data for match:", error);
            matchNameMap[matchEmail] = "Unknown User";
          }
        })
      );

      setChatNames(names);
      setMatchNames(matchNameMap);
    };

    if (chats.length > 0 || matches.length > 0) {
      fetchNames();
    }
  }, [chats, matches, email]);

  const handleChatSelect = (chatId) => {
    setChatId(chatId);

    // Extract participants from chat ID
    const participants = chatId.split("-");
    const otherEmail = participants.find((participant) => participant !== email);

    // Set recipient to the other email
    setRecipient(otherEmail);
  };

  const handleMatchSelect = async (matchEmail) => {
    const newChatId = [email, matchEmail].sort().join("-"); // Generate chat ID based on emails

    // Check if the chat already exists, if not create a new chat
    const chatRef = doc(db, "chats", newChatId);
    const chatSnap = await getDoc(chatRef);

    if (!chatSnap.exists()) {
      await setDoc(chatRef, { messages: [] }); // Initialize chat document
    }

    handleChatSelect(newChatId); // Open the chat
  };

  return (
    <div className="app">
      {!chatId ? (
        <div className="chat-list">
          <h2>C H A T S</h2>
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

          <h2>Your Matches</h2>
          {matches.length > 0 ? (
            matches.map((matchEmail) => (
              <div
                key={matchEmail}
                className="match-item"
                onClick={() => handleMatchSelect(matchEmail)}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  border: "1px solid #ddd",
                  margin: "5px 0",
                }}
              >
                {matchNames[matchEmail] || "Loading..."}
              </div>
            ))
          ) : (
            <p>No matches found.</p>
          )}
        </div>
      ) : (
        <Messages chatId={chatId} email1={recipient} />
      )}
       <footer className='menus'>
        <div className='menu'><Link to='/home' ><IoHome className='menuIcon'/></Link></div>
        <div className='menu'><Link to='/temp'><BiSolidMessageSquareDetail className='menuIcon'/></Link></div>
        <div className='menu'><Link to='/AccountSettings'><CgProfile className='menuIcon'/></Link></div>
      </footer>
    </div>
  );
}

export default Temp;