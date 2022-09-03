const buttons = document.querySelector('.buttons');
// Nodelist of buttons
const eachButton = buttons.querySelectorAll('.button');

function numValidate(a, b) {
  if (typeof a === 'number' && typeof b === 'number') return true;
  return false;
}

function add(a, b) {
  if (numValidate(a, b) === true) return a + b;
  return;
}

function subtract(a, b) {
  if (numValidate(a, b) === true) return a - b;
  return;
}

function multiply(a, b) {
  if (numValidate(a, b) === true) return a * b;
  return;
}

function divide(a, b) {
  if (numValidate(a, b) === true) return a / b;
  return;
}

// Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.
function operate(func, num1, num2) {
  if (num1 && num2 && typeof num1 === 'number' && typeof num2 === 'number') {
    return func(num1, num2);
  }
  return;
}

// Create the functions that populate the display when you click the number buttons.
function renderDisplay(entry) {
  storeValue(entry);
  const display = document.querySelector('.display');
  display.textContent = entry;
}

// You should be storing the ‘display value’ in a variable somewhere for use in the next step.
function storeValue(num) {
  const storedNum = [];
  storedNum.push(num);
  console.log(storedNum);
}

// Event listeners
eachButton.forEach(button =>
  button.addEventListener('click', e => {
    return renderDisplay(e.target.value);
  }),
);
