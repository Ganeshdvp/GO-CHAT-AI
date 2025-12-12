import React, {  useEffect, useState } from 'react'
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleInfo, faClockRotateLeft, faCommentDots, faGear, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import appStore from '../../constants/appStore';


const Sidebar = () => {

    const [extend, setExtend] = useState(false);
    const { recentChats, deleteRecentChat, setShowResult, setNewChat, setActiveChat} = appStore();
    
    


    const newChatSideBar = () => {
        setShowResult(false);
        setNewChat()
    };


    const handleDelete = (index)=>{
        deleteRecentChat(index)
    }

    useEffect(()=>{
        if(recentChats.length <= 0){
            setShowResult(false)
        }
    },[recentChats])


    return (
        <div className='sidebar'>
            <div className="top">
                <FontAwesomeIcon icon={faBars} onClick={() => {
                    setExtend((prev) => {
                        return !prev
                    })
                }} className='menu'/>
                <div onClick={newChatSideBar} className="new-chat">
                    <FontAwesomeIcon icon={faPlus} className='plus-icon'/>
                    {extend ? <p>New Chat</p> : null}
                </div>
                {extend ? <div className="recent">
                    <p className="recent-tittle">Recent</p>
                    {
                        recentChats.map(
                            (ele, index) => {
                                return (
                                    <div className="recent-entry" key={ele.id} onClick={()=> {setActiveChat(ele.id); setShowResult(true)}}>
                                       <div className='recent-entry2'>
                                         <FontAwesomeIcon icon={faCommentDots}/>
                                        <p>{ele.text?.slice(0,18)}...</p>
                                       </div>
                                        <FontAwesomeIcon icon={faTrash} className='trash-icon' onClick={()=> handleDelete(ele.id, index)}/>
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
