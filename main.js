const numberButtons = document.querySelectorAll(".number-btn");
const decimalPointButton = document.querySelector('.calculator__decimal-point')
const display = document.querySelector(".calculator__display");
// const addButton = document.querySelector('.calculator__add');
// const subtractButton = document.querySelector('.calculator__subtract');
// const multiplyButton = document.querySelector('.calculator__multiply');
// const divideButton = document.querySelector('.calculator__divide');
const equalsButton = document.querySelector(".calculator__equals");
const operatorButtons = document.querySelectorAll(".operator-btn");
const allClearButton = document.querySelector('.calculator__AC');


let inputValue = "";
let selectedOperator = "";
let storedValues = [];

allClearButton.addEventListener('click', initCalculator);

numberButtons.forEach(function (elem) {
  elem.addEventListener("click", updateInputValue);
});

decimalPointButton.addEventListener('click', (e) => {
  if (!inputValue.includes('.')){
    updateInputValue(e);  
  }
  
})

operatorButtons.forEach(function (elem) {
  elem.addEventListener("click", (e) => {

    storeInputValue();
    clearInputValue();
   
    if (storedValues.length === 2) {
      console.log(`result is about to be generated. selected operator: ${selectedOperator} stored values: ${storedValues}`);
      generateResult();
    }

    selectedOperator = e.target.value;
    console.log(selectedOperator);
    
  });
});

equalsButton.addEventListener("click", () => {

    storeInputValue();
    clearInputValue();
  
  if (selectedOperator && storedValues.length == 2) {
    console.log(`result is about to be generated. selected operator: ${selectedOperator} stored values: ${storedValues}`);
    generateResult();
  }
  
});

function generateResult(){
  let result = operate(selectedOperator, storedValues);
  storedValues = [result];

  if (!Number.isInteger(result)){
    //rounds long decimals to six places
    result = Math.round(result * 1000000) / 1000000;
  }
  updateDisplay(result.toString()); 
}

function clearInputValue(){
  inputValue = "";
}

function updateInputValue(e) {
  inputValue += e.target.value;
  updateDisplay(inputValue);
}

function updateDisplay(string) {
  display.textContent = string;
}

function storeInputValue() {
  //store currently displayed value
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
    alert(`EVER`)
    return;
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
  selectedOperator = "";
  storedValues = [];
  updateDisplay();
}