import { useEffect, useState } from "react";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleInfo,
  faClockRotateLeft,
  faCommentDots,
  faGear,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import appStore from "../../constants/appStore";

const Sidebar = () => {
  const [extend, setExtend] = useState(false);

  const {
    setNewChat,
    recentChats,
    deleteRecentChats,
    setActiveChat,
    setShowChatComponent
  } = appStore();

  const handleNewChat = () => {
    setNewChat();
  };

  const handleClick = (id) => {
    setActiveChat(id);
    setShowChatComponent(false)
  };

  useEffect(()=>{
    if(recentChats.length ===0){
      setShowChatComponent(true)
    }
  },[recentChats])



  return (
    <div className="sidebar">
      <div className="top">
        <FontAwesomeIcon
          icon={faBars}
          onClick={() => {
            setExtend((prev) => {
              return !prev;
            });
          }}
          className="menu"
        />
        <div className="new-chat" onClick={handleNewChat}>
          <FontAwesomeIcon icon={faPlus} className="plus-icon" />
          {extend ? <p>New Chat</p> : null}
        </div>
        {extend ? (
          <div className="recent">
            <p className="recent-tittle">Recent</p>
            {recentChats.length > 0 ? (
              recentChats.map((ele) => {
                return (
                  <div
                    className="recent-entry"
                    key={ele.id}
                  >
                    <div className="recent-entry2" onClick={() => handleClick(ele.id)}>
                      <FontAwesomeIcon icon={faCommentDots} />
                      <p>{ele.recentChatText?.slice(0, 15)}...</p>
                    </div>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="trash-icon"
                      onClick={() => deleteRecentChats(ele.id)}
                    />
                  </div>
                );
              })
            ) : (
              <p className="no-recent-chats">No recent chats</p>
            )}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry-bottom">
          <FontAwesomeIcon icon={faCircleInfo} style={{ color: "white" }} />
          {extend ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry-bottom">
          <FontAwesomeIcon
            icon={faClockRotateLeft}
            style={{ color: "white" }}
          />
          {extend ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry-bottom">
          <FontAwesomeIcon icon={faGear} style={{ color: "white" }} />
          {extend ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
