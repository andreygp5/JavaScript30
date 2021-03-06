"use strict";

const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const itemInput = addItems.querySelector("input[name='item']");
const itemAddBtn = addItems.querySelector("input[type='submit']");
const clearListBtn = document.querySelector(".clear-list");
const checkForm = document.forms.check;
let items = [];

loadListFromLocalStorage();

itemAddBtn.addEventListener("click", addItemHandler);
itemsList.addEventListener("click", checkItemHandler);
clearListBtn.addEventListener("click", clearListHandler);
checkForm.addEventListener("click", checkHandler);

function checkHandler(e) {
  let check = e.target.classList.contains("check-all") ? true : false;

  items.forEach((item) => (item.isChecked = check));

  localStorage.setItem("items", JSON.stringify(items));
  loadListFromLocalStorage();
}

function clearListHandler(e) {
  localStorage.removeItem("items");
  items = [];
  itemsList.innerHTML = "";
}
function checkItemHandler(e) {
  if (e.target.tagName != "LABEL") return;
  let li = e.target.closest("li");
  let checkbox = li.querySelector("input[type='checkbox']");
  let label = li.querySelector("label");
  if (!li || !checkbox) return;
  checkbox.checked = !checkbox.checked;

  updateItem(label.getAttribute("for"), checkbox.checked);
}
function updateItem(itemId, isChecked) {
  for (let item of items) {
    if (item.id == itemId) {
      item.isChecked = isChecked;
      break;
    }
  }
  localStorage.setItem("items", JSON.stringify(items));
}
function addItemHandler(e) {
  e.preventDefault();
  if (!itemInput.value) return;

  let newItem = {
    id: items.length,
    name: itemInput.value,
    isChecked: false,
  };
  items.push(newItem);
  localStorage.setItem("items", JSON.stringify(items));
  loadListFromLocalStorage();

  itemInput.value = "";
}
function loadListFromLocalStorage() {
  items = JSON.parse(localStorage.getItem("items")) || [];
  if (items.length === 0) return;
  itemsList.innerHTML = "";
  for (let item of items) addItemToList(item);
}
function addItemToList(item) {
  let li = `<li>
              <input type="checkbox" name="${item.id}" ${item.isChecked ? "checked" : ""}>
              <label for="${item.id}">${item.name}</label>
            </li>`;
  itemsList.innerHTML += li;
}
