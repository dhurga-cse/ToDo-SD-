// This is the address of our backend server (Node.js + Express).
// If you change the port in backend/server.js, change it here too.
const API_URL = "http://localhost:5000/api/todos";

// Add a new todo to the database.
async function addTask() {

    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        showMessage("Please enter a task.");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: taskText })
        });

        if (!response.ok) {
            throw new Error("Could not add the task.");
        }

        input.value = "";
        showMessage("");

        // Reload the list so the new task appears.
        loadTasks();
    } catch (error) {
        showMessage("Error: " + error.message + " (Is the backend running?)");
    }
}

// Load all todos from the database and show them on the page.
async function loadTasks() {

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Could not load the tasks.");
        }

        const todos = await response.json();
        renderTasks(todos);
    } catch (error) {
        showMessage("Error: " + error.message + " (Is the backend running?)");
    }
}

// Mark a todo as completed / not completed.
async function toggleTask(id, isCompleted) {

    try {
        const response = await fetch(API_URL + "/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: !isCompleted })
        });

        if (!response.ok) {
            throw new Error("Could not update the task.");
        }

        loadTasks();
    } catch (error) {
        showMessage("Error: " + error.message);
    }
}

// Delete a todo from the database.
async function deleteTask(id) {

    try {
        const response = await fetch(API_URL + "/" + id, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Could not delete the task.");
        }

        loadTasks();
    } catch (error) {
        showMessage("Error: " + error.message);
    }
}

// Show the list of todos in the browser.
function renderTasks(todos) {

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    if (todos.length === 0) {
        showMessage("No tasks yet. Add your first one!");
        return;
    }

    showMessage("");

    for (const todo of todos) {

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.innerText = todo.title;

        if (todo.completed) {
            span.classList.add("completed");
        }

        span.onclick = function () {
            toggleTask(todo._id, todo.completed);
        };

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.onclick = function () {
            deleteTask(todo._id);
        };

        li.appendChild(span);
        li.appendChild(deleteButton);

        list.appendChild(li);
    }
}

// Show a small message under the input box.
function showMessage(text) {
    document.getElementById("message").innerText = text;
}

// Load the tasks as soon as the page opens.
document.addEventListener("DOMContentLoaded", loadTasks);