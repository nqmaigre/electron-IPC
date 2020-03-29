// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const ipcRenderer = require('electron').ipcRenderer;

const textArea1 = document.getElementById('textarea-1');
const textArea2 = document.getElementById('textarea-2');
const textArea3 = document.getElementById('textarea-3');
const textArea4 = document.getElementById('textarea-4');
const startButton = document.getElementById('start-button');
const sigintButton = document.getElementById('sigint-button');

startButton.addEventListener('click', (event) => {
    ipcRenderer.send('start-button-click');
});

sigintButton.addEventListener('click', (event) => {
    ipcRenderer.send('sigint-button-click');
});

ipcRenderer.on('test', (event, data) => {
    // console.log(data);
    if(data.type === 'parent') {
        textArea1.value = data.content;
    } else if(data.type === 'child1') {
        textArea2.value = data.content;
    } else if(data.type === 'child2') {
        textArea3.value = data.content;
    } else if(data.type === 'child3') {
        textArea4.value = data.content;
    } else if(data.type === 'log') {
        console.log(data.content);
    }
});