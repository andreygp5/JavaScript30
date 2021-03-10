"use strict";

const hero = document.querySelector(".hero");
const h1 = hero.querySelector("h1");
hero.addEventListener("mousemove", updateShadow);
function updateShadow(e) {
  const maxOffest = h1.clientWidth / 2;
  // Use document.documentElement.clientWidth/Height instead of windown.innerWidth/Height,
  // because first one is size without scroll bar
  const { clientWidth: pageWidth, clientHeight: pageHeight } = document.documentElement;
  const xOffset = Math.round((e.clientX / pageWidth) * maxOffest - maxOffest / 2);
  const yOffset = Math.round((e.clientY / pageHeight) * maxOffest - maxOffest / 2);
  h1.style.textShadow = `
    ${-xOffset}px
    ${-yOffset}px
    ${0}px
    rgb(0, 255, 255),
    ${yOffset}px
    ${xOffset}px
    ${0}px
    rgb(0, 0, 0),
    ${-yOffset}px
    ${-xOffset}px
    ${0}px
    rgb(255, 255, 0),
    ${xOffset}px
    ${-yOffset}px
    ${0}px
    rgb(255, 0, 255)
  `;
}
