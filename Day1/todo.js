function addTask() {

    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const list = document.getElementById("taskList");

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = taskText;

    span.onclick = function () {
        span.classList.toggle("completed");
    };

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete-btn";

    deleteButton.onclick = function () {
        li.remove();
    };

    li.appendChild(span);
    li.appendChild(deleteButton);

    list.appendChild(li);

    input.value = "";
}