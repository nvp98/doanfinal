import React, { useState, useEffect } from "react";
import "./Timer.css";
import imgLeft from "../../../../images/undo.svg";
import imgMenu from "../../../../images/menu.svg";
import imgTab from "../../../../images/tab.svg";
export default function Timer(props) {
  let [time, setTime] = useState();
  let storageKey = "set time";
  const [storage, setStorage] = useState(() => {
    if (!JSON.parse(localStorage.getItem(storageKey))) {
      return "00:00";
    } else {
      return JSON.parse(localStorage.getItem(storageKey));
    }
  });
  useEffect(() => {
    console.log(storage);
  }, []);
  const showTime = (e) => {
    props.fetchTime(e);
    setTime(e.target.value);
  };
  const sendTime = () => {
    props.chooseMenu(time);
    localStorage.setItem(storageKey, JSON.stringify(time));
    setStorage(time);
  };
  return (
    <div className="timer">
      <h2>Timer</h2>
      <div className="set-timer">
        <button onClick={sendTime}>click</button>
        <input type="time" id="set-timer" name="appt" onChange={showTime} />
      </div>
      {/* <div className="clock">
        <div className="show-time">
          <p>{storage}</p>
        </div>
      </div> */}
    </div>
  );
}
