const groceryListNameArr = [];
const groceryListQuantityArr = [];
let currentSelectedItemName, currentSelectedItemNumIndex, numItemShifts, selectedItem, groceryList, addItemButton, deleteItemButton, moveUpButton, moveDownButton, changeQuantityButton, submitButton, currentItemLabel;

function initialize() {
  currentSelectedItemName = ""; //does not change even when the item is moved up or down
  currentSelectedItemNumIndex = -1; //this changes when the item moves up or down

  selectedItem = document.getElementById("selectedItem");
  groceryList = document.getElementById("groceryList");
  addItemButton = document.getElementById("addItemButton");
  deleteItemButton = document.getElementById("deleteItemButton");
  moveUpButton = document.getElementById("moveUpButton");
  moveDownButton = document.getElementById("moveDownButton");
  changeQuantityButton = document.getElementById("changeQuantityButton");
  submitButton = document.getElementById("submitButton");
  currentItemLabel = document.getElementById("currentItemLabel");

  //Put this on the bottom of the body? Why tho, it'll only execute if there is a click
  addItemButton.addEventListener("click", addItemToList);
  deleteItemButton.addEventListener("click", deleteItemFromList);
  moveUpButton.addEventListener("click", moveItemUp);
  moveDownButton.addEventListener("click", moveItemDown);
  submitButton.addEventListener("click", updateCurrentSelectedItem);
  changeQuantityButton.addEventListener("click", () => {
    if (currentSelectedItemNumIndex === -1) {
      alert("There is no item selected");
    } else {
      let newItemQuantity = prompt(`Enter the new quantity of ${currentSelectedItemName}`); 
      groceryListQuantityArr[currentSelectedItemNumIndex] = newItemQuantity;
    }
    updateGroceryListDisplay();
  });
}

function moveItemDown() {
  if (currentSelectedItemNumIndex === -1) {
    alert("There is no item selected");
  } else if (currentSelectedItemNumIndex === groceryListNameArr.length - 1) {
    alert("You cannot move the item down further");
  } else {
    let tempItem = groceryListNameArr[currentSelectedItemNumIndex + 1];
    groceryListNameArr[currentSelectedItemNumIndex + 1] = groceryListNameArr[currentSelectedItemNumIndex];
    groceryListNameArr[currentSelectedItemNumIndex] = tempItem;

    let tempItemQuantity = groceryListQuantityArr[currentSelectedItemNumIndex + 1];
    groceryListQuantityArr[currentSelectedItemNumIndex + 1] = groceryListQuantityArr[currentSelectedItemNumIndex];
    groceryListQuantityArr[currentSelectedItemNumIndex] = tempItemQuantity;

    currentSelectedItemNumIndex++;
  }
  updateGroceryListDisplay();
}

function moveItemUp() {
  if (currentSelectedItemNumIndex === -1) {
    alert("There is no item selected");
  } else if (currentSelectedItemNumIndex === 0) {
    alert("You cannot move the item up further");
  } else {
    let tempItem = groceryListNameArr[currentSelectedItemNumIndex - 1];
    groceryListNameArr[currentSelectedItemNumIndex - 1] = groceryListNameArr[currentSelectedItemNumIndex];
    groceryListNameArr[currentSelectedItemNumIndex] = tempItem;

    let tempItemQuantity = groceryListQuantityArr[currentSelectedItemNumIndex - 1];
    groceryListQuantityArr[currentSelectedItemNumIndex - 1] = groceryListQuantityArr[currentSelectedItemNumIndex];
    groceryListQuantityArr[currentSelectedItemNumIndex] = tempItemQuantity;

    currentSelectedItemNumIndex--;
  }
  updateGroceryListDisplay();
}

function deleteItemFromList() {
  currentSelectedItemNumIndex === -1 ? alert("There is no item selected") : (groceryListNameArr.splice(currentSelectedItemNumIndex, 1), groceryListQuantityArr.splice(currentSelectedItemNumIndex, 1));

  currentItemLabel.innerHTML = "Current Item Name Selected: ";
  currentSelectedItemNumIndex = -1;
  currentSelectedItemName = "";
  
  updateGroceryListDisplay();
}
function updateCurrentSelectedItem() {
  if (isSelectedNumValid(selectedItem.value - 1)) {
    currentSelectedItemNumIndex = selectedItem.value - 1;
    currentSelectedItemName = groceryListNameArr[currentSelectedItemNumIndex];
    //updates label with name
    currentItemLabel.innerHTML = `Current Item Name Selected: ${currentSelectedItemName}`;
  }
  
}
function isSelectedNumValid(num) {
  if (num >= groceryListNameArr.length || num < 0) {
    alert("Pls select a valid item number");
    return false;
  }
  return true;
}
function addItemToList() {
  //add code for checking for duplicates and to see if it is a number
  let newItemName = prompt("Enter the name of your new item:");
  let newItemQuantity = prompt("Enter the quantity of your new item:");

  //only add if user does not cancel or enter nothing
  if (!(newItemName === null || newItemName === "" || newItemQuantity === null || newItemQuantity === "")) {
    groceryListNameArr.push(newItemName);
    groceryListQuantityArr.push(newItemQuantity);
  }
  console.log(groceryListNameArr);
  console.log(groceryListQuantityArr);
  updateGroceryListDisplay();
}

function updateGroceryListDisplay() {
  //clear the list first
  groceryList.innerHTML = "";
  
  //create a h3 element for each item
  for (let i = 0; i < groceryListNameArr.length; i++) {
    //each item row in grocery list string formatting
    let itemNum = (i + 1);
    let itemName = groceryListNameArr[i];
    let itemQuantity = groceryListQuantityArr[i];
    let generateElementText = () => `${itemNum}. ${itemName} (${itemQuantity})`;
    
    let h3 = document.createElement('h3');
    groceryList.appendChild(h3);
    h3.innerHTML = generateElementText();
  }
}
