// Reference to the element in the HTML //
const inputField = document.getElementById("inputField");
inputField.className = "inputField";
const addButton = document.querySelector("#addButton");
addButton.className = "addButton";
const title = document.getElementById("title");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

// Function to create a new task element //
function createTaskElement(task) {
  // Creates a new div element and adds the task-text to it //
  const list = document.createElement("div");
  const text = document.createTextNode(task);
  list.appendChild(text);

  // Adding a "done" and "delete" button to the task element //
  const doneButton = document.createElement("button");
  doneButton.innerText = "Done";
  doneButton.className = "doneButton";
  doneButton.onclick = () => {
    // When "done" button is clicked - it adds the task to the completedTasks array to add a line-through style to the text. //
    list.style.textDecoration = "line-through";
    completedTasks.push(task);
    // I used ChatGpt after listening to Garrits lecture about ChatGpt in order to debug my code because at first I could not get my line-through to be saved in localStorage. //
    // My conclusion after using ChatGpt as a tool, was that instead of only applying the line-through decoration when the "done" button is clicked, I wanted to check if the task is already marked as done by checking in an array of completed tasks - stored in localStorage. If it is in the array, then apply the line-through decoration when creating the task element. //
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  };

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.className = "deleteButton";
  deleteButton.onclick = () => {
    // I took this information from hamstergram-workshop-login by Garrit "post.likes.splice(userIndex, 1);" in order to remove one specific task from the task array //
    tasks.splice(tasks.indexOf(task), 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    tasksContainer.removeChild(list);
  };

  list.appendChild(doneButton);
  list.appendChild(deleteButton);

  // I also want to check if the task is completed in order to apply my line-through decoration //
  if (completedTasks.includes(task)) {
    list.style.textDecoration = "line-through";
  }

  return list;
}

// Function to display the list of tasks //
function displayTasks() {
  // Loops throgh the tasks array and adds each task as new HTML element to the createTaskElement function. //
  // I took information from hamstergram-workshop-login by Garrit - from the function displayPosts - order to make my function displayTasks. The same code but changed it to my variebles and the way I wanted my function to work.//
  for (let task of tasks) {
    const list = createTaskElement(task);
    tasksContainer.appendChild(list);
  }
}

// Creates new div element to display the list of tasks //
const tasksContainer = document.createElement("div");
tasksContainer.id = "tasksContainer";
displayTasks();
document.body.appendChild(tasksContainer);

// Event listener to the "add" buton //
addButton.addEventListener("click", () => {
  // I took inspiration from https://www.w3schools.com/howto/howto_js_todolist.asp solution when it came to making a new list when clicking the add button in javascript //
  // Picks up the value of the input field //
  const inputText = document.getElementById("inputField").value;

  // Checks if the input field is empty. //
  if (inputText == "") {
    return;
  } else {
    // Adding the new task to the tasks array and saves it to local storage //
    tasks.push(inputText);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Creating and appending the new task element to the DOM //
    const list = createTaskElement(inputText);
    tasksContainer.appendChild(list);

    // Clears the input field! //
    document.getElementById("inputField").value = "";
  }
});
