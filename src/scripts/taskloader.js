const fs = require('fs');

// Tasks Object Array
let tasks = [];

// Dev Mode
const devMode = true;

// Json Path
let taskJsonPath;

(function devModeFunction() {
    if (devMode) {
        taskJsonPath = 'src/task.json';
    } else {
        taskJsonPath = 'resources/app/src/task.json';
    }
})();

/**
 * Read all tasks from JSON file and returns it
 * @returns Tasks data from JSON file
 */
function readTasks() {
    let tasksData;
    try {
        const data = JSON.parse(fs.readFileSync(taskJsonPath, 'utf8'));
        tasksData = data;
    } catch (err) {
        console.error(err)
    }
    return tasksData;
}

/**
 * Updates tasks file using tasks objects array
 */
function updateTaskList() {
    try {
        fs.writeFileSync(taskJsonPath, JSON.stringify(tasks, null, 2))
    } catch (err) {
        console.error(err)
    }
}

/**
 * Task Loader initial trigger, loads all tasks from JSON file
 */
(function loadTasks() {
    if (readTasks()) {
        const localStorageTasks = readTasks();

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
    tasks.push(task);
    if (task.status != "deleted") {
        createTaskElement(task);
        loadSubTasksElements(task.id);
    }
}

/**
 * Loads all subtask elements into the page
 * @param {int} id 
 */
function loadSubTasksElements(id) {
    for (let task of tasks) {
        if (task.id == id) {
            for (let subtask of task.subtasks) {
                if (subtask.status != "deleted") {
                    createSubTaskElement(task.id, subtask);
                }
            }
        }
    }
}