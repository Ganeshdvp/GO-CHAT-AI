import React, { useContext } from 'react'
import './Main.css'
import { Context } from "../../context/Context";


const Main = () => {

  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src="https://cdn-icons-png.flaticon.com/512/4113/4113045.png" alt="logo" />
      </div>
      <div className="main-container">

        {!showResult?       //ternary operator for when we enter prompt then it hide the backgroud stuff..
          <>
            <div className="greet">
              <p><span>Hello, User.</span></p>
              <p>How can I help you today? </p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip </p>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnDp5AafhaY1Erv4f8scZZFy3CGcAGb8YTC6xGaG3kLH5xtEuqWXgH9nuvYHgx-J7RyhU&usqp=CAU" alt="" />
              </div>
              <div className="card">
                <p>Briefly summarized this concept : urban planning </p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Iconoir_light-bulb-on.svg" alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToi1FjAtUTEDh4yul4buOm8MHS8Hz-2Yp3FD5vYv6k8A0lfKlnCOFmZ6UA1t8XD4Jsd_w&usqp=CAU" alt="" />
              </div>
              <div className="card">
                <p>Improve the readibility of the following code </p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Icon_%2880027%29_-_The_Noun_Project.svg" alt="" />
              </div>
            </div>
          </>
          : <div className='result'>
            <div className="result-tittle">
              <img src="https://images3.alphacoders.com/644/644161.jpg" alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img className='stars_icon' src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Toicon-icon-feather-dazzle.svg" alt="" />
              {loading?<div className='loader' >
                <hr />
                <hr />
                <hr />
              </div>
              : <p dangerouslySetInnerHTML={{__html:resultData}}></p>
              }
            </div>
          </div>
        }
        <br></br>
        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) => {
              setInput(e.target.value);
            }} value={input} type="text" placeholder='Enter a prompt here..' />
            <div>
              <img className='gallery' src="https://cdn.icon-icons.com/icons2/2440/PNG/512/gallery_icon_148533.png" alt="" />
              <img className='mic' src="https://img.lovepik.com/free-png/20220118/lovepik-microphone-icon-png-image_401486858_wh860.png" alt="" />
              {input?<img onClick={() => onSent()} className='send' src="https://static-00.iconduck.com/assets.00/send-icon-2048x1863-u8j8xnb6.png" alt="" />: null}
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
