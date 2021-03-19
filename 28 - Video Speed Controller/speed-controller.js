"use strict";

const speed = document.querySelector(".speed");
const speedProgress = document.querySelector(".speed-bar");
const video = document.querySelector(".flex");
speed.addEventListener("mousedown", (e) => {
  const max = 5;
  const min = 0.5;

  changeProgress(e);

  speed.addEventListener("mousemove", changeProgress);
  document.addEventListener("mouseup", removeListeners);

  function changeProgress(e) {
    const progress = e.offsetY / speed.offsetHeight;
    const playbackRate = (progress * (max - min) + min).toFixed(2);
    speedProgress.style.height = progress * 100 + "%";
    speedProgress.textContent = playbackRate + "x";
    video.playbackRate = playbackRate;
  }
  function removeListeners() {
    speed.removeEventListener("mousemove", changeProgress);
    document.removeEventListener("mouseup", removeListeners);
  }
});
