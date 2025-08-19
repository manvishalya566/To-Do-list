const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks when page loads
document.addEventListener("DOMContentLoaded", loadTasks);
addBtn.addEventListener("click", addTask);

// Add task (CREATE)
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  createTaskElement(taskText);
  saveTasks();
  taskInput.value = "";
}

// Create task element
function createTaskElement(taskText) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;
  span.classList.add("task");

  // Buttons
  const btnGroup = document.createElement("div");
  btnGroup.classList.add("btn-group");

  // Edit button (UPDATE)
  const editBtn = document.createElement("button");
  editBtn.innerHTML = "✏️";
  editBtn.title = "Edit Task";
  editBtn.addEventListener("click", function () {
    const newTask = prompt("Edit your task:", span.textContent);
    if (newTask && newTask.trim() !== "") {
      span.textContent = newTask.trim();
      saveTasks();
    }
  });

  // Delete button (DELETE)
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.title = "Delete Task";
  deleteBtn.addEventListener("click", function () {
    li.remove();
    saveTasks();
  });

  btnGroup.appendChild(editBtn);
  btnGroup.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(btnGroup);
  taskList.appendChild(li);
}

// Save tasks in localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push(li.querySelector(".task").textContent);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage (READ)
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task));
}
