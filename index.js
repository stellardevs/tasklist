const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();

function loadEventListeners() {
  // DOM Load Event
  document.addEventListener("DOMContentLoaded", getTasks);
  //add task event
  form.addEventListener("submit", addTask);
  // remove task event
  taskList.addEventListener("click", removeTask);
  //Clear Task Event
  clearBtn.addEventListener("click", clearTasks);
  //filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

//Get tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    //create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // create text node and append to li
    li.appendChild(document.createTextNode(tasks));
    //create new link element
    const link = document.createElement("a");
    //add class
    link.className = "delete-item secondary-content";
    //Add Icon with HTML
    link.innerHTML = '<i class="fas fa-times"></i>';
    // append the link to the Li
    li.appendChild(link);
    //append Li to Ul
    taskList.appendChild(li);
  });
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }
  //create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element
  const link = document.createElement("a");
  //add class
  link.className = "delete-item secondary-content";
  //Add Icon with HTML
  link.innerHTML = '<i class="fas fa-times"></i>';
  // append the link to the Li
  li.appendChild(link);
  //append Li to Ul
  taskList.appendChild(li);
  //store in Local storage
  storeTaskInLocalStorage(taskInput.value);
  //clear input
  taskInput.value = "";

  e.preventDefault();
}
//Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Clear Task
function clearTasks(e) {
  //   taskList.innerHTML = "";

  //Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //Clear Tasks from LS
  clearTasksFromLocalStorage();
}

// Clears tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter

function filterTasks(e) {
  const text = e.target.value.toLowerCase(); // will give us whatever is being typed

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
