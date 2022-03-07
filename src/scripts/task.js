let idCounter = -1;

let tasks = [];

function createTask() {
    let inputName = document.getElementById("input-name").value;
    let inputDesc = document.getElementById("input-desc").value;

    if (inputName.length > 18) return alert("Please use 18 characters or less in task name.");
    if (inputDesc.length > 40) return alert("Please use 40 characters or less in task description.");
    if (inputName == "" || inputName == " ") return alert("Please do not leave the name area empty.");

    idCounter++;
    tasks.push({ id: idCounter, name: inputName, desc: inputDesc, status: "to do" });

    let currentTask = tasks[tasks.length - 1];

    document.getElementById("input-name").value = "";
    document.getElementById("input-desc").value = "";

    let ul = document.getElementById("task-test");
    let li = document.createElement("li");
    li.setAttribute('id', `task-${currentTask.id}`);
    li.innerHTML = `<div id="generalstatus">
	                    <div class="statusball" id="task-status-${currentTask.id}" onclick="toggleTask(${currentTask.id})"></div>
	                    <div class="statusname" id="task-name-${currentTask.id}">${currentTask.name} -</div>
	                    <div class="statusdesc" id="task-desc-${currentTask.id}">${currentTask.desc}</div>
                        <div class="status-delete" id="task-delete-${currentTask.id}"><button class="btn" onclick="deleteTask(${currentTask.id})"><i class="fa fa-trash"></i></button></div>
                    </div>`;
    ul.appendChild(li);

    document.getElementById("input-name").select();
}

function deleteTask(id) {
    for (let task of tasks) {
        if (id == task.id) {
            task.status = "deleted";
        }
    }

    document.getElementById(`task-${id}`).style.display = "none";
}

function toggleTask(id) {
    for (let task of tasks) {
        if (id == task.id) {
            switch (task.status) {
                case "to do":
                    task.status = updatedStatus = "doing";
                    document.getElementById(`task-status-${task.id}`).style.background = "#FFE03D";
                    break;
                case "doing":
                    task.status = updatedStatus = "done";
                    document.getElementById(`task-status-${task.id}`).style.background = "#0CF51A";
                    break;
                case "done":
                    task.status = updatedStatus = "to do";
                    document.getElementById(`task-status-${task.id}`).style.background = "#F50C55";
                    break;
                default:
                    console.log("error");
            }
        }
    }
}