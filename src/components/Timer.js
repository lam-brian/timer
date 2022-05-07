import { useState, useEffect } from "react";
import TimerInput from "./TimerInput";

const Timer = () => {
  const [time, setTime] = useState("00:00");
  const [start, setStart] = useState(false);
  let initialTime = null;

  const setTimerHandler = (minutes, seconds) => {
    minutes = (minutes.length === 1 ? `0${minutes}` : minutes) || "00";
    seconds = (seconds.length === 1 ? `0${seconds}` : seconds) || "00";
    setTime(`${minutes}:${seconds}`);
    initialTime = `${minutes}:${seconds}`;
  };

  const startTimerHandler = () => {
    setStart(true);
  };
  const pauseTimerHandler = () => {
    setStart(false);
  };

  useEffect(() => {
    let min = +time.slice(0, 2);
    let sec = +time.slice(-2);
    let countDown = min * 60 + sec;
    let interval = null;
    if (countDown === 0) return;
    if (start) {
      interval = setInterval(() => {
        countDown--;
        let minStr, secStr;
        if (countDown >= 60) {
          minStr = Math.floor(countDown / 60);
          secStr = countDown % 60;
        } else {
          minStr = 0;
          secStr = countDown;
        }
        minStr = minStr.toString().length === 1 ? `0${minStr}` : minStr;
        secStr = secStr.toString().length === 1 ? `0${secStr}` : secStr;
        setTime(`${minStr}:${secStr}`);
        if (countDown === 0) {
          setStart(false);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [time, start]);

  return (
    <div className="timer">
      <TimerInput onSetTimer={setTimerHandler} />
      <button onClick={startTimerHandler}>Start</button>
      <button onClick={pauseTimerHandler}>Pause</button>
      {/* <button onClick={resetTimerHandler}>Reset</button> */}
      <div className="clock">
        <span>{time}</span>
      </div>
    </div>
  );
};

export default Timer;
