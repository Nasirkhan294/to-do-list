import {
  tasks, addTask, deleteTask, editTask, saveTasks,
} from './tasks.js';

const newTaskInput = document.getElementById('new-task');
const todoList = document.getElementById('todo-list');

const populateList = () => {
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
};

document.querySelector('.add-task .btn').addEventListener('click', () => {
  const description = newTaskInput.value.trim();
  if (description) {
    addTask(description);
    populateList();
    newTaskInput.value = '';
  }
});

document.querySelector('button[type="reset"]').addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  tasks.forEach((task, index) => {
    task.index = index;
  });
  saveTasks();
  populateList();
});

export default populateList();
