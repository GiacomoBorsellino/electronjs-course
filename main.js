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
        width: 800,
        height: 600,
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

// Ricezione dato ipc da dal render process nella Pagina Web
ipcMain.on('imgWebp', (event, data) => {
    console.log('Dato IPC Arrivato: ', data);
    const result = webp.cwebp("./steve.jpg","./steve.webp","-q 100",logging="-v");
    result.then((response) => {
      console.log(response);

      mainWindow.webContents.send('datoMainProcess', {data: 'Processo di conversione andato a buon fine'})
    });
})

// Quando l'applicazione è pronta, crea la finestra
app.whenReady().then(() => {
    createWindow();
})


console.log('Server Electron run');