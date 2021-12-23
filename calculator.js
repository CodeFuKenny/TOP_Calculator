const add = (x,y) => x+y;
const minus = (x,y) => x-y;
const multiply = (x,y) => x*y;
const divide = (x,y) => x/y;

const operate = function (x,y, op) {
    if (op == 'add') return add(x,y);
    if (op == "minus") return minus (x,y)
    if (op == 'multiply') return multiply(x,y);
    if (op == 'divide') {
        if (y == 0) console.log("You Can't Divide by 0")
        return divide (x,y)
    }
}

const clickValue = function(event) {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
      return;
    }
    let eventClass = event.target.className;
    let eventValue = event.target.value;;
    DisplayDecision(eventClass,eventValue);
}

//Global Variables
let operatorPressedDisplay = false;
let operatorPressed = false;
let equalPressed = false;
let displayNumber = "";


//Calculator Modules
const updateDisplay = function(x){
    display.textContent = x;
}

const DisplayDecision = function(eventCla,eventVal){
    let eventClass = eventCla;
    let eventValue = eventVal;

    //Quick Reset of All Variables
    const reset = function () {
        equalPressed = false;
        operatorPressed = false;
        operatorPressedDisplay = false;
        displayNumber = "";
    }

    if (eventClass == "operand") {
        if (operatorPressedDisplay == true && operatorPressed == true) {
            displayNumber = ""
            operatorPressedDisplay = false;
        }
        else if (equalPressed == true) {
            reset();
            equalPressed = false;
        }
        displayNumber += eventValue;
    }

    if (eventClass == "operator"){
        if(operatorPressed == true){
            y = parseFloat(displayNumber);
            totalValue = operate(x,y,operator);  
            displayNumber = totalValue; 
            operatorPressedDisplay = false;
        }
        else if(equalPressed == true){
            y = 0;
            equalPressed = false;
        }
        operator = eventValue;
        operatorPressedDisplay = true;
        operatorPressed = true;
        x = parseFloat(displayNumber);
    }

    if (eventClass == "equals"){
        if (equalPressed == true) return;
        y = parseFloat(displayNumber);
        totalValue = operate(x,y,operator);
        x = totalValue;
        displayNumber = totalValue;
        operatorPressed = false;
        equalPressed = true;
    }

    if (eventClass == "clear") reset();

    if (eventClass == "decimal") {
        if ((displayNumber.indexOf('.') !== -1) == false) displayNumber += ".";
    }

    if (eventClass == "sign") displayNumber *= -1;

    if (eventClass == "delete") displayNumber = displayNumber.slice(0,-1);

    let displayNum 
    if (displayNumber != "") displayNum = +parseFloat(displayNumber).toFixed(2)
    updateDisplay(displayNum);
}

const display = document.querySelector(".display")
const buttons = document.getElementById("wrapper");
const click = buttons.addEventListener("click",clickValue);

