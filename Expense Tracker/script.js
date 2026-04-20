class Expense {
constructor({desc, amt, cat}) {
   this.id = Date.now();
   this.desc = desc;
   this.amt = +amt;
   this.cat = cat; 
  }
}
//OOP: ExpenseTracker class
class ExpenseTracker {
constructor() {
    this.expense = JSON.parse(localStorage.getItem(`exp`)) || []; //LocalStorage
    this.show();
}
  add(data) { //Destructuring in caller

    this.expenses = [new Expense(data), ...this.expenses];  // Spread + OOP
    localStorage.setItem('exp', JSON.stringify(this.expenses));
    this.show();
  }

del(id) {
    this.expenses = this.expenses.filter(e => e.id !== id);  // Filter
    localStorage.setItem('exp', JSON.stringify(this.expenses));
    this.show();
  }
filter(cat) {
    return cat ? this.expenses.filter(e => e.cat === cat) : this.expenses;
  }
  total(lst) {
    return lst.reduce((sum, {amt}) => sum + amt, 0);  // Reduce + Destructuring
  }
  show(cat = document.getElementById('f').value) {
    let lst = this.filter(cat);
    document.getElementById('l').innerHTML = lst.map(e => 
      `<li class="flex justify-between items-center p-3 bg-gray-50 rounded">
        <span>${e.desc}: KSh ${e.amt} (${e.cat})</span>
        <button onclick="tracker.del(${e.id})" class="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Delete</button>
      </li>`
    ).join('');  // Map
    document.getElementById('t').textContent = `Total: KSh ${this.total(lst).toFixed(2)}`;
  }
}
const tracker = new ExpenseTracker();

// Global add() function (matches onclick)
function add() {
  const [desc, amt, cat] = ['d', 'a', 'c'].map(id => document.getElementById(id).value);
  if (desc && amt) tracker.add({desc, amt, cat});
  document.getElementById('d').value = document.getElementById('a').value = document.getElementById('c').value = '';
}