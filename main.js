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

