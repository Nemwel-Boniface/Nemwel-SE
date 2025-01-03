const allTasks = document.querySelector(".all-tasks");
const pendingTasks = document.querySelector(".Pending-tasks");
const doneTasks = document.querySelector(".done-tasks");
const addTask = document.querySelector(".add-tasks");

const getTasksFromLocalStorage = () => {
  let localTasks = localStorage.getItem("tasks");
  if(localTasks) {
    let tasks = JSON.parse(localTasks);
    return tasks;
  } else {
    return "You currently do not have any tasks"
  }
}

window.addEventListener("load", () => 
getTasksFromLocalStorage()
)