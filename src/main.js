// Import electron
const {app, BrowserWindow, ipcMain, ipcRenderer } = require('electron')
// Importa il path
const path = require('path')

// Import webp converter
const webp = require('webp-converter');

// Evita problemi relativi i permessi di conversione dell'immagine
webp.grant_permission();

let mainWindow;

// Inizializzazione della finestra e associazione alla finestra web
const createWindow = () => {
    mainWindow = new BrowserWindow({
        // width: 600,
        // height: 480,
        frame: false,
        // Preferenze lato web
        webPreferences: {
            // Integra node lato web
            nodeIntegration: true,
            // Non isola il contesto
            contextIsolation: false,
            // Preload di questo script precaricamento applicazione
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // Carica il file inde.html
    mainWindow.loadFile('index.html')
}

ipcMain.on('window:minimize', (event, data) => {
    mainWindow.minimize();
})

ipcMain.on('window:square', (event, data) => {
    if (mainWindow.isMaximized()) {
        mainWindow.restore()
    } else {
        mainWindow.maximize();
    }
}) 

ipcMain.on('window:close', (event, data) => {
    mainWindow.close()
})

// Quando l'applicazione è pronta, crea la finestra
app.whenReady().then(() => {
    createWindow();
    console.log('Server Electron run');
})
