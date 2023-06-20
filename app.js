// console.log('test');

const bill = document.getElementById('bill');
const customTip = document.getElementById('custom-tip');
const personCount = document.getElementById('person-count');
const tipBtns = document.querySelectorAll('.tip-btns');
const tipPerson = document.getElementById('tip-person');
const tipTotal = document.getElementById('tip-total');
const reset = document.getElementById('reset');

let billAmount = 0;
let tip = 0;
let numberOfPeople = 1;

bill.addEventListener('keyup', (e) => {
  billAmount = e.target.value;
  billAmount = Number(billAmount);
  displayTipPerson();
});

customTip.addEventListener('keyup', (e) => {
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
    tip = e.target.dataset.id;
    tip = Number(tip);

    tipBtns.forEach((b) => {
      b.classList.remove('clicked');
    });

    btn.classList.add('clicked');
    displayTipPerson();
  });
});

function displayTipPerson() {
  let tipAmount = billAmount * (tip / 100);
  tipAmount = parseFloat(tipAmount.toFixed(2));
  totalAmount = billAmount + tipAmount;
  let tipPerPerson = tipAmount / numberOfPeople;
  tipPerPerson = parseFloat(tipPerPerson.toFixed(3).slice(0, -1)); //slice the 3rd decimal

  tipPerson.innerText = '$' + tipPerPerson;

  let total = totalAmount / numberOfPeople;
  tipTotal.innerText = '$' + parseFloat(total.toFixed(2));
}
