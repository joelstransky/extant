const path = require("path");
const fs = require("fs");
const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
var shell = require("shelljs");
const { setMenu } = require("./menu");
const { execute } = require("./process");
// Conditionally include the dev tools installer to load React Dev Tools
// let installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS;
let win;

if (isDev) {
  // const devTools = require("electron-devtools-installer");
}
setMenu();
// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
  app.quit();
}
async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 640,
    height: 480,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js"), // use a preload script
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  ipcMain.on("toMain", (event, args) => {
    console.log("toMain received");
    execute();
    win.webContents.send("fromMain", { success: "there was success" });
  });
  // Open the DevTools.
  win.webContents.on("did-frame-finish-load", () => {
    if (isDev) {
      win.webContents.openDevTools({ mode: "right" });
    }
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = require("electron-devtools-installer");
    installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((error) => console.log(`An error occurred: , ${error}`));
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
