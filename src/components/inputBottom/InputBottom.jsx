import "./InputBottom.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faMicrophone,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { GoogleGenAI } from "@google/genai";
import { useState } from "react";
import appStore from "../../constants/appStore";


export const InputBottom = () => {

  const [inputValue, setInputValue] = useState("");
  const {appendMessageToChat, setLoading, setShowChatComponent, addMessage, activeChat, setRecentChats} = appStore();


  // The client gets the API key from the environment variable `GEMINI_API_KEY`.
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_API_KEY,
  });

  const geminiChatFetch = async (value) => {
     try {
    const stream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: value,
    });
    for await (const chunk of stream) {
      const text = chunk?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        setLoading(false);
        appendLetters(activeChat, text, 1);
      }
    }
    // wait for all typing to finish
    await typingQueue;
    } catch (err) {
     console.log(err);
    appendLetters(activeChat, "\n⚠️ Error generating response");
    setLoading(false);
    }
  };

  const onSent = () => {
    if(!inputValue) return;
    if(!inputValue.trim()) return;

    // Show Chat Component
    setShowChatComponent(false);
    // Loading
    setLoading(true)
    // send message
    addMessage(activeChat, {sender: 'user', content: inputValue})
    //setting recent chat
    setRecentChats({id: activeChat, recentChatText: inputValue})

    // EMPTY AI MESSAGE (important)
  addMessage(activeChat, { sender: "ai", content: "" });

    // fetching
    geminiChatFetch(inputValue)

   // clearing input
   setInputValue("")
  };


  let typingQueue = Promise.resolve();
  const appendLetters = (chatId, text, delay = 8) => {
  typingQueue = typingQueue.then(async () => {
    for (let char of text) {
      appendMessageToChat(chatId, char);
      await new Promise((res) => setTimeout(res, delay));
    }
  });
  return typingQueue;
};

  

  return (
    <>
      <div className="main-bottom">
        <div className="search-box">
          <input
            value={inputValue}
            onChange={(e)=> setInputValue(e.target.value)}
            type="text"
            placeholder="Enter a prompt here.."
            onKeyDown={(e) => {
              if (e.key === "Enter") onSent();
            }}
          />
          <div>
            <FontAwesomeIcon icon={faImage} className="gallery" />
            <FontAwesomeIcon icon={faMicrophone} className="mic" />
              <FontAwesomeIcon
                icon={faPaperPlane}
                onClick={() => onSent()}
                className="send"
              />
          </div>
        </div>
        <p className="bottom-info">
          GO-CHAT-AI may display inaccurate info, including about people, so
          double-check its responses. Your privacy and Gemini Apps.
        </p>
      </div>
    </>
  );
};
