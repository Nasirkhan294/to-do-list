import './styles.css';
// Grab the elements from the HTML document
const inputTask = document.querySelector('#new-task');
const todoList = document.querySelector('#todo-list');
const addBtn = document.querySelector('.btn');
const alertElement = document.querySelector('.alert');

// Save the tasks in the local storage
const saveTask = () => {
  localStorage.setItem('tasks', todoList.innerHTML);
};

// Add a new task to the list
const addTask = () => {
  if (inputTask.value === '') {
    alertElement.style.display = 'flex';
    saveTask();
  } else {
    const li = document.createElement('li');
    li.textContent = inputTask.value;
    todoList.appendChild(li);
    const span = document.createElement('span');
    span.textContent = '\u00d7';
    li.appendChild(span);
    alertElement.style.display = 'none';
    saveTask();
  }
  inputTask.value = '';
};

// Toggle the "checked" class when clicking on a task
const toggleChecked = (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
    saveTask();
  }
};

// Remove a task when clicking on the delete button
const removeTask = (e) => {
  if (e.target.tagName === 'SPAN') {
    e.target.parentElement.remove();
    saveTask();
  }
};

// Show the tasks saved in the local storage
const showTasks = () => {
  try {
    todoList.innerHTML = localStorage.getItem('tasks');
  } catch (e) {
    console.log('Error getting tasks from local storage:', e);
  }
};

// Add event listeners
addBtn.addEventListener('click', addTask);
todoList.addEventListener('click', toggleChecked);
todoList.addEventListener('click', removeTask);

// Show the tasks when the page loads
showTasks();
