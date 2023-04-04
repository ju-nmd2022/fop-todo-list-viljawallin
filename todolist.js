const inputField = document.getElementById("inputField");
const addButton = document.querySelector("#addButton");
const title = document.getElementById("title");

addButton.addEventListener("click", () => {
  const inputText = document.getElementById("inputField").value;

  if (inputText == "") {
    return;
  } else {
    // Here I am creating the <div> element for the inputText //
    const activities = document.createElement("div");

    // Here I am creating an array of text to use for the <span> elements //
    const items = [inputText];

    // Loop through the array, and also creating a <li> element for each thing to "to do..." //
    items.forEach((item) => {
      const list = document.createElement("span");
      const text = document.createTextNode(item);
      list.appendChild(text);

      const doneButton = document.createElement("button");
      doneButton.innerText = "Done";
      doneButton.onclick = () => {
        list.style.textDecoration = "line-through";
      };

      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.onclick = () => {
        activities.removeChild(list);
      };

      // Append the buttons to the <li> element
      list.appendChild(doneButton);
      list.appendChild(deleteButton);

      activities.appendChild(list);
    });

    // Append the <ul> element to the DOM
    document.body.appendChild(activities);
    document.getElementById("inputField").value = "";
  }
});
