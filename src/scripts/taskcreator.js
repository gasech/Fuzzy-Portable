/**
 * Inserts task object into main task list using DOM
 * @param {Object} task 
 */
function createTaskElement(task) {
    let statusColor = getStatusColor(task.status);

    let ul = document.getElementById("main-task-list");
    let li = document.createElement("li");
    li.setAttribute('id', `main-task-${task.id}`);
    
    li.innerHTML = `<div class="primary-task" onmouseenter="showButtons(${task.id})" onmouseleave="hideButtons(${task.id})">
	                    <div class="task-status" id="primary-task-status-${task.id}" onclick="toggleTask(${task.id})">
                        </div>
	                    <div class="task-name" id="primary-task-name-${task.id}">
                            ${task.name}
                        </div>
	                    <div class="task-desc" id="primary-task-desc-${task.id}">
                            ${task.desc}
                        </div>
                        <div class="task-buttons" id="primary-task-buttons-${task.id}">      
                            <button class="buttonf" onclick="createSubTaskAlertBox(${task.id})">
                                <i class="fa fa-plus"></i>
                            </button>
                            <button class="buttonf" onclick="editMainTaskAlertBox(${task.id},'${task.name}','${task.desc}')">
                                <i class="fa fa-edit"></i>
                            </button>
                            <button class="buttonf" onclick="deleteTask(${task.id})">
                                <i class="fa fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <ul class="secundary-task-list" id="secondary-task-list-${task.id}">
                            
                    </ul>`;
    ul.appendChild(li);

    document.getElementById(`primary-task-status-${task.id}`).style.background = statusColor;
}

/**
 *  Inserts subtask object into primary task list using DOM
 * @param {int} id 
 * @param {Object} subtask 
 */
function createSubTaskElement(id, subtask) {
    let statusColor = getStatusColor(subtask.status);

    let ul = document.getElementById(`secondary-task-list-${id}`);
    let li = document.createElement("li");

    li.setAttribute('class', 'secundary-task');
    li.setAttribute('id', `secundary-task-${id}-${subtask.id}`);
    
    li.innerHTML = `<div class="secundary-task-a" onmouseenter="showButtons(${id},${subtask.id})" onmouseleave="hideButtons(${id},${subtask.id})">
                        <div class="task-status" id="secundary-task-status-${id}-${subtask.id}" onclick="toggleSubTask(${id},${subtask.id})">
                        </div>
                        <div class="task-name" id="secundary-task-name-${id}-${subtask.id}">
                            ${subtask.name}
                        </div>
                        <div class="task-desc" id="secundary-task-desc-${id}-${subtask.id}">
                            ${subtask.desc}
                        </div>
                        <div class="task-buttons" id="secundary-task-buttons-${id}-${subtask.id}">
                            <button class="buttonf" onclick="editSubTaskAlertBox(${id}, ${subtask.id})">
                                <i class="fa fa-edit"></i>
                            </button>
                            <button class="buttonf" onclick="deleteSubTask(${id}, ${subtask.id})">
                                <i class="fa fa-trash"></i>
                            </button>
                        </div>
                    </div>`;

    ul.appendChild(li);

    document.getElementById(`secundary-task-status-${id}-${subtask.id}`).style.background = statusColor;
}

/**
 * 
 * @param {String} status Status name 
 * @returns Hex color
 */
function getStatusColor(status) {
    const colors = {
        to_do: "#DB0E33",
        doing: "#E9CC38",
        done: "#0FD018"
    }

    return colors[status];
}