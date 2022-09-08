const currentDisplay = document.querySelector('[data-current]');
const previousDisplay = document.querySelector('[data-previous]');
const equals = document.querySelector('[data-equal');
const clear = document.querySelector('[data-all-clear]');
const deleteCurrent = document.querySelector('[data-delete]');
const numbers = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operator]');
const decimal = document.querySelector('[data-decimal]');
let currentNum = '';
let previousNum = '';
let operator = '';

function operate() {
  previousNum = Number(previousNum);
  currentNum = Number(currentNum);

  switch (operator) {
    case 'x':
      previousNum *= currentNum;
      convertNum();
      break;
    case '÷':
      if (currentNum <= 0) {
        previousNum = `Error!`;
        renderDisplay();
        break;
      }
      previousNum /= currentNum;
      convertNum();
      break;
    case '+':
      previousNum += currentNum;
      convertNum();
      break;
    case '-':
      previousNum -= currentNum;
      convertNum();
      break;
  }
}

function convertNum() {
  previousNum = roundNum(previousNum);
  previousNum = previousNum.toString();
  renderDisplay();
}

function numberHandler(number) {
  if (previousNum !== '' && currentNum !== '' && operator === '') {
    previousNum = '';
    currentDisplay.textContent = currentNum;
  }
  if (currentNum.length <= 9) {
    currentNum += number;
    currentDisplay.textContent = currentNum;
  }
}

function operatorHandler(op) {
  if (previousNum === '') {
    previousNum = currentNum;
    validateOperator(op);
  } else if (currentNum === '') {
    validateOperator(op);
  } else {
    operate();
    operator = op;
    currentDisplay.textContent = '';
    previousDisplay.textContent = previousNum + ' ' + operator;
  }
}

function validateOperator(op) {
  operator = op;
  previousDisplay.textContent = previousNum + ' ' + operator;
  currentDisplay.textContent = '';
  currentNum = '';
}

function roundNum(num) {
  return Math.round(num * 100000) / 100000;
}

function addDecimal() {
  if (!currentNum.includes('.')) {
    currentNum += '.';
    currentDisplay.textContent = currentNum;
  }
}

function renderDisplay() {
  if (previousNum.length <= 9) {
    currentDisplay.textContent = previousNum;
  } else {
    currentDisplay.textContent = previousNum.slice(0, 9) + '...';
  }
  previousDisplay.textContent = '';
  operator = '';
  currentNum = '';
}

function clearCalc() {
  currentNum = '';
  previousNum = '';
  operator = '';
  currentDisplay.textContent = '0';
  previousDisplay.textContent = '';
}

function deleteCurrentOperand() {
  currentDisplay.textContent = '0';
  currentNum = '';
}

function handleDelete() {
  if (currentNum !== '') {
    currentNum = currentNum.slice(0, -1);
    currentDisplay.textContent = currentNum;
    if (currentNum === '') {
      currentDisplay.textContent = '0';
    }
  }
  if (currentNum === '' && previousNum !== '' && operator === '') {
    previousNum = previousNum.slice(0, -1);
    currentDisplay.textContent = previousNum;
  }
}

equals.addEventListener('click', () => {
  if (currentNum != '' && previousNum != '') {
    operate();
  }
});

clear.addEventListener('click', clearCalc);
numbers.forEach(btn => {
  btn.addEventListener('click', e => {
    numberHandler(e.target.textContent);
  });
});

operators.forEach(btn => {
  btn.addEventListener('click', e => {
    operatorHandler(e.target.textContent);
  });
});

decimal.addEventListener('click', () => {
  addDecimal();
});

deleteCurrent.addEventListener('click', e => {
  deleteCurrentOperand();
});
