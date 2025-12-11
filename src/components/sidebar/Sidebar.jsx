import React, {  useState } from 'react'
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleInfo, faClockRotateLeft, faCommentDots, faGear, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import appStore from '../../constants/appStore';


const Sidebar = () => {

    const [extend, setExtend] = useState(false);
    const { recentPrompt, deleteRecentPrompt, setShowResult} = appStore();
    
    console.log(recentPrompt);
    


    const newChat = () => {
        setShowResult(false)
    };


    const handleDelete = (index)=>{
        deleteRecentPrompt(index)
    }


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
                        recentPrompt.map(
                            (ele, index) => {
                                return (
                                    <div className="recent-entry" key={index}>
                                        <FontAwesomeIcon icon={faCommentDots}/>
                                        <p>{ele.slice(0,18)}...</p>
                                        <FontAwesomeIcon icon={faTrash} onClick={()=> handleDelete(index)}/>
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
