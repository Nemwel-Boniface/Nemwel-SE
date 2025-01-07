const allTasks = document.querySelector(".all-tasks");
const pendingTasks = document.querySelector(".Pending-tasks");
const doneTasks = document.querySelector(".done-tasks");
const addTask = document.querySelector(".add-tasks");

// Add Task form
const addTasksPage = document.querySelector(".addTasksPage");
const addTaskForm = document.querySelector(".addTaskForm");
const addTaskBtn = document.querySelector(".addTaskBtn");

// List all Tasks
const listAllTasks = document.querySelector(".listAllTasks");

let tasksArray = [];

// Function to get tasks from localStorage
const getTasksFromLocalStorage = () => {
  let localTasks = localStorage.getItem("tasks");
  if (localTasks) {
    tasksArray = JSON.parse(localTasks);
    console.log("Loaded tasks from localStorage:", tasksArray);
  } else {
    tasksArray = [];
  }
  return tasksArray;
};

// Function to save tasks to localStorage
const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Function to render the "All Tasks" page
const listAllTasksPage = () => {
  listAllTasks.innerHTML = ""; // Clear previous content

  if (tasksArray.length > 0) {
    tasksArray.forEach((task, index) => {
      const taskItem = document.createElement("div");
      taskItem.classList.add("task-item", "mb-3", "p-3", "border", "rounded");

      taskItem.innerHTML = `
        <h5>${task.title}</h5>
        <p>${task.description}</p>
        <p><strong>Deadline:</strong> ${task.deadline}</p>
        <p><strong>Status:</strong> ${task.status ? "Done" : "Pending"}</p>
      `;

      listAllTasks.appendChild(taskItem);
    });
  } else {
    const noTasksMessage = document.createElement("p");
    noTasksMessage.textContent = "You currently do not have any tasks. Add a new task to get started!";
    noTasksMessage.classList.add("text-center", "text-muted", "mt-4");
    listAllTasks.appendChild(noTasksMessage);
  }
};

// Event listener for adding a new task
addTaskForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get form data
  const titleInput = document.querySelector(".titleInput").value;
  const descriptionInput = document.querySelector(".descriptionInput").value;
  const dateInput = document.querySelector(".dateInput").value;

  if (titleInput && descriptionInput && dateInput) {
    const newTask = {
      id: Date.now(), // Unique ID based on timestamp
      title: titleInput,
      description: descriptionInput,
      deadline: dateInput,
      status: false, // Default status: Pending
    };

    // Add the new task to tasksArray and save to localStorage
    tasksArray.push(newTask);
    saveTasksToLocalStorage(tasksArray);

    // Navigate to "All Tasks" page
    addTasksPage.classList.remove("active");
    listAllTasks.classList.add("active");

    // Render the updated task list
    listAllTasksPage();

    // Clear the form
    addTaskForm.reset();
  } else {
    alert("Please fill in all fields before submitting.");
  }
});

// Event listener for navigating to the "Add Task" page
addTask.addEventListener("click", () => {
  addTasksPage.classList.add("active");
  listAllTasks.classList.remove("active");
});

// Event listener for navigating to the "All Tasks" page
allTasks.addEventListener("click", () => {
  addTasksPage.classList.remove("active");
  listAllTasks.classList.add("active");

  listAllTasksPage(); // Refresh the task list
});

// Load tasks and show "All Tasks" page on page load
window.addEventListener("DOMContentLoaded", () => {
  getTasksFromLocalStorage();
  addTasksPage.classList.remove("active");
  listAllTasks.classList.add("active");

  listAllTasksPage();
});
