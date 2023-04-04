const inputField = document.getElementById("inputField");
inputField.className = "inputField";
const addButton = document.querySelector("#addButton");
addButton.className = "addButton";
const title = document.getElementById("title");

addButton.addEventListener("click", () => {
  const inputText = document.getElementById("inputField").value;

  if (inputText == "") {
    return;
  } else {
    // Here I am creating the <div> element for the inputText //
    const activities = document.createElement("div");
    activities.id = "list";

    // Here I am creating an array of text to use for the <div> elements //
    const items = [inputText];

    // Loop through the array
    items.forEach((item) => {
      const list = document.createElement("div");
      const text = document.createTextNode(item);
      list.appendChild(text);

      const doneButton = document.createElement("button");
      doneButton.innerText = "Done";
      doneButton.className = "doneButton";
      doneButton.onclick = () => {
        list.style.textDecoration = "line-through";
      };

      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.className = "deleteButton";
      deleteButton.onclick = () => {
        activities.removeChild(list);
      };

      list.appendChild(doneButton);
      list.appendChild(deleteButton);

      activities.appendChild(list);
    });

    // Append the <div> element to the DOM //
    document.body.appendChild(activities);
    document.getElementById("inputField").value = "";
  }
});
