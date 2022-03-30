const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;

const minimizeButton = document.getElementById("minimizeButton");
const closeButton = document.getElementById("closeButton");

// Minimize App
minimizeButton.addEventListener('click', () => {
    ipc.send('minimizeApp')
});

// Close App
closeButton.addEventListener('click', () => {
    ipc.send('closeApp')
});