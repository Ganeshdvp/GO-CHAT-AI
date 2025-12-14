import { useState } from "react";
import "./Main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faLightbulb,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";
import { InputBottom } from "../inputBottom/InputBottom";
import appStore from "../../constants/appStore";
import { Chat } from "../chat/Chat";

const Main = () => {
  const [showForm, setShowForm] = useState("signup");

  const { showChatComponent } = appStore();

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
        <p>GO-CHAT-AI</p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4113/4113045.png"
          alt="logo"
          onClick={() => setShowForm("signup")}
        />
      </div>

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
