const todoList = require('../todo'); // Adjust the path as needed
const todos = todoList();

beforeEach(() => {
  // Reset the todo list before each test
  todos.all.length = 0;
});

test('Creating a new todo', () => {
  todos.add({ title: 'Test todo', dueDate: '2024-10-05', completed: false });
  expect(todos.all.length).toBe(1);
  expect(todos.all[0].title).toBe('Test todo');
});

test('Marking a todo as completed', () => {
  todos.add({ title: 'Test todo', dueDate: '2024-10-05', completed: false });
  todos.markAsComplete(0);
  expect(todos.all[0].completed).toBe(true);
});

test('Retrieving overdue items', () => {
  todos.add({ title: 'Overdue todo', dueDate: '2024-10-04', completed: false });
  todos.add({ title: 'Due today', dueDate: '2024-10-05', completed: false });
  expect(todos.overdue()).toEqual([
    { title: 'Overdue todo', dueDate: '2024-10-04', completed: false },
  ]);
});

test('Retrieving due today items', () => {
  todos.add({ title: 'Due today', dueDate: '2024-10-05', completed: false });
  expect(todos.dueToday()).toEqual([
    { title: 'Due today', dueDate: '2024-10-05', completed: false },
  ]);
});

test('Retrieving due later items', () => {
  todos.add({ title: 'Due later', dueDate: '2024-10-06', completed: false });
  expect(todos.dueLater()).toEqual([
    { title: 'Due later', dueDate: '2024-10-06', completed: false },
  ]);
});
