
import { useEffect, useRef } from "react";
import appStore from "../../constants/appStore";
import { USER_URL, AI_URL } from "../../constants/constants";
import "./Chat.css";

export const Chat = () => {

    const loading = appStore(store=> store.loading)
    const activeChat = appStore(store=> store.activeChat)
    const chats = appStore(store=> store.chats)
    const chatContainer = useRef();
    

    const activeChatObject = chats.find((chat)=> chat.id === activeChat);

    useEffect(()=>{
      if(chatContainer.current){
        chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
      }
    },[chats])
    
    
  return (
    <>
    <div className="chat-container" ref={chatContainer}>
      {activeChatObject?.messages?.map((item, index) => (
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
            <p>{item.content}</p>
            <img
              src={item.sender === "user" ? USER_URL : AI_URL}
              alt="icon"
            />
          </div>
        </div>
      ))}
        {/* Loader */}
        {
          loading && (
            <div className="loader">
  <hr />
  <hr />
  <hr />
</div>
          )
        }
    </div>
    </>
  );
};
