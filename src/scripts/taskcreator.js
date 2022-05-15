/**
 * Inserts task object into main task list using DOM
 * @param {Object} task 
 */
function createTaskElement(task) {
    let importance = task.important ? '1px solid var(--primaryColor)' : 'none';

    let ul = document.getElementById("main-task-list");
    let li = document.createElement("li");
    li.setAttribute('id', `main-task-${task.id}`);

    li.innerHTML = `<div class="primary-task" onclick="toggleTask(${task.id})" onmouseenter="showButtons(${task.id})" onmouseleave="hideButtons(${task.id})">
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

    let primaryTask = document.getElementById(`main-task-${task.id}`).firstChild;
    primaryTask.style.border = importance;
}

/**
 *  Inserts subtask object into primary task list using DOM
 * @param {int} id 
 * @param {Object} subtask 
 */
function createSubTaskElement(id, subtask) {
    let importance = subtask.important ? '1px solid var(--primaryColor)' : 'none';

    let ul = document.getElementById(`secondary-task-list-${id}`);
    let li = document.createElement("li");

    li.setAttribute('class', 'secundary-task');
    li.setAttribute('id', `secundary-task-${id}-${subtask.id}`);

    li.innerHTML = `<div class="secundary-task-a" onclick="toggleSubTask(${id},${subtask.id})" onmouseenter="showButtons(${id},${subtask.id})" onmouseleave="hideButtons(${id},${subtask.id})">
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

    document.getElementById(`secundary-task-${id}-${subtask.id}`).style.border = importance;
}