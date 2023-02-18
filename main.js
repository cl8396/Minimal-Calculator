const numberButtons = document.querySelectorAll(".number-btn");
const decimalPointButton = document.querySelector(".calculator__decimal-point");
const display = document.querySelector(".calculator__display");

const equalsButton = document.querySelector(".calculator__equals");
const percentButton = document.querySelector(".calculator__percentage");
const operatorButtons = document.querySelectorAll(".operator-btn");
const allClearButton = document.querySelector(".calculator__AC");
const clearButton = document.querySelector(".calculator__C");

let inputValue = "";
let selectedOperator = "";
let operands = [];

initCalculator();

operatorButtons.forEach(function (elem) {
  elem.addEventListener("click", handleOperatorClick);
});

numberButtons.forEach(function (elem) {
  elem.addEventListener("click", (e) => appendNumber(e.target.value));
});

decimalPointButton.addEventListener("click", appendDecimal);
equalsButton.addEventListener("click", handleEqualsClick);
document.addEventListener("keydown", handleKeyboardInput);
allClearButton.addEventListener("click", initCalculator);
clearButton.addEventListener("click", removeLastCharacter);

function handleKeyboardInput(e) {
  const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  switch (e.key) {
    case "+":
      setOperator("+");
      startOperation();
      break;
    case "-":
      setOperator("-");
      startOperation();
      break;
    case "*":
      setOperator("*");
      startOperation();
      break;
    case "/":
      setOperator("/");
      startOperation();
      break;
    case "Enter":
    case "=":
      startOperation();
      break;
    case "Backspace":
      if (isClearEnabled()) {
        removeLastCharacter();
      }
      break;
    case ".":
      appendDecimal();
      break;
  }

  if (numberKeys.includes(e.key)) {
    appendNumber(e.key);
  }
}

function setOperator(operator) {
  selectedOperator = operator;
}

function shouldCalculate() {
  return (operands.length === 2);
}

function startOperation() {
  storeInputValue();
  clearInputValue();

  if (shouldCalculate()) {
    updateDisplay(getResult());
  }
}

function handleOperatorClick(e) {
  setOperator(e.target.value);
  startOperation();
}

function handleEqualsClick() {
  startOperation();
}

function getResult() {
  let result = operate(selectedOperator);
  operands = [result]; //init stored values with the result

  return roundNumber(result)
         .toString();
}

function operate(operator) {
  switch (operator) {
    case "+":
      return add(...operands);
    case "-":
      return subtract(...operands);
    case "*":
      return multiply(...operands);
    case "/":
      return divide(...operands);
  }
}

function clearInputValue() {
  inputValue = "";
  disableClearButton();
}

function appendNumber(number) {
  if (inputValue.length < 30) {
    inputValue += number;
    updateDisplay(inputValue);
  } else {
    alert("Maximum digits reached.");
  }

  if (inputValue.length > 0) {
    enableClearButton();
  }
}

function appendDecimal() {
  if (!inputValue.includes(".")) {
    inputValue += ".";
    updateDisplay(inputValue);
  }
}

function updateDisplay(string) {
  display.textContent = string;

  if (string.length <= 10) {
    display.style.fontSize = "3rem";
  }

  if (string.length > 10) {
    display.style.fontSize = "2rem";
  }

  if (string.length > 15) {
    display.style.fontSize = "1rem";
  }
}

function storeInputValue() {
  //store currently displayed value in operands array
  if (inputValue) {
    operands.push(parseFloat(inputValue));
  }
}


function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  if (b === 0) {
    alert(`No dividing by 0.`);
    alert(`EVER.`);
    return array[a];
  }
  return a / b;
}

function multiply(a, b) {
  return a * b;
}

function initCalculator() {
  clearInputValue();
  disableClearButton();
  selectedOperator = "";
  operands = [];
  updateDisplay("");
}

function enableClearButton() {
  clearButton.disabled = false;
}

function disableClearButton() {
  clearButton.disabled = true;
}

function isClearEnabled() {
  return !clearButton.disabled;
}

function removeLastCharacter() {
  inputValue = inputValue.slice(0, inputValue.length - 1);
  updateDisplay(inputValue);

  if (inputValue === "") {
    disableClearButton();
  }
}

function roundNumber(num) {
  return Math.round(num * 1000000) / 1000000;
}