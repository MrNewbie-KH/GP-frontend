import lol from "../VideoPlayer/lol.webm";
import previewImg from "../VideoPlayer/prev.jpeg";
import thumbnailImg from "../VideoPlayer/menouf.jpg";
import { useState, useEffect } from "react";
function VideoPlayer() {
  const [isPaused, setIsPaused] = useState(true);
  const [volume, setVolume] = useState(0.6);
  const [time, setTime] = useState(0);
  const [mode, setMode] = useState("normal");
  const [speed, setSpeed] = useState(1);
  const [duration, setDuration] = useState(0);
  const [percentOfVideo, setPercentOfVideo] = useState(0);
  let isScrubbing = false;
  useEffect(() => {
    const video = document.querySelector("video");
    video.addEventListener("loadeddata", () => {
      setDuration(video.duration);
    });
    const container = document.querySelector(".timeline-container");

    const intervalId = setInterval(() => {
      setTime(video.currentTime);
      const percent = video.currentTime / video.duration;
      setPercentOfVideo(percent);
      container.style.setProperty("--progress-position", percent);
    }, 1000); // Update every second
    video.playbackRate = speed;
    return () => {
      video.removeEventListener("loadeddata", () => {
        setDuration(video.duration);
      });
      clearInterval(intervalId);
    };
  }, [speed]);
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
    } else if (event.key === "f" || event.key === "F") {
      toggleFullScreen();
    }
  }
  // toggle between the two modes
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      const container = document.querySelector(".video-container");
      container.requestFullscreen();
      setMode("full-screen");
    } else {
      document.exitFullscreen();
      setMode("normal");
    }
  }
  function changeVolume(value) {
    const video = document.querySelector("video"); // Get the video element
    setVolume(value);
    video.volume = value;
    if (volume === 0) {
      video.muted = true;
    }
  }
  function toggleMute() {
    const video = document.querySelector("video"); // Get the video element

    volume === 0 ? setVolume(0.5) : setVolume(0);
    video.volume = volume;
  }
  function toggleTheater() {
    mode === "theater" ? setMode("normal") : setMode("theater");
  }
  // function format duration

  function formatDuration(t) {
    const seconds = Math.floor(t % 60);
    const minutes = Math.floor(t / 60) % 60;
    const hours = Math.floor(minutes / 60);
    if (hours === 0) {
      return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    } else {
      return `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`;
    }
  }
  function changeSpeed() {
    if (speed === 2) setSpeed(0.5);
    else setSpeed(speed + 0.25);
  }
  let wasPaused;
  function toggleIsScrubbing(e) {
    const videoContainer = document.querySelector(".video-container");
    const video = document.querySelector("video");
    const rect = videoContainer.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.pageX - rect.x), rect.width) / rect.width;

    isScrubbing = (e.buttons & 1) === 1;

    videoContainer.classList.toggle("scrubbing", isScrubbing);

    if (isScrubbing) {
      wasPaused = video.paused;
      video.pause();
    } else {
      video.currentTime = video.duration * percent;
      if (!wasPaused) video.play();
    }
    handleTimeLineUpdate(e)
  }

  function handleTimeLineUpdate(e) {
    const rect = e.target.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.pageX - rect.x), rect.width) / rect.width;
    // here to have multi images for rendering
    // const previewImgNumber = Math.max(1, Math.floor(percent * duration)/10);
    setPercentOfVideo(percent);
    const container = e.target;
    container.style.setProperty("--preview-position", percent);
    const previewImgSrc = previewImg;
    // scrubbing
    if (!isScrubbing) {
      e.preventDefault();
      container.style.setProperty("--progress-position", percent);
    }
  }
  return (
    <div
      className={
        isPaused ? "video-container paused " + mode : "video-container " + mode
      }
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <img className="thumbnail-img" />
      <div className="video-controls-container">
        <div
          className="timeline-container"
          onMouseMove={handleTimeLineUpdate}
          onMouseDown={(e) => toggleIsScrubbing(e)}
        >
          <div className="timeline">
            <img className="preview-img" src={thumbnailImg} />
            <div className="thumb-indicator"></div>
          </div>
        </div>

        <div className="controls">
          <button className="play-pause-btn" onClick={togglePlayPause}>
            {isPaused ? (
              <svg class="play-icon" viewBox="0 0 24 24">
                <path fill="#80deea" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
              </svg>
            ) : (
              <svg class="pause-icon" viewBox="0 0 24 24">
                <path fill="#80deea" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
              </svg>
            )}
          </button>
          <div className="volume-container">
            <button
              className="volume-mute-btn"
              onClick={() => {
                toggleMute();
              }}
            >
              {volume === 0 ? (
                <svg class="volume-muted-icon" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
                  />
                </svg>
              ) : volume <= 0.5 ? (
                <svg class="volume-low-icon" viewBox="0 0 24 24">
                  <path
                    fill="#b2ebf2"
                    d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"
                  />
                </svg>
              ) : (
                <svg class="volume-high-icon" viewBox="0 0 24 24">
                  <path
                    fill="#b2ebf2"
                    d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
                  />
                </svg>
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              id="volume-range"
              defaultValue={0.6}
              step={"any"}
              className="volume-slider"
              onChange={(e) => {
                changeVolume(e.target.value);
              }}
            />
          </div>
          <div className="duration-container">
            <div className="current-time">{formatDuration(time)}</div>/
            <div className="full-time">{formatDuration(duration)}</div>
          </div>
          {/* <button className="closed-caption-btn"></button> */}

          <button className="speed-btn wide-btn" onClick={changeSpeed}>
            {speed}x
          </button>
          <button
            className="theater-btn"
            onClick={() => {
              toggleTheater();
            }}
          >
            {mode === "theater" ? (
              <svg class="wide" viewBox="0 0 24 24">
                <path
                  fill="#80deea"
                  d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"
                />
              </svg>
            ) : (
              <svg class="tall" viewBox="0 0 24 24">
                <path
                  fill="#80deea"
                  d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"
                />
              </svg>
            )}
          </button>
          <button
            className="full-screen-btn"
            onClick={() => {
              setMode("full-screen");
              toggleFullScreen();
            }}
          >
            {mode === "full-screen" ? (
              <svg class="close" viewBox="0 0 24 24">
                <path
                  fill="#80deea"
                  d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                />
              </svg>
            ) : (
              <svg class="open" viewBox="0 0 24 24">
                <path
                  fill="#80deea"
                  d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <video src={lol} onClick={(e) => togglePlayPause(e)}></video>
    </div>
  );
}
export default VideoPlayer;
