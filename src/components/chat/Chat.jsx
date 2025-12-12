import { useEffect, useRef } from "react";
import appStore from "../../constants/appStore";
import { USER_URL, AI_URL } from "../../constants/constants";
import "./Chat.css";

export const Chat = () => {
  const { chats, activeChat } = appStore();
  const chatRef = useRef();

  //auto scroll up
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chats, activeChat]); 

 const activeChatData = chats.find((chat) => chat.id === activeChat);
 console.log(activeChatData);
 
  

  return (
    <>
    <div className="chat-container" ref={chatRef}>
      {activeChatData?.messages?.map((item, index) => (
        <div
          key={`${activeChat}-${index}`}
          className={`chat-row ${
            item.sender === "user" ? "user-style" : "ai-style"
          }`}
        >
          <div
            className={`chat-bubble ${
              item.sender === "user" ? "user-bubble" : "ai-bubble"
            }`}
          >
            <p>{item.text}</p>
            <img
              src={item.sender === "user" ? USER_URL : AI_URL}
              alt="icon"
            />
          </div>
        </div>
      ))}
    </div>
    </>
  );
};
