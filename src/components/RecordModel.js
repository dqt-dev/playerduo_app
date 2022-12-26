import { useReactMediaRecorder } from "react-media-recorder";

import stop from "../stop.png";
import play from "../play.png";
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

const RecordModel = ({ handleUpdateProfile }) => {
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

  async function getFileFromUrl(url, name, defaultType = "audio/mp3") {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], name, {
      type: data.type || defaultType,
    });
  }
  const handleUpdateVoice = async () => {
    const file = await getFileFromUrl(mediaBlobUrl, "demo.mp3");
    handleUpdateProfile("voice", file);
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
    <div
      className="modal"
      id="exampleRecordModal"
      tabIndex="-1"
      aria-labelledby="exampleRecordModal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-center mt-2">
            <p style= {{fontSize: '24px'}}>Ghi âm giọng nói</p>
          </div>
          <div>
            <div className="d-flex justify-content-center">
              <Timer time={time} className="justify-item-center" />
            </div>
            <div div className="d-flex justify-content-center">
              {status !== "recording" ? (
                <img
                  src={play}
                  style={{ width: "30px" }}
                  onClick={() => {
                    startRecording();
                    handleReset();
                    handleStart();
                  }}
                />
              ) : (
                <img
                  src={stop}
                  style={{ width: "30px" }}
                  onClick={() => {
                    stopRecording();
                    handlePauseResume();
                  }}
                />
              )}
            </div>
            <div  div className="d-flex justify-content-center">
              <audio src={mediaBlobUrl} controls autoPlay />
            </div>
            <div div className="d-flex justify-content-center">
              <button className="btn btn-primary mt-2 mb-2" onClick={handleUpdateVoice}>
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordModel;
