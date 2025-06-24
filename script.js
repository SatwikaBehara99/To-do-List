let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const addBtn = document.getElementById("add-task");

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "pending") return !task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <div class="info">
        ${task.text}
        <span>${task.completed ? '✅ Done' : '❌ Not Done'}</span>
      </div>
      <div class="actions">
        <button onclick="toggleStatus(${index})">${task.completed ? '↩️ Undo' : '✅ Done'}</button>
        <button onclick="editTask(${index})">✏️ Edit</button>
        <button onclick="deleteTask(${index})">❌ Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const value = taskInput.value.trim();
  if (value) {
    tasks.push({ text: value, completed: false });
    taskInput.value = "";
    updateLocalStorage();
    renderTasks();
  }
}

function toggleStatus(index) {
  tasks[index].completed = !tasks[index].completed;
  updateLocalStorage();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    updateLocalStorage();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateLocalStorage();
  renderTasks();
}

function filterTasks(type) {
  currentFilter = type;
  renderTasks();
}

addBtn.addEventListener("click", addTask);
renderTasks();
