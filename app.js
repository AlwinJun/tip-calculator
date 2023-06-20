// console.log('test');

const bill = document.getElementById('bill');
const customTip = document.getElementById('custom-tip');
const personCount = document.getElementById('person-count');
const tipBtns = document.querySelectorAll('.tip-btns');
const tipPerson = document.getElementById('tip-person');
const tipTotal = document.getElementById('tip-total');
const resetBtn = document.getElementById('reset');

let billAmount = 0;
let tip = 0;
let numberOfPeople = 1;

bill.addEventListener('keyup', (e) => {
  billAmount = e.target.value;
  billAmount = Number(billAmount);
  displayTipPerson();
});

customTip.addEventListener('keyup', (e) => {
  removeTipBtnStyle();
  tip = e.target.value;
  tip = Number(tip);
  displayTipPerson();
});

personCount.addEventListener('keyup', (e) => {
  numberOfPeople = e.target.value;
  numberOfPeople = Number(numberOfPeople);
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
  customTip.value = '';
  personCount.value = '';
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
