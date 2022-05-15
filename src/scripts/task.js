/**
 * Creates Task Element into the page, inserts into tasks array and updates JSON file.
 * @param {object} task 
 * @returns Alert Message if InputName is empty.
*/
function createTask(task) {
    if (!inputValidation()) return;
    let name = document.getElementById('input-name').value;
    let desc = document.getElementById('input-desc').value;
    closeAlertBox('alert-box');

    let taskId = tasks.length;
    tasks.push({ id: taskId, name: name, desc: desc, important: false, subtasks: [] });
    task = tasks[tasks.length - 1];

    createTaskElement(task);
    updateTaskList();
}

/**
 * Creates Sub Task Element into the page, inserts into the task subtasks array and updates JSON file.
 * @param {object} task 
 * @returns Alert Message if InputName is empty.
*/
function createSubTask(id) {
    if (!inputValidation()) return;
    let name = document.getElementById('input-name').value;
    let desc = document.getElementById('input-desc').value;
    closeAlertBox('alert-box');

    for (let task of tasks) {
        if (task.id == id) {
            task.subtasks.push({ id: task.subtasks.length, name: name, desc: desc, important: false});
            let subtask = task.subtasks[task.subtasks.length - 1];
            createSubTaskElement(task.id, subtask);
        }
    }

    updateTaskList();
}

/**
 * Toggles main task status from 'to_do' to 'doing' to 'done'.
 * @param {int} id Main task id
 */
 function toggleTask(id) {
    let alertbox = document.getElementById('alert-box');
    if(alertbox) return;
    
    for (let task of tasks) {
        if (id == task.id) {
            task.important = task.important ? false : true;
            let importance = task.important ? '1px solid var(--primaryColor)' : 'none';
            let primaryTask = document.getElementById(`main-task-${task.id}`).firstChild;
            primaryTask.style.border = importance;
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
    let alertbox = document.getElementById('alert-box');
    if(alertbox) return;
    
    for (let task of tasks) {
        if (id == task.id) {
            for (let subtask of task.subtasks) {
                if (subtask.id == secondId) {
                    subtask.important = subtask.important ? false : true;
                    let importance = subtask.important ? '1px solid var(--primaryColor)' : 'none';
                    let secundaryTask = document.getElementById(`secundary-task-${id}-${subtask.id}`);
                    secundaryTask.style.border = importance;
                }
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
    if (!inputValidation()) return;
    let name = document.getElementById('input-name').value;
    let desc = document.getElementById('input-desc').value;
    closeAlertBox('alert-box');

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
 * 
 * @param {int} id Main task id
 * @param {int} secondId Sub Task id
 * @returns Alert Message if InputName is empty.
 */
function editSubTask(id, secondId) {
    if (!inputValidation()) return;
    let name = document.getElementById('input-name').value;
    let desc = document.getElementById('input-desc').value;
    closeAlertBox('alert-box');

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
 * It doesn't delete from JSON, instead updates the status to 'deleted' and loadTaskElements() wont load task in page.
 * @param {int} id 
 */
 function deleteTask(id) {
    var filteredDelete = tasks.filter(function(value, index, arr){ 
        return value.id != id;
    });

    tasks = filteredDelete;

    updateTaskList();
    document.getElementById(`main-task-${id}`).remove();
}

/**
 * It doesn't delete from JSON, instead updates the status to 'deleted' and loadSubTasksElements() wont load task in page.
 * @param {int} id Main task id
 * @param {int} secondId Sub Task Id
 */
function deleteSubTask(id, secondId) {
    for (let task of tasks) {
        if (id == task.id) {
            var filteredDelete = task.subtasks.filter(function(value, index, arr){
                return value.id != secondId;
            });
        
            task.subtasks = filteredDelete;
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

function inputValidation(){
    let inputname = document.getElementById("input-name");

    if (!inputname.value) {
        customAlertBox("Please enter a name in task");
        return false;
    }
    
    return true;
}