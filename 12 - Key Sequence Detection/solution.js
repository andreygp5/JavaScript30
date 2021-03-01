"use strict";

let pressedKey = [];
let desiredWord = "desiredWord";
window.addEventListener("keyup", (e) => {
  if (pressedKey.length == desiredWord.length) {
    pressedKey.shift();
  }
  pressedKey.push(e.key);
});
