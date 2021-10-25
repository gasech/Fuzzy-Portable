let idCounter = 0;

let tasks = [
	{
		id: 0,
		name: "Code a ToDoList",
		desc: "Make a basic ToDoList",
		status: "doing"
	}
]

// Status can be to do, doing or done.

function createTask() {
	let inputName = document.getElementById("inputname").value;
	let inputDesc = document.getElementById("inputdesc").value;

	if (inputName.length > 18) return alert("Please use 18 characters or less in task name.");
	if (inputDesc.length > 40) return alert("Please use 40 characters or less in task description.");

	idCounter++;
	tasks.push({ id: idCounter, name: inputName, desc: inputDesc, status: "to do" });

	let currentTask = tasks[tasks.length - 1];

	var table = document.getElementById("tasksTable");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	cell1.innerHTML = currentTask.name;
	cell2.innerHTML = currentTask.desc;
	cell3.innerHTML = `<span id="status${currentTask.id}" onclick="toggleTask(${currentTask.id})">${currentTask.status}</span>`;
	cell4.innerHTML = `<input type="button" value="delete" onclick="deleteTask(this, ${currentTask.id})">`;
}

function deleteTask(row, id) {
	for (let task of tasks) {
		if (id == task.id) {
			task.name = "deleted";
		}
	}

	document.getElementById("tasksTable").deleteRow(row.parentElement.parentElement.rowIndex);
}

function toggleTask(id) {
	let updatedStatus;

	for (let task of tasks) {
		if (id == task.id) {
			switch (task.status) {
				case "to do":
					task.status = updatedStatus = "doing";
					break;
				case "doing":
					task.status = updatedStatus = "done";
					break;
				case "done":
					task.status = updatedStatus = "to do";
					break;
				default:
					console.log("error");
			}
		}
	}

	document.getElementById(`status${id}`).innerHTML = `${updatedStatus}`;
}