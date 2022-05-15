function createAlertBox(){
    const alertsArea = document.getElementById(`alerts`);
    let alertBox = document.createElement("div");

    alertBox.setAttribute('id', 'alert-box');
    alertBox.innerHTML = `
    <form id="todolist-form" onSubmit="return false">
        <h3 class="alert-box-title">Create Task</h3>
        <button class="buttonf close-alert" onclick="closeAlertBox('alert-box')"><i class="fa fa-close"></i></button>
        <input type="text" id="input-name" placeholder="+ Add a Name" name="inputname" autocomplete="off"
            maxlength="18" spellcheck="false"><br>
        <textarea id="input-desc" cols="2" placeholder="+ Add a description" name="inputdesc" autocomplete="off"
            maxlength="40" spellcheck="false"></textarea><br>
        <input type="submit" class="btn-create" value="create" onclick="createTask()" />
    </form>
    `;

    alertsArea.appendChild(alertBox);
}

function editMainTaskAlertBox(id) {
    const alertsArea = document.getElementById(`alerts`);
    let alertBox = document.createElement("div");
    let name, desc;

    for (let task of tasks) {
        if (id == task.id) {
            name = task.name;
            desc = task.desc;
        }
    }

    alertBox.setAttribute('id', 'alert-box');
    alertBox.innerHTML = `
    <h3 class="alert-box-title">Edit Task</h3>
    <button class="buttonf close-alert" onclick="closeAlertBox('alert-box')"><i class="fa fa-close"></i></button>
    <form id="edit-task-form" onSubmit="return false;">
        <input type="text" id="input-name" value="${name}" placeholder="+ Add a Name" name="inputsubname" autocomplete="off" maxlength="18" spellcheck="false"><br>
        <textarea id="input-desc" cols="2" placeholder="+ Add a description" name="inputsubdesc" autocomplete="off" maxlength="40" spellcheck="false">${desc}</textarea><br>
        <input type="submit" class="btn-create" value="edit" onclick="editTask(${id})"/>
    </form>
    `;

    alertsArea.appendChild(alertBox);
}


function createSubTaskAlertBox(id) {
    const alertsArea = document.getElementById(`alerts`);
    let alertBox = document.createElement("div");
    alertBox.setAttribute('id', 'alert-box');
    alertBox.innerHTML = `
    <h3 class="alert-box-title">Create Subtask</h3>
    <button class="buttonf close-alert" onclick="closeAlertBox('alert-box')"><i class="fa fa-close"></i></button>
    <form id="create-subtask-form" onSubmit="return false;">
        <input type="text" id="input-name" placeholder="+ Add a Name" name="inputsubname" autocomplete="off" maxlength="18" spellcheck="false"><br>
        <textarea id="input-desc" cols="2" placeholder="+ Add a description" name="inputsubdesc" autocomplete="off" maxlength="40" spellcheck="false"></textarea><br>
        <input type="submit" class="btn-create" value="create" onclick="createSubTask(${id})"/>
    </form>
    `;

    alertsArea.appendChild(alertBox);
}


function editSubTaskAlertBox(id, secondId) {
    const alertsArea = document.getElementById(`alerts`);
    let alertBox = document.createElement("div");
    let name, desc;

    for (let task of tasks) {
        if (id == task.id) {
            for (let subtask of task.subtasks) {
                if (secondId == subtask.id) {
                    name = subtask.name;
                    desc = subtask.desc;
                }
            }
        }
    }

    alertBox.setAttribute('id', 'alert-box');
    alertBox.innerHTML = `
    <h3 class="alert-box-title">Edit Subtask</h3>
    <button class="buttonf close-alert" onclick="closeAlertBox('alert-box')"><i class="fa fa-close"></i></button>
    <form id="edit-subtask-form" onSubmit="return false;">
        <input type="text" id="input-name" value="${name}" placeholder="+ Add a Name" name="inputsubname" autocomplete="off" maxlength="18" spellcheck="false"><br>
        <textarea id="input-desc" cols="2" placeholder="+ Add a description" name="inputsubdesc" autocomplete="off" maxlength="40" spellcheck="false">${desc}</textarea><br>
        <input type="submit" class="btn-create" value="edit" onclick="editSubTask(${id},${secondId})"/>
    </form>
    `;

    alertsArea.appendChild(alertBox);
}

function customAlertBox(message) {
    const alertsArea = document.getElementById(`alerts`);
    let alertBox = document.createElement("div"); 

    alertBox.setAttribute('id', 'alert-box');
    alertBox.setAttribute('class', 'custom-alert-box')
    alertBox.innerHTML = `
    <h3 class="alert-box-title">Alert</h3>
    <button class="buttonf close-alert" onclick="closeAlertBox('alert-box')"><i class="fa fa-close"></i></button>
    <p>${message}</p>
    `;

    alertsArea.appendChild(alertBox);
}

function closeAlertBox(element) {
    let alertBox = document.getElementById(`${element}`);
    alertBox.remove();
}

function CloseIfAlert(){
    
}