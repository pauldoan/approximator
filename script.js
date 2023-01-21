const topDisplay = document.querySelector("#topValue");
const bottomDisplay = document.querySelector("#bottomValue");
const deleteBtn = document.querySelector("#delete");
const clearBtn = document.querySelector("#clear");
const addBtn = document.querySelector("#add");
const subtractBtn = document.querySelector("#subtract");
const multiplyBtn = document.querySelector("#multiply");
const divideBtn = document.querySelector("#divide");
const equalBtn = document.querySelector("#equal");
const decimalBtn = document.querySelector("#decimal");
const n0Btn = document.querySelector("#button0");
const n1Btn = document.querySelector("#button1");
const n2Btn = document.querySelector("#button2");
const n3Btn = document.querySelector("#button3");
const n4Btn = document.querySelector("#button4");
const n5Btn = document.querySelector("#button5");
const n6Btn = document.querySelector("#button6");
const n7Btn = document.querySelector("#button7");
const n8Btn = document.querySelector("#button8");
const n9Btn = document.querySelector("#button9");
const digitBtns = document.querySelectorAll(".digit,.operation");
const welcomeMessage = "Hi!";
let topValue = "";
let bottomValue = "";

function displayScreen() {
  topDisplay.textContent = topValue;
  bottomDisplay.textContent = bottomValue;
}

function clearScreen() {
  topValue = "";
  bottomValue = "";
  displayScreen();
}

function deleteScreen() {
  bottomValue = bottomValue.slice(0, -1);
  displayScreen();
}

clearBtn.addEventListener("click", clearScreen);
deleteBtn.addEventListener("click", deleteScreen);

function inputButton() {
  // reset the welcome message
  if (bottomValue === welcomeMessage) {
    bottomValue = "";
  }
  // if we add digit
  if (this.className === "digit") {
    bottomValue += this.value;
  }
  // if we add operation
  else {
    topValue = bottomValue + this.value;
    bottomValue = "";
  }
  displayScreen();
}

digitBtns.forEach((button) => button.addEventListener("click", inputButton));

function addNumbers(a, b) {
  return a + b;
}

function subtractNumbers(a, b) {
  return a - b;
}
function multiplyNumbers(a, b) {
  return a * b;
}

function divideNumbers(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  return operator(a, b);
}

function getResult(expression) {}

window.addEventListener("load", () => (bottomValue = welcomeMessage));
window.addEventListener("load", () => (topValue = ""));
window.addEventListener("load", displayScreen);
