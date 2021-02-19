"use strict";

document.addEventListener("keydown", (event) => {
  let key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
  animateKey(key);

  let sound = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  playSound(sound);
});

document.addEventListener("click", (event) => {
  let key = event.target.closest(".key");
  if (!key) return;

  animateKey(key);

  let sound = document.querySelector(`audio[data-key="${key.dataset.key}"]`);
  playSound(sound);
});

function animateKey(key) {
  key.classList.add("playing");
  key.addEventListener("transitionend", () => {
    key.classList.remove("playing");
  });
}
function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
