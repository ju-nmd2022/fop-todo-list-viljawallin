const inputField = document.getElementById("inputField");
inputField.className = "inputField";
const addButton = document.querySelector("#addButton");
addButton.className = "addButton";
const title = document.getElementById("title");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

// Function to create a new task element //
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
  for (let task of tasks) {
    const list = createTaskElement(task);
    tasksContainer.appendChild(list);
  }
}

// Here I am making the existing tasks to display when the page loads //
const tasksContainer = document.createElement("div");
tasksContainer.id = "tasksContainer";
displayTasks();
document.body.appendChild(tasksContainer);

addButton.addEventListener("click", () => {
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
