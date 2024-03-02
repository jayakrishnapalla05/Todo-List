document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("taskForm");
  const taskInput = document.getElementById("taskInput");
  const addButton = document.getElementById("addButton");
  const taskList = document.getElementById("taskList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function renderTasks() {
    taskList.innerHTML = ""; // Clear the task list first
    tasks.forEach((task, index) => {
      const taskItem = document.createElement("div");
      taskItem.classList.add("task");
      taskItem.innerHTML = `
      <div>
            <input type="checkbox" ${task.completed ? "checked" : ""}>
            <span style="text-decoration: ${
              task.completed ? "line-through" : "none"
            };margin-left: 200px;">${task.text}</span>
            </div>
            <div class="buttons">
            <button class="edit-btn" data-index="${index} ">Edit</button>
            <button class="delete-btn" data-index="${index} ">Delete</button>
            <div>
        `;
      taskList.appendChild(taskItem);
    });

    const editButtons = document.querySelectorAll(".edit-btn");
    editButtons.forEach((button, index) => {
      button.addEventListener("click", function () {
        taskInput.value = tasks[index].text;
        addButton.textContent = "Save";

        addButton.addEventListener("click", function saveTask() {
          const newText = taskInput.value.trim();
          if (newText !== "") {
            tasks[index].text = newText;
            saveTasks();
            renderTasks();
          }
          taskInput.value = "";
          addButton.textContent = "Add";
          addButton.removeEventListener("click", saveTask);
        });
      });
    });

    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button, index) => {
      button.addEventListener("click", function () {
        const confirmation = confirm(
          "Are you sure you want to delete this task?"
        );
        if (confirmation) {
          tasks.splice(index, 1);
          saveTasks();
          renderTasks();
        }
      });
    });

    const checkboxes = document.querySelectorAll(
      '.task input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox, index) => {
      checkbox.addEventListener("change", function () {
        tasks[index].completed = !tasks[index].completed;
       
        if(tasks[index].completed){
        
            alert("Task marked as Done");
        }
        else{
            confirm("Do you want undo the task?");
        }
        saveTasks();
        renderTasks();
      });
    });
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      tasks.push({ text: taskText, completed: false });
      saveTasks();
      taskInput.value = "";
      renderTasks();
    }
  });

  renderTasks();
});
