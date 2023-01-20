const screen = document.querySelector("#screen");
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
const digitBtns = document.querySelectorAll(".digit");
const welcomeMessage = "Hi!";
let currentValue = "";

function displayScreen() {
  screen.textContent = currentValue;
}

function clearScreen() {
  currentValue = "";
  displayScreen();
}

function deleteScreen() {
  currentValue = currentValue.slice(0, -1);
  displayScreen();
}

clearBtn.addEventListener("click", clearScreen);
deleteBtn.addEventListener("click", deleteScreen);

function inputButton(value) {
  currentValue = currentValue === welcomeMessage ? value : currentValue + value;
  displayScreen();
}

digitBtns.forEach((button) =>
  button.addEventListener("click", (e) => {
    inputButton(e.target.value);
  })
);

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

window.addEventListener("load", () => (currentValue = welcomeMessage));
window.addEventListener("load", displayScreen);
