import lol from "../VideoPlayer/lol.webm";
import { useState } from "react";
function VideoPlayer() {
  function togglePlayPause() {
    const video = document.querySelector("video"); // Get the video element
    if (video) {
      if (isPaused) {
        video.play(); // If paused, play the video
      } else {
        video.pause(); // If playing, pause the video
      }
      setIsPaused(!isPaused); // Toggle the isPaused state
    }
  }
  function handleKeyDown(event) {
    if (event.key === " " || event.key === "Spacebar") {
      togglePlayPause();
    }
  }
  const [isPaused, setIsPaused] = useState(true);
  return (
    <div
      className={isPaused ? "video-container paused" : "video-container"}
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <div className="video-controls-container">
        <div className="timeline-container">
          <div className="controls">
            <button className="play-pause-btn" onClick={togglePlayPause}>
              {isPaused ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                  />
                </svg>
              )}
            </button>
            <button className="play-pause-btn">Play</button>
          </div>
        </div>
      </div>
      <video src={lol} onClick={togglePlayPause}></video>
    </div>
  );
}
export default VideoPlayer;
