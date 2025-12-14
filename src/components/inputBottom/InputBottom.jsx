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
  const { setLoading, setShowChatComponent, addMessage, activeChat, setRecentChats} = appStore();


  // The client gets the API key from the environment variable `GEMINI_API_KEY`.
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_API_KEY,
  });

  const geminiChatFetch = async (value) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: value,
      });
      setLoading(false);
      addMessage(activeChat, {sender:'ai', content: response.text});
    } catch (err) {
      console.log(err);
       addMessage(activeChat, {sender:'ai', content: JSON.stringify(err.name)});
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

    // fetching
    geminiChatFetch(inputValue)

   // clearing input
   setInputValue("")
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
