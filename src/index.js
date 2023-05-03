import './styles.css';

// Define the tasks as an array of objects, each representing a task
const tasks = [
  {
    description: 'Buy milk',
    completed: false,
    index: 1,
  },
  {
    description: 'Do laundry',
    completed: true,
    index: 2,
  },
  {
    description: 'Clean the house',
    completed: false,
    index: 3,
  },
];

// Define a function that renders the tasks onto the screen
function renderTasks() {
  // Get the HTML element that will contain the tasks
  const todoList = document.getElementById('todo-list');
  // Clear the HTML element of any previous content
  todoList.innerHTML = '';

  // Sort the tasks by their index, so they appear in order
  tasks.sort((a, b) => a.index - b.index);

  // Loop through each task, create an HTML element for it, and add it to the todoList
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.innerHTML = task.description;
    // If the task is completed, add a class to the HTML element to show that
    if (task.completed) {
      li.classList.add('completed');
    }
    todoList.appendChild(li);
  });
}

// Call the function to initially render the tasks on the screen
renderTasks();
