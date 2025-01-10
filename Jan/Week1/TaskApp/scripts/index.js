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

// List all pending tasks
const pendingTasksPage = document.querySelector(".pendingTasksPage");

// List all completed tasks
const doneTasksPage = document.querySelector(".doneTasksPage");

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

// Making sure I DRY my code and reduce repetitions
const listTasks = (type) => {
  listAllTasks.innerHTML = "";
  pendingTasksPage.innerHTML = "";
  doneTasksPage.innerHTML = "";

  let filteredTasks = [];

  if (type === "all") {
    filteredTasks = tasksArray;
  } else if (type === "pending") {
    filteredTasks = tasksArray.filter((task) => !task.status);
  } else if (type === "done") {
    filteredTasks = tasksArray.filter((task) => task.status);
  }

  if (filteredTasks.length > 0) {
    filteredTasks.forEach((task, index) => {
      const taskItem = document.createElement("div");
      taskItem.classList.add("task-item", "mb-3", "p-3", "border", "rounded");

      taskItem.innerHTML = `
        <h5>${task.title}</h5>
        <p>${task.description}</p>
        <p><strong>Deadline:</strong> ${task.deadline}</p>
        <p><strong>Status:</strong> ${task.status ? "Done" : "Pending"}</p>
        <form>
          <input type="checkbox" id="task-${index}" name="task" value="task">
          <label for="task-${index}"> Completed?</label><br>
        </form>
      `;

      const checkbox = taskItem.querySelector(`#task-${index}`);
      checkbox.addEventListener("change", () => {
        // Toggle the task status
        task.status = !task.status;
        saveTasksToLocalStorage(filteredTasks);
        listTasks("all");
      });

      if (type === "all") {
        listAllTasks.appendChild(taskItem);
      } else if (type === "pending") {
        pendingTasksPage.appendChild(taskItem);
      } else if (type === "done") {
        doneTasksPage.appendChild(taskItem);
      }
    });
  } else {
    const noTasksMessage = document.createElement("p");
    noTasksMessage.classList.add("text-center", "text-muted", "mt-4");

    if (type === "all") {
      noTasksMessage.textContent = "You currently do not have any tasks. Add a new task to get started!";
      listAllTasks.appendChild(noTasksMessage);
    } else if (type === "pending") {
      noTasksMessage.textContent = "You currently do not have any pending tasks. Add a new task to get started!";
      pendingTasksPage.appendChild(noTasksMessage);
    } else if (type === "done") {
      noTasksMessage.textContent = "You currently do not have any completed tasks. Add a new task to get started!";
      doneTasksPage.appendChild(noTasksMessage);
    }
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
    listTasks("all")

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
  pendingTasksPage.classList.remove("active");
  doneTasksPage.classList.remove("active");
});

// Event listener for navigating to the "All Tasks" page
allTasks.addEventListener("click", () => {
  addTasksPage.classList.remove("active");
  listAllTasks.classList.add("active");
  pendingTasksPage.classList.remove("active");
  doneTasksPage.classList.remove("active");

  listTasks("all")
});

// Event listener for navigating to the "pending Tasks" page
pendingTasks.addEventListener("click", () => {
  addTasksPage.classList.remove("active");
  listAllTasks.classList.remove("active");
  pendingTasksPage.classList.add("active");
  doneTasksPage.classList.remove("active");

  listTasks("pending");
});

// Event listener for navigating to the "completed Tasks" page
doneTasks.addEventListener("click", () => {
  addTasksPage.classList.remove("active");
  listAllTasks.classList.remove("active");
  pendingTasksPage.classList.remove("active");
  doneTasksPage.classList.add("active");
  
  listTasks("done");
});

// Load tasks and show "All Tasks" page on page load
window.addEventListener("DOMContentLoaded", () => {
  getTasksFromLocalStorage();
  addTasksPage.classList.remove("active");
  listAllTasks.classList.add("active");

  listTasks("all");
});
