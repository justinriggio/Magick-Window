// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, Menu, Notification, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const PDFDocument = require("pdfkit");

let win;
let adminWin;
let dashboard;
const isMac = process.platform === "darwin";
const pdf = new PDFDocument();
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hour = date.getHours();
const minute = date.getMinutes();
const second = date.getSeconds();
const millisecond = date.getMilliseconds();

// read files from folder and add to an array
const readFiles = () => {
  const files = fs.readdirSync("./screenshots");
  return files;
};


// generate unique id for image
const generateUniqueId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};



const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideOthers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" },
          ],
        },
      ]
    : []),
  // { role: 'fileMenu' }
  {
    label: "File",
    submenu: [isMac ? { role: "close" } : { role: "quit" }],
  },
  // { role: 'editMenu' }
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      ...(isMac
        ? [
            { role: "pasteAndMatchStyle" },
            { role: "delete" },
            { role: "selectAll" },
            { type: "separator" },
            {
              label: "Speech",
              submenu: [{ role: "startSpeaking" }, { role: "stopSpeaking" }],
            },
          ]
        : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
    ],
  },
  // { role: 'viewMenu' }
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forceReload" },
      { role: "toggleDevTools" },
      { type: "separator" },
      { role: "resetZoom" },
      { role: "zoomIn" },
      { role: "zoomOut" },
      { type: "separator" },
      { role: "togglefullscreen" },
    ],
  },
  // { role: 'windowMenu' }
  {
    label: "Window",
    submenu: [
      { role: "minimize" },
      { role: "zoom" },
      ...(isMac
        ? [
            { type: "separator" },
            { role: "front" },
            { type: "separator" },
            { role: "window" },
          ]
        : [{ role: "close" }]),
    ],
  },
  {
    label: "Screenshots",
    submenu: [
      {
        label: "Screenshot",
        click() {
          console.log("Screenshot");
          screenshot();
        },
      },
      {
        label: "Save to PDF",
        click() {
          console.log("Save to PDF");
          savePdf();
        },
      },
    ],
  },
  {
    label: "Analytics",
    submenu: [
      {
        label: "Open Analytics Window",
        click() {
          console.log("👋");
          createAdminWindow();
        },
      },
      {
        label: "Open Dashboard",
        click() {
          console.log("👋");
          createDashboardWindow();
        },
      },
    ],
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://electronjs.org");
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

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
      preload: path.join(__dirname, "preload.js"), // use a preload script
    },
  });

  // and load the index.html of the app.
  // win.loadFile('index.html')
  win.loadFile(path.join(__dirname, "dist/index.html"));

  // Open the DevTools.
  // win.webContents.openDevTools()
};

const createAdminWindow = () => {
  // Create the browser window.
  adminWin = new BrowserWindow({
    width: 1024,
    height: 768,
    // fullscreen: true,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      // contextIsolation: true, // protect against prototype pollution
      // enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js"), // use a preload script
    },
  });

  // and load the index.html of the app.
  adminWin.loadFile(path.join(__dirname, "dist/admin.html"));

  // Open the DevTools.
  // adminWin.webContents.openDevTools()
};

const createDashboardWindow = () => {
  // Create the browser window.
  adminWin = new BrowserWindow({
    width: 1024,
    height: 768,
    // fullscreen: true,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      // contextIsolation: true, // protect against prototype pollution
      // enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js"), // use a preload script
    },
  });

  // and load the index.html of the app.
  adminWin.loadFile(path.join(__dirname, "dist/dashboard.html"));

  // Open the DevTools.
  // adminWin.webContents.openDevTools()
};

// const screenshot = () => {
//   win.webContents.capturePage().then((image) => {
//     const screenshotDirectory = "./screenshots";
//     const fileName = `./screenshots/${year}-${month}-${day}-${hour}-${minute}-${second}-${millisecond}-${generateUniqueId()}.png`;

//     if (!fs.existsSync("screenshots")) {
//       fs.mkdir("screenshots", (err) => {
//         if (err) return err;

//         fs.writeFile(fileName, image.toPNG(), (err) => {
//           if (err) return err;
//           console.log("Screenshot Directory and File Saved ");
//         });
//       });
//     } else {
//       fs.writeFile(fileName, image.toPNG(), (err) => {
//         if (err) return err;
//         console.log("Screenshot File Saved ");
//       });
//     }
//   });
// };

const screenshot = () => {
  dialog.showSaveDialog(win, {
    title: "Save Screenshot",
    defaultPath: `./screenshots/${year}-${month}-${day}-${hour}-${minute}-${second}-${millisecond}-${generateUniqueId()}.png`,
    filters: [
      {
        name: "Images",
        extensions: ["png", "jpg", "jpeg", "gif"],
      },
    ],
  }).then((filePath) => {
    if (filePath) {
      win.webContents.capturePage().then((image) => {
        fs.writeFile(filePath.filePath, image.toPNG(), (err) => {
          if (err) return err;
          console.log("Screenshot File Saved ");
        });
      });
    }
  });
};



// const savePdf = () => {
//   const screenshotImages = readFiles();
//   if (fs.existsSync("./pdf")) {
//     console.log("PDF Directory Exists");
//   } else {
//     fs.mkdir("pdf", (err) => {
//       if (err) return err;
//       console.log("PDF Directory Created");
//     });
//   }
//   pdf.pipe(fs.createWriteStream(`./pdf/${generateUniqueId()}.pdf`));
//   screenshotImages.forEach((image) => {
//     pdf
//       .addPage()
//       .image(`./screenshots/${image}`, 0, 0, { width: 1024, height: 768 });
//   });
//   pdf.end();
// };

const savePdf = () => {
  dialog.showSaveDialog(win, {  // win is the BrowserWindow instance
    title: "Save PDF",
    defaultPath: `./pdf/${generateUniqueId()}.pdf`,
    filters: [  
      { name: 'PDF', extensions: ['pdf'] },
    ],
  }).then((fileName) => {
    if (fileName === undefined) {
      console.log("No file selected");
      return;
    }
    const screenshotImages = readFiles();
    const pdf = new PDFDocument({
      autoFirstPage: false,
      size: "A4",
      margin: 0,
    });
    pdf.pipe(fs.createWriteStream(fileName.filePath));
    screenshotImages.forEach((image) => {
      pdf
        .addPage()
        .image(`./screenshots/${image}`, 0, 0, { width: 1024, height: 768 });
    });
    pdf.end();
  });
};



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // if (Notification.isSupported()) {
  //   const notification = new Notification({
  //     title: 'Hello World!',
  //     subtitle: 'Nice to see you',
  //     body: 'Are you having a good day?',
  //     hasReply: true
  //   })

  //   notification.show()
  // } else {
  //   console.log('Hm, are notifications supported on this system?')
  // }
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("toMain", (event, args) => {
  console.log(args);
  // fs.readFile("path/to/file", (error, data) => {
  //     // Do something with file contents

  //     // Send result back to renderer process
  //     win.webContents.send("fromMain", responseObj);
  // })
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
