const { app, BrowserWindow } = require("electron");

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
      pathname: path.join(__dirname, "/dist/electronAngularApp/index.html"),
      protocol: "file",
      slashes: true,
    })
  );

  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  console.log("App run");
});
