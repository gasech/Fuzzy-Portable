let idCounter = 0;

let tasks = [];

function loadTasks() {
    if (localStorage.getItem("taskList")) {
        let localTasks = JSON.parse(localStorage.getItem("taskList"));

        for (let task of localTasks) {
            createTask(task);
            idCounter++;
        }
    }
}

loadTasks();

function createTask(task) {
    let inputName, inputDesc;
    let statusColor = "#F50C55";
    let currentTask;

    if (task) {
        tasks.push(task);
        currentTask = task;
    } else {
        inputName = document.getElementById("input-name").value;
        inputDesc = document.getElementById("input-desc").value;

        if (inputName.length > 18) return alert("Please use 18 characters or less in task name.");
        if (inputDesc.length > 40) return alert("Please use 40 characters or less in task description.");
        if (inputName == "" || inputName == " ") return alert("Please do not leave the name area empty.");
        document.getElementById("input-name").value = "";
        document.getElementById("input-desc").value = "";
        document.getElementById("input-name").select();

        idCounter++;
        tasks.push({ id: idCounter, name: inputName, desc: inputDesc, status: "to do" });
        currentTask = tasks[tasks.length - 1];
        localStorage.setItem("taskList", JSON.stringify(tasks));
    }

    if (currentTask.status != "deleted") {
        let ul = document.getElementById("task-test");
        let li = document.createElement("li");
        li.setAttribute('id', `task-${currentTask.id}`);
        li.innerHTML = `<div id="generalstatus">
	                    <div class="statusball" id="task-status-${currentTask.id}" onclick="toggleTask(${currentTask.id})"></div>
	                    <div class="statusname" id="task-name-${currentTask.id}">${currentTask.name} </div>
	                    <div class="statusdesc" id="task-desc-${currentTask.id}">${currentTask.desc}</div>
                        <div class="status-delete" id="task-delete-${currentTask.id}"><button class="btn" onclick="deleteTask(${currentTask.id})"><i class="fa fa-trash"></i></button></div>
                    </div>`;
        ul.appendChild(li);

        switch (currentTask.status) {
            case "to do":
                statusColor = "#F50C55";
                break;
            case "doing":
                statusColor = "#FFE03D";
                break;
            case "done":
                statusColor = "#0CF51A";
                break;
        }

        document.getElementById(`task-status-${currentTask.id}`).style.background = statusColor;
    }
}

function deleteTask(id) {
    for (let task of tasks) {
        if (id == task.id) {
            task.status = "deleted";
        }
    }

    localStorage.setItem("taskList", JSON.stringify(tasks));
    document.getElementById(`task-${id}`).style.display = "none";
}

function toggleTask(id) {
    for (let task of tasks) {
        if (id == task.id) {
            switch (task.status) {
                case "to do":
                    task.status = "doing";
                    document.getElementById(`task-status-${task.id}`).style.background = "#FFE03D";
                    break;
                case "doing":
                    task.status = "done";
                    document.getElementById(`task-status-${task.id}`).style.background = "#0CF51A";
                    break;
                case "done":
                    task.status = "to do";
                    document.getElementById(`task-status-${task.id}`).style.background = "#F50C55";
                    break;
                default:
                    console.log("error");
            }
        }
    }

    localStorage.setItem("taskList", JSON.stringify(tasks));
}