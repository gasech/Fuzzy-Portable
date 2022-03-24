/**
 * Creates Task Element into the page, inserts into tasks array and Local Storage.
 * @param {object} task 
 * @returns Alert Message if InputName is empty.
 */
function createTask(task) {
    let inputName = document.getElementById("input-name");
    let inputDesc = document.getElementById("input-desc");

    if (inputName.value.length > 18) return alert("Please use 18 characters or less in task name.");
    if (inputDesc.value.length > 40) return alert("Please use 40 characters or less in task description.");
    if (inputName.value == "" || inputName.value == " ") return alert("Please do not leave the name area empty.");

    let TaskId = tasks.length;
    tasks.push({ id: TaskId, name: inputName.value, desc: inputDesc.value, status: "to do", subtasks: [] });
    task = tasks[tasks.length - 1];

    inputName.value = "";
    inputDesc.value = "";

    let ul = document.getElementById("main-task-list");
    let li = document.createElement("li");
    li.setAttribute('id', `main-task-${task.id}`);
    li.innerHTML = `<div class="primary-task">
	                        <div class="task-status" id="primary-task-status-${task.id}" onclick="toggleTask(${task.id})"></div>
	                        <div class="task-name" id="primary-task-name-${task.id}">${task.name} </div>
	                        <div class="task-desc" id="primary-task-desc-${task.id}">${task.desc}</div>
                            <div class="task-buttons">      
                                <button class="btn" onclick="createSubTaskAlertBox(${task.id})"><i class="fa fa-plus"></i></button>
                                <button class="btn" onclick="editMainTaskAlertBox(${task.id},'${task.name}','${task.desc}')"><i class="fa fa-pencil"></i></button>
                                <button class="btn" onclick="deleteTask(${task.id})"><i class="fa fa-trash"></i></button>
                            </div>
                        </div>
                        <ul id="secondary-task-list-${task.id}">
                            
                        </ul>`;
    ul.appendChild(li);

    toggleCreateBoxAlert();
    updateTaskList();
}

/**
 * It doesn't delete from JSON, instead updates the status to 'deleted' and loadTaskElements() wont load task in page.
 * @param {int} id 
 */
function deleteTask(id) {
    for (let task of tasks) {
        if (id == task.id) {
            task.status = "deleted";
            for (let subtask of task.subtasks) {
                subtask.status = "deleted";
            }
        }
    }

    updateTaskList();
    document.getElementById(`main-task-${id}`).remove();
}

/**
 * Toggles task from 'to do' to 'doing' to 'done'.
 * @param {*} id 
 */
function toggleTask(id) {
    for (let task of tasks) {
        if (id == task.id) {
            switch (task.status) {
                case "to do":
                    task.status = "doing";
                    document.getElementById(`primary-task-status-${task.id}`).style.background = "#FFE03D";
                    break;
                case "doing":
                    task.status = "done";
                    document.getElementById(`primary-task-status-${task.id}`).style.background = "#0CF51A";
                    break;
                case "done":
                    task.status = "to do";
                    document.getElementById(`primary-task-status-${task.id}`).style.background = "#F50C55";
                    break;
                default:
                    console.log("error");
            }
        }
    }
    updateTaskList();
}

function editTask(id) {
    let newInputName = document.getElementById("new-input-name");
    let newInputDesc = document.getElementById("new-input-desc");
    let name = newInputName.value;
    let desc = newInputDesc.value;

    closeAlertBox('edit-main-task');

    if (name.length > 18) return alert("Please use 18 characters or less in task name.");
    if (desc.length > 40) return alert("Please use 40 characters or less in task description.");
    if (name == "" || name == " ") return alert("Please do not leave the name area empty.");

    for (let task of tasks) {
        if (id == task.id) {
            task.name = name;
            task.desc = desc;
            document.getElementById(`primary-task-name-${id}`).innerHTML = name;
            document.getElementById(`primary-task-desc-${id}`).innerHTML = desc;
        }
    }

    updateTaskList();
}

function createSubTask(id) {
    let subInputName = document.getElementById("sub-input-name");
    let subInputDesc = document.getElementById("sub-input-desc");
    let name = subInputName.value;
    let desc = subInputDesc.value;
    let secondId;

    if (name) {
        if (name.length > 18) return alert("Please use 18 characters or less in task name.");
        if (desc.length > 40) return alert("Please use 40 characters or less in task description.");
        if (name == "" || name == " ") return alert("Please do not leave the name area empty.");
        subInputName.value = "";
        subInputDesc.value = "";
        closeAlertBox('create-sub-task');
    }

    for (let task of tasks) {
        if (task.id == id) {
            secondId = task.subtasks.length;
            task.subtasks.push({ id: secondId, name: name, desc: desc, status: "to do" });
        }
    }

    let ul = document.getElementById(`secondary-task-list-${id}`);
    let li = document.createElement("li");
    li.setAttribute('class', 'secundary-task');
    li.setAttribute('id', `secundary-task-${id}-${secondId}`);
    li.innerHTML = `
        <div class="task-status" id="secundary-task-status-${id}-${secondId}" onclick="toggleSubTask(${id},${secondId})"></div>
        <div class="task-name" id="secundary-task-name-${id}-${secondId}">${name}</div>
        <div class="task-desc" id="secundary-task-desc--${id}-${secondId}">${desc}</div>
        <div class="task-buttons">
            <button class="btn" onclick="editSubTaskAlertBox(${id}, ${secondId})"><i class="fa fa-pencil"></i></button>
            <button class="btn" onclick="deleteSubTask(${id}, ${secondId})"><i class="fa fa-trash"></i></button>
        </div>
    `;

    ul.appendChild(li);

    updateTaskList();
}

function toggleSubTask(id, secondId) {
    for (let task of tasks) {
        if (id == task.id) {
            for (let subtask of task.subtasks) {
                if (subtask.id == secondId) {
                    switch (subtask.status) {
                        case "to do":
                            subtask.status = "doing";
                            document.getElementById(`secundary-task-status-${id}-${subtask.id}`).style.background = "#FFE03D";
                            break;
                        case "doing":
                            subtask.status = "done";
                            document.getElementById(`secundary-task-status-${id}-${subtask.id}`).style.background = "#0CF51A";
                            break;
                        case "done":
                            subtask.status = "to do";
                            document.getElementById(`secundary-task-status-${id}-${subtask.id}`).style.background = "#F50C55";
                            break;
                        default:
                            console.log("error");
                    }
                }
            }
        }
    }

    updateTaskList();
}

function editSubTask(id, secondId) {
    let newInputName = document.getElementById("new-input-name");
    let newInputDesc = document.getElementById("new-input-desc");
    let name = newInputName.value;
    let desc = newInputDesc.value;

    closeAlertBox('edit-sub-task');

    if (name.length > 18) return alert("Please use 18 characters or less in task name.");
    if (desc.length > 40) return alert("Please use 40 characters or less in task description.");
    if (name == "" || name == " ") return alert("Please do not leave the name area empty.");

    for (let task of tasks) {
        if (id == task.id) {
            for (let subtask of task.subtasks) {
                if (secondId == subtask.id) {
                    subtask.name = name;
                    subtask.desc = desc;
                    document.getElementById(`secundary-task-name-${id}-${secondId}`).innerHTML = name;
                    document.getElementById(`secundary-task-desc-${id}-${secondId}`).innerHTML = desc;
                }
            }
        }
    }

    updateTaskList();
}

function deleteSubTask(id, secondId) {
    for (let task of tasks) {
        if (id == task.id) {
            for (let subtask of task.subtasks) {
                if (subtask.id == secondId) {
                    subtask.status = "deleted";
                }
            }
        }
    }

    updateTaskList();
    document.getElementById(`secundary-task-${id}-${secondId}`).remove();
}