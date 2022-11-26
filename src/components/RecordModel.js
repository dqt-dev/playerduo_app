import { useReactMediaRecorder } from "react-media-recorder";

import stop from '../stop.png';
import play from '../play.png';
import { useState } from "react";
import { useEffect } from "react";

function Timer(props) {
  return (
    <div className="timer">
      <span className="digits ">
        {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.
      </span>
      <span className="digits mili-sec">
        {("0" + ((props.time / 10) % 100)).slice(-2)}
      </span>
    </div>
  );
}

const RecordModel = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });

  const [time, setTime] = useState(0);

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  return (

    <div className="modal " id="exampleRecordModal" tabIndex="-1" aria-labelledby="exampleRecordModal" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-center">
            <p>Ghi âm giọng nói</p>
          </div>
          <div>
            <div className="d-flex justify-content-center">
              <Timer time={time} className="justify-item-center" />
            </div>
            <div div className="d-flex justify-content-center">
              {status !== 'recording' ? <img src={play} style={{ width: '30px' }} onClick={() => { startRecording(); handleReset(); handleStart(); }} /> :
                <img src={stop} style={{ width: '30px' }} onClick={() => { stopRecording(); handlePauseResume() }} />}
            </div>
            <div div className="d-flex justify-content-center">
            <audio src={mediaBlobUrl} controls autoPlay />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default RecordModel;