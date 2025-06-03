// Get names from local storage or default array
function getNames() {
  const defaultNames = ["Netflix", "Hulu", "Prime", "Disney+", "Criterion", "Mubi", "Shudder", "Kanopy", "Tubi"];
  return JSON.parse(localStorage.getItem("names")) || defaultNames;
}

// Save names to local storage
function saveNames(names) {
  localStorage.setItem("names", JSON.stringify(names));
}

// Roll 'em
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

// Add new name
function addName() {
  const newName = document.getElementById("newName").value;
  if (newName) {
    const names = getNames();
    names.push(newName);
    saveNames(names);
    displayNamesList();
    document.getElementById("newName").value = '';
  }
  return false;
}

// Update a name in the list
function updateName(event) {
  const updatedName = event.target.textContent;
  const names = getNames();
  const index = parseInt(event.target.getAttribute('data-index'), 10);
  names[index] = updatedName;
  saveNames(names);
}

// Delete name from list
function deleteName(index) {
  const names = getNames();
  names.splice(index, 1);
  saveNames(names);
  displayNamesList();
}

// Display list of names
function displayNamesList() {
  const names = getNames();
  const namesList = document.getElementById("namesList");
  namesList.innerHTML = '';
  names.forEach((name, index) => {
    const listItem = document.createElement("li");
    const nameSpan = document.createElement("span");
    const deleteButton = document.createElement("button");
    nameSpan.textContent = name;
    nameSpan.contentEditable = true;
    nameSpan.spellcheck = false;
    nameSpan.onblur = updateName;
    nameSpan.setAttribute('data-index', index);
    deleteButton.id = "delete";
    deleteButton.innerHTML = 'X';
    deleteButton.onclick = () => deleteName(index);
    listItem.appendChild(nameSpan);
    listItem.appendChild(deleteButton);
    namesList.appendChild(listItem);
  });
}

// Fire it up
window.onload = displayNamesList;
