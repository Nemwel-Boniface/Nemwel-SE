const allTasks = document.querySelector(".all-tasks");
const pendingTasks = document.querySelector(".Pending-tasks");
const doneTasks = document.querySelector(".done-tasks");
const addTask = document.querySelector(".add-tasks");

// Add Task form
const addTasksPage = document.querySelector(".addTasksPage");
const addTaskForm = document.querySelector(".addTaskForm");
const titleInput = document.querySelector(".titleInput").value;
const descriptionInput = document.querySelector(".descriptionInput").value;
const dateInput = document.querySelector(".dateInput").value;
const addTaskBtn = document.querySelector(".addTaskBtn");

const getTasksFromLocalStorage = () => {
  let localTasks = localStorage.getItem("tasks");
  if(localTasks) {
    let tasks = JSON.parse(localTasks);
    console.log(tasks);
  } else {
    return "You currently do not have any tasks";
  }
}

addTaskBtn.addEventListener("click", () => {
  let formData = {
    id: 1,
    title: titleInput,
    description: descriptionInput,
    deadline: dateInput,
    status: false
  }
  localStorage.setItem("tasks", JSON.stringify(formData))
})


addTask.addEventListener("click", () => {
  addTasksPage.classList.add("active");
})

window.addEventListener("load", () => 
getTasksFromLocalStorage()
)