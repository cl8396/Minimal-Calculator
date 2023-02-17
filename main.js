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
let storedValues = [];

initCalculator();

operatorButtons.forEach(function (elem) {
  elem.addEventListener("click", handleOperatorClick);
});

numberButtons.forEach(function (elem) {
  elem.addEventListener("click", appendNumber);
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
      if (!inputValue.includes(".")) {
        updateInputValue(".");
      }
      break;
  }

  if (numberKeys.includes(e.key)) {
    updateInputValue(e.key);
  }
}

function setOperator(operator) {
  selectedOperator = operator;
  console.log(selectedOperator);
}

function shouldCalculate() {
  return storedValues.length === 2;
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
  console.log(
    `result is about to be generated. selected operator: ${selectedOperator} stored values: ${storedValues}`
  );

  let result = operate(selectedOperator, storedValues);
  console.log(`unrounded result: ${result}`);
  storedValues = [result]; //init stored values with the result
  result = Math.round(result * 1000000) / 1000000; //rounds long decimals to six places

  return result.toString();
}

function clearInputValue() {
  inputValue = "";
  disableClearButton();
}

function appendNumber(e) {
  if (inputValue.length < 30) {
    inputValue += e.target.value;
    updateDisplay(inputValue);
  } else {
    alert("Maximum digits reached.");
  }

  if (inputValue.length > 0) {
    enableClearButton();
  }
}

function appendDecimal(e) {
  if (!inputValue.includes(".")) {
    inputValue += e.target.value;
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
  //store currently displayed value in an array
  if (inputValue) {
    storedValues.push(parseFloat(inputValue));
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

function operate(operator) {
  switch (operator) {
    case "+":
      return add(...storedValues);
    case "-":
      return subtract(...storedValues);
    case "*":
      return multiply(...storedValues);
    case "/":
      return divide(...storedValues);
  }
}

function initCalculator() {
  clearInputValue();
  disableClearButton();
  selectedOperator = "";
  storedValues = [];
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
