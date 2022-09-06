const buttons = document.querySelector('.buttons');
const buttonNodeList = buttons.querySelectorAll('.button');
const display = document.querySelector('.display');
let stack = []; // Operands array
let operators = []; // Operators array
let subStack = [];

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

// Check if the value is a number or an operand
function isOperator(value) {
  const operatorsObject = {
    multiply: '*',
    divide: '/',
    add: '+',
    subtract: '-',
  };

  for (let key in operatorsObject) {
    if (value === operatorsObject[key]) return true;
  }
  return false;
}

// Create the functions that populate the display when you click the number buttons.
function renderDisplay(entry) {
  const num = storeInput(entry);
  display.textContent = num;
}

// You should be storing the ‘display value’ in a variable somewhere for use in the next step.
function storeInput(val) {
  for (let i = 0; i < val.length; i++) {
    let value = val[i];
    if (isOperator(value)) {
      operators.push(value);
    } else if (!isOperator(value) && operators.length > 0) {
      subStack.push(value);
    } else {
      stack.push(value);
    }

    if (val === '=') {
      return operate(operators[0], stack.join(''), subStack.join(''));
    }
  }
}

// Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.
function operate(operatorFunc, num1, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  switch (operatorFunc) {
    case '*':
      return multiply(num1, num2);
    case '/':
      if (num2 === 0) display.textContent === 'Not a number.';
      else return divide(num1, num2);
    case '+':
      return add(num1, num2);
    case '-':
      return subtract(num1, num2);
    default:
      undefined;
  }
}

// Event listeners
buttonNodeList.forEach(button =>
  button.addEventListener('click', e => renderDisplay(e.target.value)),
);
