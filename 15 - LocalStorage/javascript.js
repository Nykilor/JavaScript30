const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
let items = JSON.parse(localStorage.getItem('items')) || [];
const checkButton = document.querySelector('[name=check]');
const resetButton = document.querySelector("[name=reset]")
let allFlag = false;

function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text,
    done: false
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  this[0].value = '';
}

function populateList(a = [], aList) {
  aList.innerHTML = a.map((plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}>
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
  }).join('');
}

function toggleDone(e) {
  if(!e.target.matches('input')) return;
  const index = e.target.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

function checkUncheckAll(e) {
  e.target.value = allFlag ? 'Check all' : 'Uncheck all';
  items.forEach(item => {
    if(!item.done && !allFlag) {
      item.done = !item.done;
    } else if (item.done && allFlag) {
      item.done = !item.done;
    }
  });
  allFlag = !allFlag;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

function resetList() {
  localStorage.removeItem('items');
  itemsList.innerHTML = '';
  items = [];
}

checkButton.addEventListener('click', checkUncheckAll);
resetButton.addEventListener('click', resetList);
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
populateList(items, itemsList);
