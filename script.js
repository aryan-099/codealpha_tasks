// Select elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const clearAllBtn = document.getElementById("clear-all");

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Handle form submit (Add task)
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  
  if (taskText === "") {
    alert("Task cannot be empty!");
    return;
  }

  addTask(taskText);
  taskInput.value = "";
});

// Add task function
function addTask(text, completed = false) {
  const li = document.createElement("li");
  li.className = `task ${completed ? "completed" : ""}`;
  
  li.innerHTML = `
    <span contenteditable="false">${text}</span>
    <div class="task-actions">
      <button class="complete">✔</button>
      <button class="edit">✏</button>
      <button class="delete">🗑</button>
    </div>
  `;
  
  // Handle buttons
  li.querySelector(".complete").addEventListener("click", () => toggleComplete(li));
  li.querySelector(".edit").addEventListener("click", () => editTask(li));
  li.querySelector(".delete").addEventListener("click", () => deleteTask(li));
  
  taskList.appendChild(li);
  saveTasks();
}

// Toggle complete
function toggleComplete(taskItem) {
  taskItem.classList.toggle("completed");
  saveTasks();
}

// Edit task
function editTask(taskItem) {
  const span = taskItem.querySelector("span");
  if (span.isContentEditable) {
    span.contentEditable = "false";
    saveTasks();
  } else {
    span.contentEditable = "true";
    span.focus();
  }
}

// Delete task
function deleteTask(taskItem) {
  if (confirm("Are you sure you want to delete this task?")) {
    taskItem.remove();
    saveTasks();
  }
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task").forEach((task) => {
    tasks.push({
      text: task.querySelector("span").innerText,
      completed: task.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach((task) => addTask(task.text, task.completed));
}

// Clear all tasks
clearAllBtn.addEventListener("click", () => {
  if (confirm("Delete all tasks?")) {
    taskList.innerHTML = "";
    localStorage.removeItem("tasks");
  }
});
