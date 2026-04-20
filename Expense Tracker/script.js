class Expense {
  constructor({desc, amt, cat}) {
    this.id = Date.now();
    this.desc = desc;
    this.amt = +amt;
    this.cat = cat; 
  }
}

class ExpenseTracker {
  constructor() {
    this.expenses = JSON.parse(localStorage.getItem('exp')) || [];  // FIXED
    this.show();
  }
  add(data) {
    this.expenses = [new Expense(data), ...this.expenses];
    localStorage.setItem('exp', JSON.stringify(this.expenses));
    this.show();
  }
  del(id) {
    this.expenses = this.expenses.filter(e => e.id !== id);
    localStorage.setItem('exp', JSON.stringify(this.expenses));
    this.show();
  }
  filter(cat) {
    return cat ? this.expenses.filter(e => e.cat === cat) : this.expenses;
  }
  total(lst=this.expenses) {
    return lst.reduce((sum, {amt}) => sum + amt, 0);
  }
  show() {
    let cat = document.getElementById('f')?.value || '';
    let lst = this.filter(cat);
    document.getElementById('l').innerHTML = lst.map(e => 
      `<li class="flex justify-between items-center p-3 bg-gray-50 rounded">
        <span>${e.desc}: KSh ${e.amt} (${e.cat})</span>
        <button onclick="tracker.del(${e.id})" class="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
      </li>`
    ).join('');
    document.getElementById('t').textContent = `Total: KSh ${this.total(lst).toFixed(2)}`;
  }
}
const tracker = new ExpenseTracker();

function add() {
  const desc = document.getElementById('d').value;
  const amt = document.getElementById('a').value;
  const cat = document.getElementById('c').value;
  if (desc && amt) tracker.add({desc, amt, cat});
  document.getElementById('d').value = '';
  document.getElementById('a').value = '';
  document.getElementById('c').value = '';
}