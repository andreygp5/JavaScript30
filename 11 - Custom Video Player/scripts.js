"use strict";

updateProgressBar(0);

let video = document.querySelector(".player__video");
let playerButton = document.querySelector(".player__button");
let volumeInput = document.querySelector("input[name='volume']");
let playbackRate = document.querySelector("input[name='playbackRate']");
let skipButtons = document.querySelectorAll("button[data-skip]");
let progress = document.querySelector(".progress");
let fullScreen = document.querySelector(".full-screen");

video.addEventListener("click", (e) => {
  if (!e.target.classList.contains("viewer")) return;
  togglePlay(e);
});
video.addEventListener("timeupdate", () => updateProgressBar());
video.addEventListener("play", changeIcon);
video.addEventListener("pause", changeIcon);

playerButton.addEventListener("click", togglePlay);
volumeInput.addEventListener("input", changeVolume);
playbackRate.addEventListener("input", changeVideoSpeed);
skipButtons.forEach((btn) => btn.addEventListener("click", skipVideo));

progress.addEventListener("pointerdown", (progressEvent) => {
  progressEvent.preventDefault();

  changeProgress(progressEvent);
  document.addEventListener("pointermove", pointerMoveHandler);
  document.addEventListener("pointerup", pointerUpHandler);

  function pointerMoveHandler(e) {
    if (!e.target.closest(".player")) return;
    changeProgress(e);
  }
  function pointerUpHandler() {
    document.removeEventListener("pointereup", pointerUpHandler);
    document.removeEventListener("pointermove", pointerMoveHandler);
  }
});

fullScreen.addEventListener("click", () => {
  video.requestFullscreen ? video.requestFullscreen() : video.exitFullscreen();
});

function changeVolume() {
  video.volume = this.value;
}
function changeVideoSpeed() {
  video.playbackRate = this.value;
}
function togglePlay() {
  video.paused ? video.play() : video.pause();
}
function skipVideo() {
  video.currentTime += +this.dataset.skip;
}
function changeProgress(e) {
  let progressBarCoords = progress.getBoundingClientRect();
  console.log(progressBarCoords);
  let offsetX;
  if (e.clientX <= progressBarCoords.left) {
    offsetX = 0;
  } else if (e.clientX >= progressBarCoords.right) {
    offsetX = progressBarCoords.width;
  } else {
    offsetX = e.clientX - progressBarCoords.left;
  }
  let percentAmount = (100 * offsetX) / progressBarCoords.width;
  video.currentTime = (video.duration * percentAmount) / 100;
}
function updateProgressBar(percentAmount = (100 * video.currentTime) / video.duration) {
  let progressFilled = document.querySelector(".progress__filled");
  progressFilled.style.flexBasis = percentAmount + "%";
}
function changeIcon() {
  let icon = video.paused ? "►" : "| |";
  playerButton.textContent = icon;
}
