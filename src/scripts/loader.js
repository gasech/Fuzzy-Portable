const fs = require('fs');

let time;

function loadPage() {
    time = setTimeout(showPage, 300);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("content").style.display = "block";
}

const path = getPath();

function getPath(){
    if (fs.existsSync('resources/app/src/')) {
        return 'resources/app/src/';
    } else {
        return 'src/';
    }
}

function getPreferences(){
    let localPreferences;
    
    try {
        localPreferences = JSON.parse(fs.readFileSync(path + 'preferences.json', 'utf8'));
    } catch (err) {
        console.error(err)
    }

    return localPreferences;
}

function setPreferences(preferences){
    try {
        fs.writeFileSync(path + 'preferences.json', JSON.stringify(preferences, null, 2))
    } catch (err) {
        console.error(err)
    }
}

function fillPreferences(){
    let preferences = getPreferences();

    document.getElementById('bgimg_url').value = preferences.backgroundImage;
    document.getElementById('prim_color').value = preferences.primaryColor;
}

(function setup(){
    let preferences = getPreferences();
    // Set Background
    document.getElementById("background").style.backgroundImage = `url(${preferences.backgroundImage})`;
    // Set Primary Color
    document.querySelector(':root').style.setProperty('--primaryColor', preferences.primaryColor);
    // Set Home Menu
    toggleTab("home");
    // Set Cronometer Menu
    toggleTabTimers("cronometer")
    // Fill Preferences Inputs
    fillPreferences();
})();

// Tasks Object Array
let tasks = [];

/**
 * Read all tasks from JSON file and returns it
 * @returns Tasks data from JSON file
 */
function readTasks() {
    let tasksData;
    try {
        tasksData = JSON.parse(fs.readFileSync(path + 'task.json', 'utf8'));
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
        fs.writeFileSync(path + 'task.json', JSON.stringify(tasks, null, 2))
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