"use strict";

const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const clearListBtn = document.querySelector(".clear-list");
const checkForm = document.forms["check"];
let items = [];

document.addEventListener("DOMContentLoaded", loadFromLocalStorage);
window.addEventListener("beforeunload", saveToLocalStorage);
addItems.addEventListener("submit", decorateForListUpdate(addItemHandler));
clearListBtn.addEventListener("click", decorateForListUpdate(clearListHandler));
itemsList.addEventListener("click", checkHandler);
checkForm.addEventListener("click", decorateForListUpdate(checkAllHandler));

function saveToLocalStorage() {
  localStorage.setItem("items", JSON.stringify(items));
}
function loadFromLocalStorage() {
  items = JSON.parse(localStorage.getItem("items"));
  updateList(items, itemsList);
}
function addItemHandler(e) {
  e.preventDefault();

  let textInput = this.querySelector("input[name='item']");
  let newItem = {
    id: items.length,
    text: textInput.value,
    isChecked: false,
  };
  items.push(newItem);

  this.reset();
}
function clearListHandler(e) {
  items = [];
  localStorage.removeItem("items");
}
function checkHandler(e) {
  let li = e.target.closest("li");
  if (!li) return;

  let checkbox = li.querySelector("input[type='checkbox']");
  checkbox.checked = !checkbox.checked;

  updateLiCheck(li.querySelector("label").getAttribute("for"), checkbox.checked);
}
function updateLiCheck(itemId, isNowCheck) {
  for (let item of items) {
    if (item.id == itemId) {
      item.isChecked = isNowCheck;
      return;
    }
  }
}
function checkAllHandler(e) {
  e.preventDefault();
  let targetBtn = e.target.closest("button");
  if (!targetBtn) return;

  let check = targetBtn.classList.contains("check-all") ? true : false;
  items.forEach((item) => (item.isChecked = check));
}
function decorateForListUpdate(f) {
  return function () {
    f.apply(this, arguments);
    updateList(items, itemsList);
  };
}
function updateList(items, itemsList) {
  let ulInner = items
    .map((item) => {
      return `
    <li>
      <input type="checkbox" name="${item.id}" ${item.isChecked ? "checked" : ""}>
      <label for="${item.id}">${item.text}</label>
    </li>
    `;
    })
    .join("");
  itemsList.innerHTML = ulInner;
}
