import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { Context } from '../../context/Context';

const Sidebar = () => {
    const [extend, setExtend] = useState(false);
    const { onSent, prevPrompt, setRecentPrompt, newChat} = useContext(Context);

    const loadPrompt = async (prompt)=>{
        setRecentPrompt(prompt);
        await onSent(prompt);
    }
    return (
        <div className='sidebar'>
            <div className="top">
                <img onClick={() => {
                    setExtend((prev) => {
                        return !prev
                    })
                }} className='menu' src="https://i.pinimg.com/564x/96/33/0f/96330f95e5f907dd65fec5f6cf6a1faf.jpg" alt="menu" />
                <div onClick={()=>newChat()} className="new-chat">
                    <img src='https://upload.wikimedia.org/wikipedia/commons/9/9e/Plus_symbol.svg' alt="plus" />
                    {extend ? <p>New Chat</p> : null}
                </div>
                {extend ? <div className="recent">
                    <p className="recent-tittle">Recent</p>
                    {
                        prevPrompt.map(
                            (ele, index) => {
                                return (
                                    <div onClick={()=>loadPrompt(ele)} className="recent-entry">
                                        <img className='msg' src="https://upload.wikimedia.org/wikipedia/commons/3/38/Tabler-icons_message-dots.svg" alt="msg" />
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
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/f6/Tabler-icons_help-circle.svg" alt="question" />
                    {extend ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/48/History_%28CoreUI_Icons_v1.0.0%29.svg" alt="history" />
                    {extend ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Tabler-icons_settings-cog.svg" alt="setting" />
                    {extend ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
