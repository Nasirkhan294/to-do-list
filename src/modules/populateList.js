import {
  tasks, addTask, deleteTask, editTask, saveTasks,
} from './tasks.js';

const newTaskInput = document.getElementById('new-task');
const todoList = document.getElementById('todo-list');
const alertElement = document.getElementById('alert');

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
    const spanElement = taskElement.querySelector('span');
    checkbox.addEventListener('change', () => {
      spanElement.classList.toggle('checked');
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
      const taskDescription = taskElement.querySelector('span');
      taskDescription.setAttribute('contentEditable', true);
      taskDescription.focus();
      taskDescription.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          // prevent default submitting behavior
          event.preventDefault();
          const newDescription = taskDescription.innerText.trim();
          editTask(task.index, newDescription);
          populateList();
          taskDescription.setAttribute('contentEditable', false);
        } else if (event.key === 'Escape') {
          // prevent default closing behavior
          event.preventDefault();
          taskDescription.innerText = task.description;
          taskDescription.setAttribute('contentEditable', false);
        }
      });
    });
    todoList.appendChild(taskElement);
  });
};

document.querySelector('.add-task .btn').addEventListener('click', () => {
  const description = newTaskInput.value;
  if (description === '') {
    alertElement.style.display = 'flex';
  } else {
    addTask(description.trim());
    populateList();
    newTaskInput.value = '';
    alertElement.style.display = 'none';
  }
});

document.querySelector('#reset').addEventListener('click', () => {
  const updatedTasks = tasks.filter((task) => !task.completed);
  updatedTasks.forEach((task, index) => {
    task.index = index + 1;
  });
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  document.location.reload();
});

export default populateList();
