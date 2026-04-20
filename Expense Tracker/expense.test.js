test('add expense', () => {
  const t = new ExpenseTracker(); t.expenses = [];
  t.add({desc:'Test',amt:'100',cat:'Food'});
  expect(t.expenses[0].amt).toBe(100);
});
test('remove expense', () => {
  const t = new ExpenseTracker(); t.expenses = [{id:1}];
  t.del(1); expect(t.expenses.length).toBe(0);
});
test('total', () => {
  const t = new ExpenseTracker(); t.expenses = [{amt:100}];
  expect(t.total()).toBe(100); 
});
test('filter', () => {
  const t = new ExpenseTracker(); t.expenses = [{cat:'Food'}];
  expect(t.filter('Food').length).toBe(1);
});