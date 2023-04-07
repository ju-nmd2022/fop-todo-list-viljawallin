// Reference to the element in the HTML//
const inputField = document.getElementById("inputField");
inputField.className = "inputField";
const addButton = document.querySelector("#addButton");
addButton.className = "addButton";
const title = document.getElementById("title");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

// Function to create a new task element. It creates a new div element and adds the task-text to it. Also a "done" and "delete" button. If the task is marked as completed it's in the completedTasks array - and adds a line-through style to the text. //
function createTaskElement(task) {
  const list = document.createElement("div");
  const text = document.createTextNode(task);
  list.appendChild(text);

  const doneButton = document.createElement("button");
  doneButton.innerText = "Done";
  doneButton.className = "doneButton";
  doneButton.onclick = () => {
    list.style.textDecoration = "line-through";
    completedTasks.push(task);
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  };

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.className = "deleteButton";
  deleteButton.onclick = () => {
    // Took this information from hamstergram-workshop-login by Garrit "post.likes.splice(userIndex, 1);" in order to remove one specific task from the task array //
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

// Function to display the list of tasks - it loops throgh the tasks array and adds each task as new HTML element to the createTaskElement function. //
// I took information from hamstergram-workshop-login by Garrit - from the function displayPosts - order to make my function displayTasks. The same code but changed it to my variebles and the way I wanted my function to work.//
function displayTasks() {
  for (let task of tasks) {
    const list = createTaskElement(task);
    tasksContainer.appendChild(list);
  }
}

// creates new div element to display //
const tasksContainer = document.createElement("div");
tasksContainer.id = "tasksContainer";
displayTasks();
document.body.appendChild(tasksContainer);

// When button is clicked - this checks if the input field is empty. If it is not, it adds the input text to the tasks array. Also saving it to the local storage //
addButton.addEventListener("click", () => {
  // I took inspiration from https://www.w3schools.com/howto/howto_js_todolist.asp solution when it came to making a new list when clicking the add button in javascript //
  const inputText = document.getElementById("inputField").value;

  if (inputText == "") {
    return;
  } else {
    // Adding a new task to the list //
    tasks.push(inputText);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Creating and appending the new task element //
    const list = createTaskElement(inputText);
    tasksContainer.appendChild(list);

    // Clearing the input field! //
    document.getElementById("inputField").value = "";
  }
});
