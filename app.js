// console.log('test');

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

let billAmount = 0;
let tip = 0;
let numberOfPeople = 1;

bill.addEventListener('keyup', (e) => {
  billAmount = e.target.value;
  billAmount = Number(billAmount);
  validateInput(billAmount, bill, warningBill);
  displayTipPerson();
});

customTip.addEventListener('keyup', (e) => {
  removeTipBtnStyle();
  tip = e.target.value;
  tip = Number(tip);
  validateInput(tip, customTip, warningCustom);
  displayTipPerson();
});

personCount.addEventListener('keyup', (e) => {
  numberOfPeople = e.target.value;
  numberOfPeople = Number(numberOfPeople);
  validateInput(numberOfPeople, personCount, warningCount);
  displayTipPerson();
});

tipBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    customTip.value = '';
    tip = e.target.dataset.id;
    tip = Number(tip);

    removeTipBtnStyle();

    btn.classList.add('clicked');
    displayTipPerson();
  });
});

resetBtn.addEventListener('click', resetTipCalculator);

function validateInput(inputVal, inputEl, errMessage) {
  //check if lesser than 0
  if (inputVal <= 0) {
    inputEl.classList.add('warning-red');
    errMessage.innerText = `Can't be  zero or less `;
  } else {
    const regex = /\d+/;
    //Check if not number
    if (!regex.test(inputVal)) {
      inputEl.classList.add('warning-red');
      errMessage.innerText = 'Numbers only';
      billAmount = 0;
      tip = 0;
      numberOfPeople = 1;
    } else {
      inputEl.classList.remove('warning-red');
      errMessage.innerText = '';
    }
  }
}

function displayTipPerson() {
  let tipAmount = billAmount * (tip / 100);
  tipAmount = parseFloat(tipAmount.toFixed(2));
  let totalAmount = billAmount + tipAmount;
  let tipPerPerson = tipAmount / numberOfPeople;
  tipPerPerson = parseFloat(tipPerPerson.toFixed(3).slice(0, -1)); //slice the 3rd decimal

  tipPerson.innerText = '$' + tipPerPerson;

  let total = totalAmount / numberOfPeople;
  tipTotal.innerText = '$' + parseFloat(total.toFixed(2));
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
