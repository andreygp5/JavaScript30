"use strict";

const items = document.querySelector(".items");
items.addEventListener("mousedown", (e) => {
  items.classList.add("active");
  let { x: firstX } = e;

  items.addEventListener("mousemove", scroll);
  document.addEventListener("mouseup", stopScrolling);

  function scroll(e) {
    let { x: secondX } = e;
    items.scrollBy(firstX - secondX, 0);
    firstX = secondX;
  }
  function stopScrolling() {
    items.removeEventListener("mousemove", scroll);
    document.removeEventListener("mouseup", stopScrolling);
    items.classList.remove("active");
  }
});
