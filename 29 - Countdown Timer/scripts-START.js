"use strict";

const timerNode = document.querySelector(".timer");
const displayTimeLeft = document.querySelector(".display__time-left");
const displayEndTime = document.querySelector(".display__end-time");

const timerControls = document.querySelector(".timer__controls");
const customForm = timerControls.querySelector("#custom");
const customInput = customForm["minutes"];

timerControls.addEventListener("click", startTimer);
customForm.addEventListener("submit", startTimer);
timerNode.addEventListener("timerend", alertAboutEnd);

class Timer {
  constructor(seconds, endTime) {
    this.seconds = seconds;
    this.endTime = endTime.getTime();
    this.isRunning = false;
  }
  run() {
    this.isRunning = true;
    this._update();

    this.timer = setInterval(() => {
      if (this.seconds === 0) {
        this.stop();
        timerNode.dispatchEvent(new CustomEvent("timerend"));
      }
      this._update();
    }, 1000);
  }
  stop() {
    this.isRunning = false;
    clearInterval(this.timer);
  }
  _update() {
    let minLeft = String(Math.floor(this.seconds / 60));
    let secLeft = String(this.seconds % 60);

    if (minLeft.length === 1) minLeft = "0" + minLeft;
    if (secLeft.length === 1) secLeft = "0" + secLeft;

    displayTimeLeft.textContent = `${minLeft}:${secLeft}`;
    document.title = `${minLeft}:${secLeft}`;

    this.seconds = Math.round((this.endTime - Date.now()) / 1000);
  }
}

let timer;
function startTimer(e) {
  e.preventDefault();

  if (timer) timer.stop();

  let seconds = +e.target.dataset.time;
  if (e instanceof SubmitEvent) seconds = this["minutes"].value * 60;
  if (!seconds) return;

  let endTime = new Date();
  endTime.setSeconds(endTime.getSeconds() + seconds);
  displayEndTime.textContent = `Be back at ${endTime.getHours()}:${endTime.getMinutes()}`;

  timer = new Timer(seconds, endTime);
  timer.run();
}
function alertAboutEnd() {
  let utterance = new SpeechSynthesisUtterance("Таймер завершил свою работу");
  speechSynthesis.speak(utterance);
}
