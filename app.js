// console.log('test');

let bill = document.getElementById('bill');
const customTip = document.getElementById('custom-tip');
const personCount = document.getElementById('person-count');
const tipBtns = document.querySelectorAll('.tip-btns');
const tipPerson = document.getElementById('tip-person');
const tipTotal = document.getElementById('tip-total');
const reset = document.getElementById('reset');

let billAmount;
let tip;
let numberOfPeople = 1;

bill.addEventListener('keyup', (e) => {
  billAmount = e.target.value;
  billAmount = Number(billAmount);
});

customTip.addEventListener('keyup', (e) => {
  custom = e.target.value;
});

personCount.addEventListener('keyup', (e) => {
  numberOfPeople = e.target.value;
  numberOfPeople = Number(numberOfPeople);
  displayTipPerson();
});

tipBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    tip = e.target.dataset.id;
    tip = Number(tip);

    tipBtns.forEach((b) => {
      b.classList.remove('clicked');
    });

    btn.classList.add('clicked');
    displayTipPerson();
  });
});

let totalAmount;

function displayTipPerson() {
  let tipAmount = billAmount * (tip / 100);
  tipAmount = parseFloat(tipAmount.toFixed(2));
  totalAmount = billAmount + tipAmount;
  let tipPerPerson = tipAmount / numberOfPeople;
  tipPerPerson = parseFloat(tipPerPerson.toFixed(3).slice(0, -1)); //slice the 3rd decimal
  tipPerson.innerText = tipPerPerson;
}
