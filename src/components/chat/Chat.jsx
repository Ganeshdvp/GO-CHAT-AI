import { useEffect, useRef } from "react";
import appStore from "../../constants/appStore";
import { USER_URL, AI_URL } from "../../constants/constants";
import "./Chat.css";

export const Chat = () => {
  const { loading, resultData } = appStore();
  const chatRef = useRef();

  //auto scroll up
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [resultData]);

  return (
    <>
      <div className="chat-container" ref={chatRef}>
        {resultData?.map((item, index) => {
          const isLastAiMessage =
            item.sender === "ai" && index === resultData.length+1 && loading;
          return (
            <div
              key={index}
              className={`chat-row ${
                item.sender === "user" ? "user-style" : "ai-style"
              }`}
            >
              <div
                className={`chat-bubble ${
                  item.sender === "user" ? "user-bubble" : "ai-bubble"
                }`}
              >
                {item.sender === "ai" ? (
                  <>
                    {isLastAiMessage ? (
                      <span>Loading...</span>
                    ) : (
                      <>
                        <p>{item.text}</p>
                        <img
                          src={item.sender === "ai" && AI_URL}
                          alt="images"
                        />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <p>{item.text}</p>
                    <img
                      src={item.sender === "user" && USER_URL}
                      alt="images"
                    />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
