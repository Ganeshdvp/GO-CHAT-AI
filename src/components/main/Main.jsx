import { useEffect, useState } from "react";
import "./Main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faLightbulb,
  faPeopleGroup,
  faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";
import { InputBottom } from "../inputBottom/InputBottom";
import appStore from "../../constants/appStore";
import { Chat } from "../chat/Chat";
import {
  faCircleInfo,
  faClockRotateLeft,
  faCommentDots,
  faGear,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Main = () => {
  const [showForm, setShowForm] = useState("signup");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    setNewChat,
    recentChats,
    deleteRecentChats,
    setActiveChat,
    setShowChatComponent,
    showChatComponent,
  } = appStore();

  const handleNewChat = () => {
    setNewChat();
    setIsMenuOpen(false);
  };

  const handleClick = (id) => {
    setActiveChat(id);
    setShowChatComponent(false);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (recentChats.length === 0) {
      setShowChatComponent(true);
    }
  }, [recentChats]);

  useEffect(()=>{
    const handleResize = ()=>{
      if(window.innerWidth > 600){
        setIsMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);

    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  },[])


  if (showForm === "signup") {
    return (
      <SignUp
        handleClick={() => setShowForm("signin")}
        closeForm={() => setShowForm(null)}
      />
    );
  }

  if (showForm === "signin") {
    return (
      <SignIn
        handleClick={() => setShowForm("signup")}
        closeForm={() => setShowForm(null)}
      />
    );
  }

  return (
    <div className="main">
      <div className="nav">
        <div className="nav-one">
          <FontAwesomeIcon
            icon={faBarsStaggered}
            className="menu-logo"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          <p>GO-CHAT-AI</p>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4113/4113045.png"
          alt="logo"
          onClick={() => setShowForm("signup")}
        />
      </div>

      {isMenuOpen && (
        <div className={`sidebar-mobile ${isMenuOpen ? "open" : ""}`}>
          <div className="sidebar-mobile-top">
            <div className="sidebar-mobile-new-chat" onClick={handleNewChat}>
              <FontAwesomeIcon icon={faPlus} className="sidebar-mobile-plus-icon" />
              <p>New Chat</p>
            </div>
            <div className="sidebar-mobile-recent">
              <p className="sidebar-mobile-recent-tittle">Recent</p>
              {recentChats.length > 0 ? (
                recentChats.map((ele) => {
                  return (
                    <div className="sidebar-mobile-recent-entry" key={ele.id}>
                      <div
                        className="sidebar-mobile-recent-entry2"
                        onClick={() => handleClick(ele.id)}
                      >
                        <FontAwesomeIcon icon={faCommentDots} />
                        <p>{ele.recentChatText?.slice(0, 15)}...</p>
                      </div>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="sidebar-mobile-trash-icon"
                        onClick={() => deleteRecentChats(ele.id)}
                      />
                    </div>
                  );
                })
              ) : (
                <p className="sidebar-mobile-no-recent-chats">No recent chats</p>
              )}
            </div>
          </div>
          <div className="sidebar-mobile-bottom">
            <div className="sidebar-mobile-bottom-item sidebar-mobile-recent-entry-bottom">
              <FontAwesomeIcon icon={faCircleInfo} style={{ color: "white" }} />
              <p>Help</p>
            </div>
            <div className="sidebar-mobile-bottom-item sidebar-mobile-recent-entry-bottom">
              <FontAwesomeIcon
                icon={faClockRotateLeft}
                style={{ color: "white" }}
              />
              <p>Activity</p>
            </div>
            <div className="sidebar-mobile-bottom-item sidebar-mobile-recent-entry-bottom">
              <FontAwesomeIcon icon={faGear} style={{ color: "white" }} />
              <p>Settings</p>
            </div>
          </div>
        </div>
      )}

      <div className="main-container">
        {showChatComponent ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dear.</span>
              </p>
              <p>How can I help you today? </p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip </p>
                <FontAwesomeIcon icon={faCompass} className="card-icons" />
              </div>
              <div className="card">
                <p>Briefly summarized this concept : urban planning </p>
                <FontAwesomeIcon icon={faLightbulb} className="card-icons" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <FontAwesomeIcon icon={faPeopleGroup} className="card-icons" />
              </div>
              <div className="card">
                <p>Improve the readibility of the following code </p>
                <FontAwesomeIcon icon={faCode} className="card-icons" />
              </div>
            </div>
          </>
        ) : (
          <Chat />
        )}
        <br></br>
        <InputBottom />
      </div>
    </div>
  );
};

export default Main;
