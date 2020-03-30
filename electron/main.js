// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

let mainWindow = null;
const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 810,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        },
        titleBarStyle: 'hidden'
    });

    // and load the index.html of the app.
    mainWindow.loadFile('index.html');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// 收到多进程运算的输出
ipcMain.on('procs-message', (event, data) => {
    mainWindow.webContents.send('procs-message', data);
    // console.log(data);
});

// 用户点击 GUI 上的 start 按钮后，开启多进程运算
ipcMain.on('start-button-click', (event, data) => {
    mainWindow.webContents.send('procs-start');
    // console.log(data);
});

// 用户点击 GUI 上的 SIGINT 按钮后，结束多进程运算
ipcMain.on('sigint-button-click', (event, data) => {
    mainWindow.webContents.send('procs-stop');
    // console.log(data);
});