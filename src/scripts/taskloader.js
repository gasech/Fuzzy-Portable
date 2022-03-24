let tasks = [];

/**
 * Updates Local Storage JSON with tasks array
 */
function updateTaskList() {
    localStorage.setItem("taskList", JSON.stringify(tasks));
}

/**
 * Task Loader initial trigger, loads all tasks from Local Storage
 */
(function loadTasks() {
    if (localStorage.getItem("taskList")) {
        const localStorageTasks = JSON.parse(localStorage.getItem("taskList"));

        for (let task of localStorageTasks) {
            loadTaskElements(task);
        }
    }
})();

/**
 * Loads all task elements into the page
 * @param {object} task 
 */
function loadTaskElements(task) {
    let statusColor = "#F50C55";

    tasks.push(task);
    if (task.status != "deleted") {
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

        switch (task.status) {
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

        document.getElementById(`primary-task-status-${task.id}`).style.background = statusColor;
        loadSubTasksElements(task.id);
    }
}

/**
 * Loads all subtask elements into the page
 * @param {int} id 
 */
function loadSubTasksElements(id) {
    let statusColor = "#F50C55";

    for (let task of tasks) {
        if (task.id == id) {
            for (let subtask of task.subtasks) {
                if (subtask.status != "deleted") {
                    let ul = document.getElementById(`secondary-task-list-${id}`);
                    let li = document.createElement("li");
                    let secondId = subtask.id;

                    li.setAttribute('class', 'secundary-task');
                    li.setAttribute('id', `secundary-task-${id}-${secondId}`);
                    li.innerHTML = `
                    <div class="task-status" id="secundary-task-status-${id}-${secondId}" onclick="toggleSubTask(${id},${secondId})"></div>
                    <div class="task-name" id="secundary-task-name-${id}-${secondId}">${subtask.name}</div>
                    <div class="task-desc" id="secundary-task-desc-${id}-${secondId}">${subtask.desc}</div>
                    <div class="task-buttons">
                        <button class="btn" onclick="editSubTaskAlertBox(${id}, ${secondId})"><i class="fa fa-pencil"></i></button>
                        <button class="btn" onclick="deleteSubTask(${id}, ${secondId})"><i class="fa fa-trash"></i></button>
                    </div>
                `;

                    ul.appendChild(li);

                    switch (subtask.status) {
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

                    document.getElementById(`secundary-task-status-${id}-${subtask.id}`).style.background = statusColor;
                }
            }
        }
    }
}