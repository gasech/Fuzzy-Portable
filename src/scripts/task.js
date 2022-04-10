/**
 * Creates Task Element into the page, inserts into tasks array and updates JSON file.
 * @param {object} task 
 * @returns Alert Message if InputName is empty.
*/
function createTask(task) {
    let inputName = document.getElementById("input-name");
    let inputDesc = document.getElementById("input-desc");

    if (inputName.value.length > 18) return customAlertBox("Please use 18 characters or less in task name.");
    if (inputDesc.value.length > 40) return customAlertBox("Please use 40 characters or less in task description.");
    if (inputName.value == "" || inputName.value == " ") return customAlertBox("Please do not leave the name area empty.");

    let taskId = tasks.length;
    tasks.push({ id: taskId, name: inputName.value, desc: inputDesc.value, status: "to_do", subtasks: [] });
    task = tasks[tasks.length - 1];

    inputName.value = "";
    inputDesc.value = "";

    createTaskElement(task);
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
 * Toggles main task status from 'to_do' to 'doing' to 'done'.
 * @param {int} id Main task id
 */
function toggleTask(id) {
    for (let task of tasks) {
        if (id == task.id) {
            switch (task.status) {
                case "to_do":
                    task.status = "doing";
                    document.getElementById(`primary-task-status-${task.id}`).style.background = "#E9CC38";
                    break;
                case "doing":
                    task.status = "done";
                    document.getElementById(`primary-task-status-${task.id}`).style.background = "#0FD018";
                    break;
                case "done":
                    task.status = "to_do";
                    document.getElementById(`primary-task-status-${task.id}`).style.background = "#DB0E33";
                    break;
                default:
                    console.log("error");
            }
        }
    }
    updateTaskList();
}

/**
 * 
 * @param {int} id 
 * @returns 
 */
function editTask(id) {
    let newInputName = document.getElementById("new-input-name");
    let newInputDesc = document.getElementById("new-input-desc");
    let name = newInputName.value;
    let desc = newInputDesc.value;

    closeAlertBox('edit-main-task');

    if (name.length > 18) return customAlertBox("Please use 18 characters or less in task name.");
    if (desc.length > 40) return customAlertBox("Please use 40 characters or less in task description.");
    if (name == "" || name == " ") return customAlertBox("Please do not leave the name area empty.");

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

/**
 * Creates Sub Task Element into the page, inserts into the task subtasks array and updates JSON file.
 * @param {object} task 
 * @returns Alert Message if InputName is empty.
*/
function createSubTask(id) {
    let subInputName = document.getElementById("sub-input-name");
    let subInputDesc = document.getElementById("sub-input-desc");
    let name = subInputName.value;
    let desc = subInputDesc.value;

    if (name) {
        if (name.length > 18) return customAlertBox("Please use 18 characters or less in task name.");
        if (desc.length > 40) return customAlertBox("Please use 40 characters or less in task description.");
    } else {
        closeAlertBox('create-sub-task');
        return customAlertBox("Please do not leave the name area empty.");
    }

    closeAlertBox('create-sub-task');

    for (let task of tasks) {
        if (task.id == id) {
            task.subtasks.push({ id: task.subtasks.length, name: name, desc: desc, status: "to_do" });
            let subtask = task.subtasks[task.subtasks.length - 1];
            createSubTaskElement(task.id, subtask);
        }
    }

    updateTaskList();
}

/**
 * Toggles sub task status from 'to_do' to 'doing' to 'done'.
 * @param {int} id Main task id
 * @param {int} secondId Sub task id
 */
function toggleSubTask(id, secondId) {
    for (let task of tasks) {
        if (id == task.id) {
            for (let subtask of task.subtasks) {
                if (subtask.id == secondId) {
                    switch (subtask.status) {
                        case "to_do":
                            subtask.status = "doing";
                            document.getElementById(`secundary-task-status-${id}-${subtask.id}`).style.background = "#E9CC38";
                            break;
                        case "doing":
                            subtask.status = "done";
                            document.getElementById(`secundary-task-status-${id}-${subtask.id}`).style.background = "#0FD018";
                            break;
                        case "done":
                            subtask.status = "to_do";
                            document.getElementById(`secundary-task-status-${id}-${subtask.id}`).style.background = "#DB0E33";
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

/**
 * 
 * @param {int} id Main task id
 * @param {int} secondId Sub Task id
 * @returns Alert Message if InputName is empty.
 */
function editSubTask(id, secondId) {
    let newInputName = document.getElementById("new-input-name");
    let newInputDesc = document.getElementById("new-input-desc");
    let name = newInputName.value;
    let desc = newInputDesc.value;

    closeAlertBox('edit-sub-task');

    if (name.length > 18) return customAlertBox("Please use 18 characters or less in task name.");
    if (desc.length > 40) return customAlertBox("Please use 40 characters or less in task description.");
    if (name == "" || name == " ") return customAlertBox("Please do not leave the name area empty.");

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

/**
 * It doesn't delete from JSON, instead updates the status to 'deleted' and loadSubTasksElements() wont load task in page.
 * @param {int} id Main task id
 * @param {int} secondId Sub Task Id
 */
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

function hideButtons(id,secondId){
    if(secondId == undefined){
        document.getElementById(`primary-task-buttons-${id}`).style.display = "none";
    } else {
        document.getElementById(`secundary-task-buttons-${id}-${secondId}`).style.display = "none";
    }
}

function showButtons(id,secondId){
    if(secondId == undefined){
        document.getElementById(`primary-task-buttons-${id}`).style.display = "block";
    } else {
        document.getElementById(`secundary-task-buttons-${id}-${secondId}`).style.display = "block";
    }    
}