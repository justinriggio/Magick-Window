// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
let win;

const createWindow = () => {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    // fullscreen: true,
    webPreferences: {
        nodeIntegration: false, // is default value after Electron v5
        // contextIsolation: true, // protect against prototype pollution
        // enableRemoteModule: false, // turn off remote
        preload: path.join(__dirname, "preload.js") // use a preload script
    }
  })

  // and load the index.html of the app.
  // win.loadFile('index.html')
  win.loadFile(path.join(__dirname, "dist/index.html"));

  // Open the DevTools.
  // win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on("toMain", (event, args) => {
    console.log(args);
    // fs.readFile("path/to/file", (error, data) => {
    //     // Do something with file contents

    //     // Send result back to renderer process
    //     win.webContents.send("fromMain", responseObj);
    // })
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.