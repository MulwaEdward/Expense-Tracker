// npm test
class Expense { constructor({desc,amt,cat}){this.id=1;this.desc=desc;this.amt=+amt;this.cat=cat;} }
class ExpenseTracker {
  constructor(){this.expenses=[];}
  add({desc,amt,cat}){this.expenses=[new Expense({desc,amt,cat}),...this.expenses];}
  del(id){this.expenses=this.expenses.filter(e=>e.id!==id);}
  filter(cat){return cat?this.expenses.filter(e=>e.cat===cat):this.expenses;}
  total(lst){return lst.reduce((s,{amt})=>s+amt,0);}
}
test('add', () => {
  let t = new ExpenseTracker();
  t.add({desc:'Test',amt:10,cat:'Food'});
  expect(t.expenses[0].amt).toBe(10);
});
test('del', () => {
  let t = new ExpenseTracker(); t.expenses=[{id:1}];
  t.del(1); expect(t.expenses).toHaveLength(0);
});
test('total', () => {
  let t = new ExpenseTracker(); t.expenses=[{amt:10}];
  expect(t.total()).toBe(10);
});
test('filter', () => {
  let t = new ExpenseTracker(); t.expenses=[{cat:'Food'},{cat:'Food'}];
  expect(t.filter('Food')).toHaveLength(2);
});
