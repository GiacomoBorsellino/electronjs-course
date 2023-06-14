const { app, BrowserWindow, ipcMain } = require("electron");

const url = require("url");
const path = require("path");

let mainWindow = null;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "/dist/app/index.html"),
      protocol: "file",
      slashes: true,
    })
  );

  mainWindow.webContents.openDevTools();
};

ipcMain.on("prova", () => {
  console.log("Prova ricevuta");
  mainWindow.webContents.send("risposta");
});

app.whenReady().then(() => {
  createMainWindow();
  console.log("App run");
});
