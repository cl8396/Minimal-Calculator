const numberButtons = document.querySelectorAll('.number-btn');
const display = document.querySelector('.calculator__display');
let inputValue = [];

numberButtons.forEach(function(elem) {
    elem.addEventListener('click', updateInputValue);
})

function updateInputValue(e){
    inputValue.push(e.target.value);
    updateDisplay(inputValue.join(""));
    console.log(parseInt(inputValue.join("")));
}

function updateDisplay(string){
    display.textContent = string;
}
function add(a, b){
        return a + b; 
    }

function subtract(a, b){
        return a - b;
    }

function divide(a, b){
        return a / b;
    }

function multiply(a, b){
        return a * b;
    }

function operate(operator, a, b){
    switch(operator){
        case '+':
            add(a, b);
        case '-':
            subtract(a, b);
        case '*':
            multiply(a, b);
        case '/':
            divide(a, b);
    }
}



