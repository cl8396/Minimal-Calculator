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
  const operatorKeys = ["*", "+", "-", "/"];

  if (operatorKeys.includes(e.key)) {
    switch(e.key){
      case "+":
        operatorPressed("+");
        break;
      case "-":
        operatorPressed("-");
        break;
      case "*":
        operatorPressed("*");
        break;
      case "/":
        operatorPressed("/");
        break;
    }  
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

function operatorPressed(operator) {
  storeInputValue();
  clearInputValue();

  if (storedValues.length === 2) {
    console.log(
      `result is about to be generated. selected operator: ${selectedOperator} stored values: ${storedValues}`
    );
    generateResult();
  }

  selectedOperator = operator;
  console.log(selectedOperator);
}

operatorButtons.forEach(function (elem) {
  elem.addEventListener("click", (e) => {
    operatorPressed(e.target.value);
  });
});

equalsButton.addEventListener("click", () => {
  storeInputValue();
  clearInputValue();

  if (selectedOperator && storedValues.length == 2) {
    console.log(
      `result is about to be generated. selected operator: ${selectedOperator} entered values: ${storedValues}`
    );
    generateResult();
  }
});

function generateResult() {
  let result = operate(selectedOperator, storedValues);
  console.log(`unrounded result: ${result}`);
  storedValues = [result];
  result = Math.round(result * 1000000) / 1000000; //rounds long decimals to six places
  updateDisplay(result.toString());
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

function removeLastCharacter() {
  inputValue = inputValue.slice(0, inputValue.length - 1);
  updateDisplay(inputValue);

  if (inputValue === "") {
    disableClearButton();
  }
}
