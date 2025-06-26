import React, {  useState } from 'react'
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleInfo, faClockRotateLeft, faCommentDots, faGear, faPlus } from '@fortawesome/free-solid-svg-icons';

// Dummy data and handlers to replace context
const DUMMY_PREV_PROMPT = [
    "What is Gemini?",
    "Show me a cat picture",
    "Explain quantum computing",
    "Suggest a movie"
];

const Sidebar = () => {
    const [extend, setExtend] = useState(false);
    const [prevPrompt, setPrevPrompt] = useState(DUMMY_PREV_PROMPT);
    

      // Dummy handlers
    const onSent = async (prompt) => {
        alert(`Pretend to send: ${prompt}`);
    };
    const setRecentPrompt = (prompt) => {
        // No-op for dummy
    };
    const newChat = () => {
        alert("Start a new chat (dummy)");
    };

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };
    return (
        <div className='sidebar'>
            <div className="top">
                <FontAwesomeIcon icon={faBars} onClick={() => {
                    setExtend((prev) => {
                        return !prev
                    })
                }} className='menu'/>
                <div onClick={newChat} className="new-chat">
                    <FontAwesomeIcon icon={faPlus} className='plus-icon'/>
                    {extend ? <p>New Chat</p> : null}
                </div>
                {extend ? <div className="recent">
                    <p className="recent-tittle">Recent</p>
                    {
                        prevPrompt.map(
                            (ele, index) => {
                                return (
                                    <div onClick={()=>loadPrompt(ele)} className="recent-entry">
                                        <FontAwesomeIcon icon={faCommentDots}/>
                                        <p>{ele.slice(0,18)}...</p>
                                    </div>

                                )
                            }
                        )
                    }
                </div> : null}

            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <FontAwesomeIcon icon={faCircleInfo} style={{color:'white'}}/>
                    {extend ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <FontAwesomeIcon icon={faClockRotateLeft} style={{color:'white'}}/>
                    {extend ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <FontAwesomeIcon icon={faGear} style={{color:'white'}}/>
                    {extend ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
