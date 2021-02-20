"use strict";

let hourHand = document.querySelector(".hour-hand");
let minHand = document.querySelector(".min-hand");
let secondHand = document.querySelector(".second-hand");
let hand = document.querySelectorAll(".second-hand");

setInterval(updateClock, 1000);

function updateClock() {
  let time = new Date();
  let hourDeg = time.getHours() * 30 + 90;
  let minDeg = time.getMinutes() * 6 + 90;
  let secondDeg = time.getSeconds() * 6 + 90;

  if (hourDeg == 420 || minDeg == 450 || secondDeg == 444) {
    hand.forEach((item) => (item.style.transition = "0s"));
    setTimeout(() => {
      hand.forEach((item) => (item.style.transition = "all 0.1s cubic-bezier(0, 1.89, 0.25, 1)"));
    }, 1000);
  }

  hourHand.style.transform = `rotate(${hourDeg}deg)`;
  minHand.style.transform = `rotate(${minDeg}deg)`;
  secondHand.style.transform = `rotate(${secondDeg}deg)`;
}
