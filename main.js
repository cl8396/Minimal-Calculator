const numberButtons = document.querySelectorAll(".number-btn");
const display = document.querySelector(".calculator__display");
// const addButton = document.querySelector('.calculator__add');
// const subtractButton = document.querySelector('.calculator__subtract');
// const multiplyButton = document.querySelector('.calculator__multiply');
// const divideButton = document.querySelector('.calculator__divide');
const equalsButton = document.querySelector(".calculator__equals");
const operatorButtons = document.querySelectorAll(".operator-btn");

let inputValue = "";
let selectedOperator = "";
let storedValues = [];

numberButtons.forEach(function (elem) {
  elem.addEventListener("click", updateInputValue);
});

operatorButtons.forEach(function (elem) {
  elem.addEventListener("click", (e) => {
    
    if (inputValue) {
      storeCurrentValue(); 
      selectedOperator = e.target.value;
    }
    

    if (storedValues.length === 2) {
      let result = operate(selectedOperator, storedValues);
      storedValues = [result];
      updateDisplay(result.toString());
    }
    
  });
});

function updateInputValue(e) {
  inputValue += e.target.value;
  updateDisplay(inputValue);
}

function updateDisplay(string) {
  display.textContent = string;
}

function storeCurrentValue() {
  //store currently displayed value
  if (inputValue) {
    storedValues.push(parseInt(inputValue));
  }
  inputValue = "";
}

// addButton.addEventListener('click', () => {

//     storeCurrentValue();

//     if (storedValues.length === 2) {
//         let result = operate(selectedOperator, storedValues);
//         storedValues = [result];
//         updateDisplay(result.toString());
//     }

//     selectedOperator = "+";
// })

// subtractButton.addEventListener('click', () => {

//     storeCurrentValue();

//     if (storedValues.length === 2) {
//         let result = operate(selectedOperator, storedValues);
//         storedValues = [result];
//         updateDisplay(result.toString());
//     }

//     selectedOperator = "-";
// })

// multiplyButton.addEventListener('click', () => {

//     storeCurrentValue();

//     if (storedValues.length === 2) {
//         let result = operate(selectedOperator, storedValues);
//         storedValues = [result];
//         updateDisplay(result.toString());
//     }

//     selectedOperator = "*";
// })

equalsButton.addEventListener("click", () => {
  if (inputValue) {
    storeCurrentValue();
  }
  
  if (selectedOperator) {
    let result = operate(selectedOperator, storedValues);
    storedValues = [result];
    updateDisplay(result.toString());  
  }
  
});

function add(array) {
  return array.reduce((accu, num) => accu + num);
}

function subtract(array) {
  return array.reduce((accu, num) => accu - num);
}

function divide(array) {
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
