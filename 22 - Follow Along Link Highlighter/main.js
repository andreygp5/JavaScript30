"use strict";

const highlighter = document.querySelector(".highlight");
const aList = document.querySelectorAll("a");
aList.forEach((a) => {
  a.addEventListener("mouseover", (e) => {
    let { top: aTop, left: aLeft, width: aWidth, height: aHeight } = a.getBoundingClientRect();

    // First approach - get offset relative to viewport and add scrolled part to it

    aTop += window.scrollY;
    aLeft += window.scrollX;

    // Another approach - calculate the overall offset of all
    // parent elements, which are positioned (have position other than static)

    // let currentElem = e.target.parentElement;
    // while (currentElem) {
    //   if (currentElem.tagName == "BODY") break;
    //   if (currentElem.classList.contains("highlight")) continue;
    //   if (getComputedStyle(currentElem).position != "static") {
    //     aTop = currentElem.offsetTop + e.target.offsetTop;
    //     aLeft = currentElem.offsetLeft + e.target.offsetLeft;
    //   }
    //   currentElem = currentElem.parentElement;
    // }

    highlighter.style.cssText = `
                      width: ${aWidth}px;
                      height: ${aHeight}px;
                      top: ${aTop}px;
                      left: ${aLeft}px;
    `;
  });
});
