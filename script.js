const taskLists = {};

function addTask() {
  const listName = document.getElementById("listName").value.trim() || "Default";
  const taskText = document.getElementById("taskInput").value.trim();
  const taskDate = document.getElementById("taskDate").value;

  if (!taskText) return alert("Please enter a task!");

  if (!taskLists[listName]) {
    taskLists[listName] = [];
  }

  taskLists[listName].push({ text: taskText, date: taskDate, completed: false });
  renderTasks();
  document.getElementById("taskInput").value = "";
  document.getElementById("taskDate").value = "";
}

function renderTasks() {
  const taskListsContainer = document.getElementById("taskLists");
  taskListsContainer.innerHTML = "";

  for (const listName in taskLists) {
    const section = document.createElement("div");
    section.className = "list-section";

    const heading = document.createElement("h3");
    heading.textContent = listName;
    section.appendChild(heading);

    taskLists[listName].forEach((task, index) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = "task" + (task.completed ? " completed" : "");

      const taskText = document.createElement("div");
      taskText.className = "task-text";
      taskText.innerHTML = `${task.text} <div class="task-date">${task.date ? `📅 ${task.date}` : ""}</div>`;

      const actions = document.createElement("div");
      actions.className = "task-actions";

      const completeBtn = document.createElement("button");
      completeBtn.textContent = task.completed ? "Undo" : "Done";
      completeBtn.onclick = () => {
        task.completed = !task.completed;
        renderTasks();
      };

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => {
        const newText = prompt("Edit task:", task.text);
        if (newText !== null) {
          task.text = newText;
          renderTasks();
        }
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => {
        taskLists[listName].splice(index, 1);
        renderTasks();
      };

      actions.appendChild(completeBtn);
      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      taskDiv.appendChild(taskText);
      taskDiv.appendChild(actions);

      section.appendChild(taskDiv);
    });

    taskListsContainer.appendChild(section);
  }
}
