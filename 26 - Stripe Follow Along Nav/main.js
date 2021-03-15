"use strict";

const liList = document.querySelectorAll(".cool > li");
const mainNav = document.querySelector(".top");
const dropdownBackground = document.querySelector(".dropdownBackground");

liList.forEach((li) => {
  li.addEventListener("mouseenter", openDropDown);
  li.addEventListener("mouseleave", hideDropDown);
});

function openDropDown(e) {
  const dropDown = this.querySelector(".dropdown");

  this.classList.add("trigger-enter");

  const { top: dropDownTop, left: dropDownLeft } = dropDown.getBoundingClientRect();
  const { top: mainNavTop, left: mainNavLeft } = mainNav.getBoundingClientRect();

  top = dropDownTop - mainNavTop;
  left = dropDownLeft - mainNavLeft;

  const { width, height } = dropDown.getBoundingClientRect();

  dropdownBackground.style.top = top + "px";
  dropdownBackground.style.left = left + "px";
  dropdownBackground.style.width = width + "px";
  dropdownBackground.style.height = height + "px";

  dropdownBackground.classList.add("open");

  setTimeout(() => {
    if (this.classList.contains("trigger-enter")) {
      this.classList.add("trigger-enter-active");
    }
  }, 200);
}

function hideDropDown(e) {
  this.classList.remove("trigger-enter");
  this.classList.remove("trigger-enter-active");

  dropdownBackground.classList.remove("open");
}
