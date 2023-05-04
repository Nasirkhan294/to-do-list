import './styles.css';

// Retrieve the tasks array from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Get DOM elements
const newTaskInput = document.getElementById('new-task');
const todoList = document.getElementById('todo-list');

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a new task
function addTask(description) {
  const task = {
    description,
    completed: false,
    index: tasks.length,
  };
  tasks.push(task);
  saveTasks();
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  // Update indexes of remaining tasks
  for (let i = index; i < tasks.length; i += 1) {
    tasks[i].index = i;
  }
  saveTasks();
}

// Function to edit a task's description
function editTask(index, newDescription) {
  tasks[index].description = newDescription;
  saveTasks();
}

// Populate the To Do List with the existing tasks
function populateList() {
  todoList.innerHTML = '';
  tasks.forEach((task) => {
    const taskElement = document.createElement('li');
    taskElement.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <span>${task.description}</span>
      <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="delete"><i class="fa-solid fa-trash"></i></button>
    `;
    const checkbox = taskElement.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      task.completed = !task.completed;
      saveTasks();
    });
    const deleteButton = taskElement.querySelector('.delete');
    deleteButton.addEventListener('click', () => {
      deleteTask(task.index);
      populateList();
    });
    const editButton = taskElement.querySelector('.edit');
    editButton.addEventListener('click', () => {
      const newDescription = prompt('Enter a new description:', task.description);
      if (newDescription) {
        editTask(task.index, newDescription);
        populateList();
      }
    });
    todoList.appendChild(taskElement);
  });
}

// Add event listener to the "Add" button
document.querySelector('.add-task .btn').addEventListener('click', () => {
  const description = newTaskInput.value.trim();
  if (description) {
    addTask(description);
    populateList();
    newTaskInput.value = '';
  }
});

// Add event listener to the "Clear all completed" button
document.querySelector('button[type="reset"]').addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  tasks.forEach((task, index) => {
    task.index = index;
  });
  saveTasks();
  populateList();
});

// Populate the list on page load
populateList();
