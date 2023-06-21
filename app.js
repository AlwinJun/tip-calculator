// console.log('test');

// DOM elements
const bill = document.getElementById('bill');
const customTip = document.getElementById('custom-tip');
const personCount = document.getElementById('person-count');
const tipBtns = document.querySelectorAll('.tip-btns');
const tipPerson = document.getElementById('tip-person');
const tipTotal = document.getElementById('tip-total');
const resetBtn = document.getElementById('reset');
const warningBill = document.querySelector('.warning-bill');
const warningCustom = document.querySelector('.warning-custom');
const warningCount = document.querySelector('.warning-count');

// Initial Value
let billAmount = 0;
let tip = 0;
let numberOfPeople = 1;

// Event Listeners
bill.addEventListener('keyup', bills);
customTip.addEventListener('keyup', customTips);
personCount.addEventListener('keyup', personCounts);
tipBtns.forEach((btn) => btn.addEventListener('click', tipButtons));
resetBtn.addEventListener('click', resetTipCalculator);

// Event Handlers
function bills(e) {
  billAmount = parseFloat(e.target.value);
  validateInput(billAmount, bill, warningBill);
  displayTipPerson();
}

function customTips(e) {
  removeTipBtnStyle();
  tip = parseFloat(e.target.value);
  validateInput(tip, customTip, warningCustom);
  displayTipPerson();
}

function personCounts(e) {
  numberOfPeople = parseInt(e.target.value);
  validateInput(numberOfPeople, personCount, warningCount);
  displayTipPerson();
}

function tipButtons(e) {
  customTip.value = '';
  tip = parseFloat(e.target.dataset.id);
  removeTipBtnStyle();
  e.target.classList.add('clicked');
  displayTipPerson();
}

// Utility Fucntion
function validateInput(inputVal, inputEl, errMessage) {
  //check if lesser than 0 or not a number
  if (inputVal <= 0 || isNaN(inputVal)) {
    inputEl.classList.add('warning-red');
    errMessage.innerText =
      inputVal <= 0 ? ` Can't be  zero or less ` : 'Numbers only';
    // 1sec delay to show warning message
    setTimeout(() => {
      resetTipCalculator();
    }, 1000);
  } else {
    inputEl.classList.remove('warning-red');
    errMessage.innerText = '';
  }
}

function displayTipPerson() {
  let tipAmount = parseFloat(billAmount * (tip / 100).toFixed(2));
  let totalAmount = billAmount + tipAmount;
  let tipPerPerson = parseFloat(
    (tipAmount / numberOfPeople).toFixed(3).slice(0, -1)
  ); //slice the 3rd decimal

  tipPerson.innerText = `$${tipPerPerson}`;

  let total = totalAmount / numberOfPeople;
  tipTotal.innerText = `$${parseFloat(total.toFixed(2))}`;
}

function resetTipCalculator() {
  bill.value = '';
  bill.classList.remove('warning-red');
  warningBill.innerText = '';
  customTip.value = '';
  customTip.classList.remove('warning-red');
  warningCustom.innerText = '';
  personCount.value = '';
  personCount.classList.remove('warning-red');
  warningCount.innerText = '';
  tipPerson.innerText = '$0.00';
  tipTotal.innerText = '$0.00';
  removeTipBtnStyle();
  billAmount = 0;
  tip = 0;
  numberOfPeople = 1;
}

function removeTipBtnStyle() {
  tipBtns.forEach((btn) => btn.classList.remove('clicked'));
}
