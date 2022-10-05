function add(num1, num2) {
    return (+num1) + (+num2);
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {


    if(operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1,num2);
    } else if (operator === 'x') {
        return multiply(num1, num2);
    } else if (operator === '/') {
        if (num2 === '0') {
            alert('You can not divide a number by 0');
            throw 'You can not divide a number by 0';
        }
        return divide(num1, num2);
    }
    
}

function operateArray(numbersArray) {
    while (numbersArray.length != 1) {
        let result = '' + operate(numbersArray[1], numbersArray[0], numbersArray[2]);
        numbersArray.splice(0, 3);
        numbersArray.splice(0, 0, result);

    }

    return numbersArray[0];

}

// transforms the given array from '1' ,'1', '+', '1' to '11', '+', '1' format
function arrangeNumber(numbers) {
    let array = [];
    let num = "";

    for(let i = 0; i < numbers.length; i++) {
        if(numbers[i] === "+" || numbers[i] === "-" || numbers[i] === "x" || numbers[i] === "/") {
            array.push(num);
            array.push(numbers[i]);
            num = "";
        } else {
        num += numbers[i];

        }

    }
    array.push(numbers[numbers.length - 1]);
    return array;
}

function arrangeArrayWithOperation(array) {
    for (let i = 1; i < array.length; i += 2) {
        if(array[i] === 'x' || array[i] === '/') {
            
            let numOfOperation = '' + operate(array[i], array[i - 1], array[i + 1]);

            array.splice(i - 1, 3);
            array.splice(i - 1, 0, numOfOperation)
        }
    }

    return array;
    
}

// variables for function, I didn't know how else to do this sorry future me
let displayed = '';
let buttonPushed = '';
let number = '';
let numbers = [];


function display(text) {
    const display = document.querySelector('.screen');
            display.textContent = text;
            
}

function clearDisplay() {
    displayed = ''
    numbers = [];
}

//adds event listener to the buttons
function btnListen() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {

            if (button.id === 'AC') {
                clearDisplay();
                display(displayed);
            } else if (button.id === '=') {

                numbers = arrangeNumber(numbers);
                numbers = arrangeArrayWithOperation(numbers);

                display(operateArray(numbers));
                clearDisplay();
            } else if (button.id === 'delete') {
                let lastChar = displayed.substring(displayed.length - 1)
                let index = numbers.length - 1;
                numbers.splice(index,1);
                displayed = displayed.substring(0, displayed.length-1);
                display(displayed);
            } else {
            buttonPushed = button.id;
            numbers.push(buttonPushed);
            displayed += buttonPushed;
            display(displayed);
            }
        })
    });
}

window.addEventListener('keydown', (event) => {

    if(event.key === 'Enter') {
        numbers = arrangeNumber(numbers);
        numbers = arrangeArrayWithOperation(numbers);

        display(operateArray(numbers));
        clearDisplay();
    } else if (event.key === 'Backspace') {
        let lastChar = displayed.substring(displayed.length - 1)
        let index = numbers.length - 1;
        numbers.splice(index,1);
        displayed = displayed.substring(0, displayed.length-1);
        display(displayed);
    } else {
        console.log(isNaN(event.key) );
        if (isNaN(event.key) === false || event.key === '+' || event.key === '-' || event.key === 'x' || event.key === '/') {
            console.log(event.key);
            numbers.push(event.key);
            displayed += event.key;
            display(displayed);
        }
    }
});


btnListen();


