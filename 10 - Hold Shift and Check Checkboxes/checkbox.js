"use strict";

let checkboxesWrapper = document.querySelector(".inbox");
let checkboxItems = checkboxesWrapper.children;

let lastChecked = null;

checkboxesWrapper.addEventListener("click", (e) => {
  let checkbox = e.target;
  if (!checkbox) return;

  let checkboxItem = checkbox.closest(".item");

  if (e.shiftKey) {
    if (lastChecked && checkbox.checked) {
      // check all checkboxes between current and last checked
      let firstCheckboxFind = false;
      let secondCheckboxFind = false;
      for (let item of checkboxItems) {
        if (checkboxItem == item || lastChecked == item) {
          firstCheckboxFind ? (secondCheckboxFind = true) : (firstCheckboxFind = true);
        }
        if (firstCheckboxFind) {
          item.querySelector("input[type='checkbox']").checked = true;
        }
        if (firstCheckboxFind && secondCheckboxFind) break;
      }
    }
  }
  lastChecked = checkboxItem;
});
