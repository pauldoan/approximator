const title = document.querySelector("h1.title");
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
const modeBtn = document.querySelector("button.mode");
let mode;
const welcomeMessage = "Hi!";
let topValue = "";
let bottomValue = "";
const operationMap = {
  "+": addNumbers,
  "-": subtractNumbers,
  x: multiplyNumbers,
  "÷": divideNumbers,
};

function funAnswer(result) {
  const nAnswers = 5;
  const randNb = Math.random() * nAnswers;
  if (randNb < 1) {
    return `I believe it's half of ${2 * result}`;
  } else if (randNb < 2) {
    return `Approx. a third of ${3 * result}`;
  } else if (randNb < 3) {
    if (result > 100) {
      return `Wow, that's a big number!`;
    } else {
      return `It's below 100...`;
    }
  } else if (randNb < 4) {
    return `It's between ${result - 1} and ${result + 1}`;
  } else {
    return `It's close to ${Math.round(result)}`;
  }
}

function changeMode() {
  if (mode === "approximator") {
    mode = "calculator";
    title.textContent = "The Calculator";
    equalBtn.textContent = "=";
  } else {
    mode = "approximator";
    title.textContent = "The Approximator";
    equalBtn.textContent = "≃";
  }
  clearScreen();
  bottomValue = welcomeMessage;
  displayScreen();
}

modeBtn.addEventListener("click", changeMode);

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
  // if still on welcome screen, we reset
  if (bottomValue === welcomeMessage) {
    bottomValue = "";
  }
  // if we add digit, we append to the bottom value
  if (this.className === "digit") {
    // if we are in approximator and computation was just done, we auto first reset
    if (
      mode === "approximator" &&
      /^-?\.?\d+(\.\d+)? [+x\-÷] \d+(\.\d+)? ≃$/.test(topValue)
    ) {
      clearScreen();
    }
    bottomValue += this.value;
  }
  // if the first button pressed is a minus sign,
  // we still append to digits for negative numbers
  else if (
    this.id === "subtract" &&
    (bottomValue === "" ||
      (mode === "approximator" &&
        /^-?\.?\d+(\.\d+)? [+x\-÷] \d+(\.\d+)? ≃$/.test(topValue)))
  ) {
    topValue = "";
    bottomValue = this.value;
  }
  // if we add operation, we shift to top value and wait for next expression
  else if (/^-?\.?\d+(\.\d+)?$/.test(bottomValue)) {
    // if we are in approximator and computation was just done, we throw error
    if (
      mode === "approximator" &&
      /^-?\.?\d+(\.\d+)? [+x\-÷] \d+(\.\d+)? ≃$/.test(topValue)
    ) {
      bottomValue = "input digit first!";
    }
    // if we are in approximator and we type a second operator
    else if (
      mode === "approximator" &&
      /^-?\.?\d+(\.\d+)? [+x\-÷]$/.test(topValue)
    ) {
      // we don't do anything
    }

    // if we are in calculator and we type a second operator
    else if (
      mode === "calculator" &&
      /^-?\.?\d+(\.\d+)? [+x\-÷]$/.test(topValue)
    ) {
      // we compute the result by simulating an equal
      result = getResult();
      // we append the sign to the result and move to next step
      topValue = result[0] + " " + this.value;
      bottomValue = "";
    }

    // any other case
    else {
      topValue = bottomValue + " " + this.value;
      bottomValue = "";
    }
  }
  displayScreen();
}

// calculator mode
function getResult() {
  const firstValue = Number(topValue.slice(0, -1));
  const secondValue = Number(bottomValue);
  const operation = topValue.slice(-1);
  const operator = operationMap[operation];
  const result = operate(operator, firstValue, secondValue);
  const fullOperation = `${firstValue} ${operation} ${bottomValue} ${equalBtn.textContent}`;
  return [result, fullOperation];
}

digitBtns.forEach((button) => button.addEventListener("click", inputButton));

function compute() {
  // if operation has been done and we re-press equal, don't do anything
  if (/^-?\.?\d+(\.\d+)? [+x\-÷] \d+(\.\d+)? [≃=]$/.test(topValue)) {
    return;
  }
  // just equal on a numerical expression should do nothing
  else if (topValue === "" && /^-?\.?\d+(\.\d+)?$/.test(bottomValue)) {
    return;
  }
  // one of the two expression has bad format, we wrote an error
  else if (
    !/^-?\.?\d+(\.\d+)? [+x\-÷]$/.test(topValue) ||
    !/^\d+(\.\d+)?$/.test(bottomValue)
  ) {
    bottomValue = "Error :(";
    displayScreen();
  }
  // finally if everything is good
  else if (mode === "calculator") {
    const result = getResult();
    bottomValue = result[0];
    topValue = result[1];
    displayScreen();
  } else {
    const result = getResult();
    bottomValue = funAnswer(result[0]);
    topValue = result[1];
    displayScreen();
  }
}

equalBtn.addEventListener("click", compute);

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

window.addEventListener("load", () => (bottomValue = welcomeMessage));
window.addEventListener("load", () => (topValue = ""));
window.addEventListener("load", () => (mode = "approximator"));
window.addEventListener("load", displayScreen);
