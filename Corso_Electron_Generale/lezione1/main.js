// Import electron
const {app, BrowserWindow} = require('electron')
// Importa il path
const path = require('path')

// Inizializzazione della finestra e associazione alla finestra web
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        // Preload di questo script precaricamento applicazione
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
// Carica il file inde.html
    win.loadFile('index.html')
}

// Quando l'applicazione è pronta, crea la finestra
app.whenReady().then(() => {
    createWindow();
})

console.log('Server Electron run');