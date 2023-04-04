var inputField = document.getElementById("inputField");
const addButton = document.querySelector("#addButton");
var title = document.getElementById("title");

addButton.addEventListener("click", () => {
  var inputText = document.getElementById("inputField").value;

  if (inputText == "") {
    return;
  } else {
    // Create the <ul> element
    const ul = document.createElement("ul");

    // Create an array of text to use for the <li> elements
    const items = [inputText];

    // Loop through the array and create a <li> element for each item
    items.forEach((item) => {
      const li = document.createElement("li");
      const text = document.createTextNode(item);
      li.appendChild(text);

      const doneButton = document.createElement("button");
      doneButton.textContent = "Done";
      doneButton.onclick = () => {
        li.style.textDecoration = "line-through";
      };

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => {
        ul.removeChild(li);
      };

      // Append the buttons to the <li> element
      li.appendChild(doneButton);
      li.appendChild(deleteButton);

      ul.appendChild(li);
    });

    // Append the <ul> element to the DOM
    document.body.appendChild(ul);

    document.getElementById("inputField").value = "";
  }
});
