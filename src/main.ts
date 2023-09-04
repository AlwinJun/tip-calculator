import './style.css';
// console.log('test');

// DOM elements
const bill = document.getElementById('bill') as HTMLInputElement;
const customTip = document.getElementById('custom-tip') as HTMLInputElement;
const personCount = document.getElementById('person-count') as HTMLInputElement;
const tipBtns = document.querySelectorAll('.tip-btns') as NodeListOf<HTMLButtonElement>;
const tipPerson = document.getElementById('tip-person') as HTMLDivElement;
const tipTotal = document.getElementById('tip-total') as HTMLDivElement;
const resetBtn = document.getElementById('reset') as HTMLButtonElement;
const warningBill = document.querySelector('.warning-bill') as HTMLParagraphElement;
const warningCustom = document.querySelector('.warning-custom') as HTMLParagraphElement;
const warningCount = document.querySelector('.warning-count') as HTMLParagraphElement;

// Initial Value
let billAmount: number = 0;
let tip: number = 0;
let numberOfPeople: number = 1;

// Event Listeners
bill.addEventListener('keyup', bills);
customTip.addEventListener('keyup', customTips);
personCount.addEventListener('keyup', personCounts);
tipBtns.forEach((btn) => btn.addEventListener('click', tipButtons));
resetBtn.addEventListener('click', resetTipCalculator);

// Event Handlers
function bills(e: Event): void {
  billAmount = parseFloat((e.target as HTMLInputElement).value);
  validateInput(billAmount, bill, warningBill);
  displayTipPerson();
}

function customTips(e: Event): void {
  removeTipBtnStyle();
  tip = parseFloat((e.target as HTMLInputElement).value);
  validateInput(tip, customTip, warningCustom);
  displayTipPerson();
}

function personCounts(e: Event): void {
  numberOfPeople = parseInt((e.target as HTMLInputElement).value);
  validateInput(numberOfPeople, personCount, warningCount);
  displayTipPerson();
}

function tipButtons(e: Event): void {
  const target = e.target as HTMLInputElement;
  customTip.value = '';

  if (target.dataset.id) {
    tip = parseFloat(target.dataset.id);
  }

  removeTipBtnStyle();
  target.classList.add('clicked');
  displayTipPerson();
}

// Utility Fucntion
function validateInput(inputVal: number, inputEl: HTMLInputElement, errMessage: HTMLParagraphElement): void {
  //check if lesser than 0 or not a number
  if (inputVal <= 0 || isNaN(inputVal)) {
    inputEl.classList.add('warning-red');
    errMessage.innerText = inputVal <= 0 ? ` Can't be  zero or less ` : 'Numbers only';
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
  let tipAmount: number = billAmount * parseFloat((tip / 100).toFixed(2));
  let totalAmount: number = billAmount + tipAmount;
  let tipPerPerson: number = parseFloat((tipAmount / numberOfPeople).toFixed(3).slice(0, -1)); //slice the 3rd decimal

  tipPerson.innerText = `$${tipPerPerson}`;

  let total: number = totalAmount / numberOfPeople;
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

