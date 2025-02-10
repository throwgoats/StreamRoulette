// Get names from local storage or default array
function getNames() {
  const defaultNames = ["Netflix", "Hulu", "Prime", "Disney+", "Criterion", "Mubi", "Shudder", "Kanopy", "Tubi"];
  return JSON.parse(localStorage.getItem("names")) || defaultNames;
}

// Save names to local storage
function saveNames(names) {
  localStorage.setItem("names", JSON.stringify(names));
}

// Display a random name
function displayRandomName() {
  const names = getNames();
  const prevSelections = JSON.parse(localStorage.getItem("prevSelections")) || [];
  const availableNames = names.filter(name => !prevSelections.includes(name));

  if (availableNames.length === 0) {
    prevSelections.length = 0;
    availableNames.push(...names);
  }

  const randomIndex = Math.floor(Math.random() * availableNames.length);
  const randomName = availableNames[randomIndex];
  document.getElementById("result").textContent = randomName;

  prevSelections.unshift(randomName);
  if (prevSelections.length > 2) {
    prevSelections.pop();
  }

  localStorage.setItem("prevSelections", JSON.stringify(prevSelections));
}

// Display the list of names
function displayNamesList() {
  const names = getNames();
  const namesList = document.getElementById("namesList");
  namesList.innerHTML = '';
  names.forEach((name, index) => {
    const listItem = document.createElement("li");
    const nameSpan = document.createElement("span");
    nameSpan.textContent = name;
    nameSpan.contentEditable = true;
    nameSpan.onblur = updateName;
    const deleteButton = document.createElement("button");
    deleteButton.id = "delete";
    deleteButton.innerHTML = 'X';
    deleteButton.onclick = () => deleteName(index);
    listItem.appendChild(nameSpan);
    listItem.appendChild(deleteButton);
    namesList.appendChild(listItem);
  });
}

// Add a new name
function addName() {
  const newName = document.getElementById("newName").value;
  if (newName) {
    const names = getNames();
    names.push(newName);
    saveNames(names);
    displayNamesList();
    document.getElementById("newName").value = '';
  }
}

// Update a name in the list
function updateName(event) {
  const updatedName = event.target.textContent;
  const names = getNames();
  const index = Array.from(event.target.parentNode.parentNode.children).indexOf(event.target.parentNode);
  names[index] = updatedName;
  saveNames(names);
}

// Delete a name from the list
function deleteName(index) {
  const names = getNames();
  names.splice(index, 1);
  saveNames(names);
  displayNamesList();
}

// Display the names list on page load
window.onload = displayNamesList;
