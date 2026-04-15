class Expense {
constructor({desc, amount, category }) {
   this.id = Date.now();
   this.desc = desc;
   this.amount = parseFloat(amount);
   this.category = category; 
  }
}
class ExpenseTracker {
constructor() {
    this.expense = JSON.parse(localStorage.getItem(`expense`)) || [];
    this.render();
}
  add({ desc, amount, category }) {
    const expense = new Expense({ desc, amount, category });
    this.expenses = [expense, ...this.expenses];  // Spread operator
    this.save();
    this.render();
}
remove(id) {
    this.expenses = this.expenses.filter(exp => exp.id !== id);  // Filter
    this.save();
    this.render();
}

getFiltered(category) {
    return category ? this.expense.filter(exp => exp.category === category) :
this.expense
}

  getTotal(expenses = this.expenses) {
    return expenses.reduce((sum, { amount }) => sum + amount, 0);  // Destructure + Reduce
}

save() {
        localStorage.setItem('expenses', JSON.stringify(this.expenses));
}
  render(filtered = this.expenses) {
    const list = document.getElementById('expenseList');
    const totalEl = document.getElementById('total');
    list.innerHTML = filtered.map(exp => `
      <li class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
        <span>${exp.desc} - KSh ${exp.amount} (${exp.category})</span>
        <button onclick="tracker.remove(${exp.id})" class="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Delete</button>
</li>
    `).join('');  // Map
    totalEl.textContent = `Total: KSh ${this.getTotal(filtered).toFixed(2)}`;
  }
}

const tracker = new ExpenseTracker();

// Form submit
document.getElementById('expenseForm').addEventListener('submit', e => {
  e.preventDefault();
  const [desc, amount, category] = ['desc', 'amount', 'category'].map(id => document.getElementById(id).value);  // Destructure + map
  if (desc && amount && category) tracker.add({ desc, amount, category });
  e.target.reset();
});
// Filter
document.getElementById('filterCat').addEventListener('change', e => {
  const filtered = tracker.getFiltered(e.target.value);
  tracker.render(filtered);
});
