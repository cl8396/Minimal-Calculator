const numberButtons = document.querySelectorAll('.number-btn');
const display = document.querySelector('.calculator__display');
const addButton = document.querySelector('.calculator__add');
const equalsButton = document.querySelector('.calculator__equals')


let inputValue = "";
let selectedOperator = "";
let storedValues = [];



numberButtons.forEach(function(elem) {
    elem.addEventListener('click', updateInputValue);
})

function updateInputValue(e){
    inputValue += (e.target.value);
    updateDisplay(inputValue);
}

function updateDisplay(string){
    display.textContent = string;
}

function storeCurrentValue(){ //store currently displayed value
    if (inputValue) {
        storedValues.push(parseInt(inputValue));
    }
    inputValue = "";
}

addButton.addEventListener('click', () => {
    
    storeCurrentValue();
    selectedOperator = "+";

    if (storedValues.length === 2) {
        let result = operate(selectedOperator, storedValues);
        storedValues = [result];
        updateDisplay(result.toString());
    }


})

equalsButton.addEventListener('click', () => {
    storeCurrentValue();
    let result = operate(selectedOperator, storedValues);
    storedValues = [result];
    updateDisplay(result.toString());
})

function add(array){
        return array.reduce((accu, num) => accu + num); 
    }

function subtract(array){
        return array.reduce((accu, num) => accu - num);
    }

function divide(a, b){
        return a / b;
    }

function multiply(a, b){
        return a * b;
    }

function operate(operator, array){
    switch(operator){
        case '+':
            return (add(array));
        // case '-':
        //     subtract(a, b);
        // case '*':
        //     multiply(a, b);
        // case '/':
        //     divide(a, b);
    }
}



