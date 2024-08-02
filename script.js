let tasks = [];

document.querySelector(".button button").addEventListener("click", function() {
  const task = document.querySelector(".add-task-form input").value.trim();
  if (!task) return;
  document.querySelector(".add-task-form input").value = "";
  const id = +new Date();
  addNewTask({
    task,
    id,
    done: false
  });
  tasks.push({
    task,
    id,
    done: false
  });
  saveTodos();
});

function addNewTask({ task, id, done }) {
  const todoContainer = document.querySelector(".todos");
  const taskNode = document.createElement("div");
  taskNode.classList.add("task");
  taskNode.innerHTML = `
    <div class="task">
      <div class="input">
        <input type="checkbox" id="todo-task-${id}">
        <label for="todo-task-${id}">
          <i class="fa fa-check"></i>
        </label>
      </div>
      <div class="name"></div>
      <div class="control">
        <button>
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </div>
  `;
  taskNode.querySelector(".name").innerText = task;
  taskNode.querySelector(".input input").addEventListener("change", function(e) {
    taskNode.classList.toggle("done");
    tasks.forEach(t => {
      if (t.id == id) {
        t.done = e.target.checked;
      }
    });
    updateTaskCount();
    saveTodos();
  });
  taskNode.querySelector(".control button").addEventListener("click", function(e) {
    taskNode.remove();
    tasks = tasks.filter(t => t.id !== id);
    updateTaskCount();
    saveTodos();
  });
  todoContainer.append(taskNode);
  if (done) {
    taskNode.classList.add("done");
    taskNode.querySelector("input").checked = true;
  }
  updateTaskCount();
}

function updateTaskCount() {
  const totalTasks = document.querySelectorAll(".todos .task").length;
  const completedTasks = document.querySelectorAll(".todos .task.done").length;
  const bannerSpanEl = document.querySelectorAll(".banner span");
  bannerSpanEl[0].innerText = completedTasks;
  bannerSpanEl[2].innerText = totalTasks/2;
}

function init() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem("todos-data"));
    if (Array.isArray(savedTodos)) {
      tasks = savedTodos;
      tasks.forEach(task => {
        addNewTask(task);
      });
    }
  } catch (error) {
    console.error("Failed to parse saved todos:", error);
  }
  updateTaskCount();
}

function saveTodos() {
  localStorage.setItem("todos-data", JSON.stringify(tasks));
}

init();
