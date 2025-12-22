import { useEffect, useRef } from "react";
import appStore from "../../constants/appStore";
import { USER_URL, AI_URL } from "../../constants/constants";
import "./Chat.css";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

export const Chat = () => {
  const loading = appStore((store) => store.loading);
  const activeChat = appStore((store) => store.activeChat);
  const chats = appStore((store) => store.chats);
  const chatContainer = useRef();

  const activeChatObject = chats.find((chat) => chat.id === activeChat);

  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
  }, [chats, activeChat]);


  useEffect(() => {
  const timeout = setTimeout(() => {
    Prism.highlightAll();
  }, 100);

  return () => clearTimeout(timeout);
}, [activeChatObject?.messages.length]);


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
              <div className="reset-tw div">
                <Markdown remarkPlugins={[remarkGfm]}>{item.content}</Markdown>
              </div>
              <img
                src={item.sender === "user" ? USER_URL : AI_URL}
                alt="icon"
              />
            </div>
          </div>
        ))}
        {/* Loader */}
        {loading && (
          <div className="loader">
            <hr />
            <hr />
            <hr />
          </div>
        )}
      </div>
    </>
  );
};
