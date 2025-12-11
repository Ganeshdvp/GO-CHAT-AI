import "./InputBottom.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faMicrophone,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import appStore from "../../constants/appStore";
import { GoogleGenAI } from "@google/genai";
import { useRef } from "react";

export const InputBottom = () => {

  // zustand store
  const { setLoading, setShowResult, setRecentPrompt, setResultData } = appStore();

  const inputRef = useRef();

  // The client gets the API key from the environment variable `GEMINI_API_KEY`.
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_API_KEY,
  });

  const geminiChatFetch = async (check) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: check,
      });
      setLoading(false);
      setResultData({sender:'ai', text: response.text});
    } catch (err) {
      console.log(err);
       setResultData({sender:'ai', text: JSON.stringify(err.name)});
        setLoading(false);
    }
  };

  const onSent = () => {
    const check = inputRef.current.value;
    if (!check.trim()) return;
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(check);
    setResultData({sender:'user', text: check})

    // API call
    geminiChatFetch(check);

    // clear input
    inputRef.current.value = "";
  };
  
  

  return (
    <>
      <div className="main-bottom">
        <div className="search-box">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter a prompt here.."
            onKeyDown={(e) => {
              if (e.key === "Enter") onSent();
            }}
          />
          <div>
            <FontAwesomeIcon icon={faImage} className="gallery" />
            <FontAwesomeIcon icon={faMicrophone} className="mic" />
            {inputRef ? (
              <FontAwesomeIcon
                icon={faPaperPlane}
                onClick={() => onSent()}
                className="send"
              />
            ) : null}
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
