let idCounter = -1;

let tasks = []

function createTask() {
	let inputName = document.getElementById("inputname").value;
	let inputDesc = document.getElementById("inputdesc").value;

	if (inputName.length > 18) return alert("Please use 18 characters or less in task name.");
	if (inputDesc.length > 40) return alert("Please use 40 characters or less in task description.");
	if (inputName == "" || inputName == " ") return alert("Please do not leave the name area empty.");

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
	cell3.innerHTML = `<span id="status-${currentTask.id}" onclick="toggleTask(${currentTask.id})">${currentTask.status}</span>`;
	document.getElementById(`status-${currentTask.id}`).style.color = "#ff5964";
	document.getElementById(`status-${currentTask.id}`).style.fontSize = "18px";
	cell4.innerHTML = `<input type="button" class="button-delete" value="delete" onclick="deleteTask(this, ${currentTask.id})"></input>`;
}

function deleteTask(row, id) {
	for (let task of tasks) {
		if (id == task.id) {
			task.status = "deleted";
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
					document.getElementById(`status-${task.id}`).style.color = "#feab3a";
					break;
				case "doing":
					task.status = updatedStatus = "done";
					document.getElementById(`status-${task.id}`).style.color = "#28b78d";
					break;
				case "done":
					task.status = updatedStatus = "to do";
					document.getElementById(`status-${task.id}`).style.color = "#ff5964";
					break;
				default:
					console.log("error");
			}
		}
	}

	document.getElementById(`status-${id}`).innerHTML = `${updatedStatus}`;
}