const numberButtons = document.querySelectorAll(".number-btn");
const decimalPointButton = document.querySelector(".calculator__decimal-point");
const display = document.querySelector(".calculator__display");

const equalsButton = document.querySelector(".calculator__equals");
const operatorButtons = document.querySelectorAll(".operator-btn");
const allClearButton = document.querySelector(".calculator__AC");
const clearButton = document.querySelector(".calculator__C");

let inputValue = "";
let selectedOperator = "";
let storedValues = [];

initCalculator();

document.addEventListener("keydown", (e) => {
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
});

allClearButton.addEventListener("click", initCalculator);

clearButton.addEventListener("click", removeLastCharacter);

numberButtons.forEach(function (elem) {
  elem.addEventListener("click", (e) => {
    updateInputValue(e.target.value);
  });
});

decimalPointButton.addEventListener("click", (e) => {
  if (!inputValue.includes(".")) {
    updateInputValue(e);
  }
});

function setOperator(operator) {
  selectedOperator = operator;
  console.log(selectedOperator);
}

function shouldCalculate() {
  return (storedValues.length === 2);
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

operatorButtons.forEach(function (elem) {
  elem.addEventListener("click", handleOperatorClick);
});

equalsButton.addEventListener("click", handleEqualsClick);

function getResult() {
  console.log(
    `result is about to be generated. selected operator: ${selectedOperator} stored values: ${storedValues}`
  );

  let result = operate(selectedOperator, storedValues);

  console.log(`unrounded result: ${result}`);

  storedValues = [result]; //init stored values with the result

  result = Math.round(result * 1000000) / 1000000; //rounds long decimals to six places

  return (result.toString());
}

function clearInputValue() {
  inputValue = "";
  disableClearButton();
}

function updateInputValue(inputChar) {
  if (inputValue.length < 30) {
    inputValue += inputChar;
    updateDisplay(inputValue);
  } else {
    alert("Maximum digits reached.");
  }

  if (inputValue.length > 0) {
    enableClearButton();
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

function add(array) {
  return array.reduce((accu, num) => accu + num);
}

function subtract(array) {
  return array.reduce((accu, num) => accu - num);
}

function divide(array) {
  if (array[1] === 0) {
    alert(`No dividing by 0.`);
    alert(`EVER.`);
    return array[0];
  }
  return array.reduce((accu, num) => accu / num);
}

function multiply(array) {
  return array.reduce((accu, num) => accu * num);
}

function operate(operator, array) {
  switch (operator) {
    case "+":
      return add(array);
    case "-":
      return subtract(array);
    case "*":
      return multiply(array);
    case "/":
      return divide(array);
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
  return (!clearButton.disabled);
}

function removeLastCharacter() {
  inputValue = inputValue.slice(0, inputValue.length - 1);
  updateDisplay(inputValue);

  if (inputValue === "") {
    disableClearButton();
  }
}
