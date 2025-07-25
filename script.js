let tasks = [];
let filterActive = false;

function addTask() {
    const taskInput = document.getElementById("todo-input");
    const dateInput = document.getElementById("date-input");
    if (!taskInput.value || !dateInput.value) {
        alert("Please enter a task and a date.");
        return;
    }
    tasks.push({ title: taskInput.value, date: dateInput.value });
    renderAddedTasks();
    taskInput.value = "";
    dateInput.value = "";
}

function removeTask(index) {
    tasks.splice(index, 1);
    renderAddedTasks();
}

function completeTask(index) {
    tasks.splice(index, 1);
    renderAddedTasks();
}

function toggleFilter() {
    filterActive = !filterActive;
    renderAddedTasks();
}

function renderAddedTasks() {
    const addedTasksList = document.getElementById("added-tasks-list");
    addedTasksList.innerHTML = "";

    let displayTasks = [...tasks];
    if (filterActive) {
        // Sort by date (earliest to latest)
        displayTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    displayTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.style.opacity = "1";
        li.style.display = "grid";
        li.style.gridTemplateColumns = "2fr 1fr auto auto";
        li.style.alignItems = "center";
        li.style.gap = "8px";
        li.style.padding = "2px 0";

        const taskSpan = document.createElement("span");
        taskSpan.textContent = task.title;

        const dateSpan = document.createElement("span");
        dateSpan.textContent = task.date;
        dateSpan.style.fontSize = "0.95em";

        const completeBtn = document.createElement("button");
        completeBtn.type = "button";
        completeBtn.className = "add-btn";
        completeBtn.textContent = "Complete";
        completeBtn.onclick = () => completeTask(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => removeTask(index);

        li.appendChild(taskSpan);
        li.appendChild(dateSpan);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        addedTasksList.appendChild(li);
    });
}

function removeAllTask() {
    tasks = [];
    renderAddedTasks();
}

document.getElementById('todo-form').addEventListener('submit', function(e) {
    e.preventDefault();
    addTask();
});

document.querySelector('.delete-btn').addEventListener('click', removeAllTask);
document.querySelector('.filter-btn').addEventListener('click', toggleFilter);