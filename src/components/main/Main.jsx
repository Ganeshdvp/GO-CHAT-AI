import React, { useState } from 'react'
import './Main.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCode, faEye, faImage, faLightbulb, faMicrophone, faPaperPlane, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { faCompass } from '@fortawesome/free-regular-svg-icons';


// Dummy data and handlers to replace context
const DUMMY_RESULT = "This is a sample Gemini response because Gemini Ai asking money so...";

const Main = () => {

  const [input, setInput] = useState('');
  const [recentPrompt, setRecentPrompt] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState('');


   const onSent = () => {
    if (!input.trim()) return;
    setRecentPrompt(input);
    setShowResult(true);
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResultData(DUMMY_RESULT);
      setLoading(false);
    }, 1200);
    setInput('');
  };





  return (
    <div className='main'>
      <div className="nav">
        <p>GO-AI</p>
        <img src="https://cdn-icons-png.flaticon.com/512/4113/4113045.png" alt="logo" />
      </div>
      <div className="main-container">

        {!showResult? (  //ternary operator for when we enter prompt then it hide the backgroud stuff..
          <>
            <div className="greet">
              <p><span>Hello, Dear.</span></p>
              <p>How can I help you today? </p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip </p>
                <FontAwesomeIcon icon={faCompass} className='card-icons'/>
              </div>
              <div className="card">
                <p>Briefly summarized this concept : urban planning </p>
                <FontAwesomeIcon icon={faLightbulb} className='card-icons'/>
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <FontAwesomeIcon icon={faPeopleGroup} className='card-icons'/>
              </div>
              <div className="card">
                <p>Improve the readibility of the following code </p>
                <FontAwesomeIcon icon={faCode} className='card-icons'/>
              </div>
            </div>
          </>
          ) : ( <div className='result'>
            <div className="result-tittle">
              <img src="https://cdn-icons-png.flaticon.com/512/4113/4113045.png" alt="logo" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <FontAwesomeIcon icon={faEye} className='stars_icon'/>
              {loading? ( <div className='loader' >
                <hr />
                <hr />
                <hr />
              </div>
              ) : ( <p dangerouslySetInnerHTML={{__html:resultData}}></p>
              )}
            </div>
          </div>
        )}
        <br></br>
        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) => {
              setInput(e.target.value);
            }} value={input} type="text" placeholder='Enter a prompt here..' onKeyDown={e => { if (e.key === 'Enter') onSent(); }} />
            <div>
              <FontAwesomeIcon icon={faImage} className='gallery'/>
              <FontAwesomeIcon icon={faMicrophone} className='mic'/>
              {input? <FontAwesomeIcon icon={faPaperPlane} onClick={() => onSent()} className='send' />: null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main
