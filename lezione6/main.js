// Import electron
const { log } = require('console')
const {app, BrowserWindow, ipcMain, ipcRenderer, Menu, MenuItem } = require('electron')
// Importa il path
const path = require('path')

// Definizione Menu barra
const template = [
    {label: 'test add menu', click: addDynamicMenu}, 
    {label: 'prova', click: () => {console.log('test click su pulsante menu')}},
    {label: 'prova1', click: () => {sendEventToWebPage()}},
    {label: 'prova2', submenu: [
        {label: 'sottomenu1', click: () => {console.log('test 1')}},
        {type: 'separator'},
        {label: 'sottomenu2', click: () => {console.log('test 2')},  enabled: false},
        {label: 'sottomenu3', click: () => {console.log('test 3')}}
    ]},
    {label: 'close', role: 'close'},
    {label: 'test insert menu', click: insertDynamicMenu}, 
    {label: 'disabler', click: disableButtonMenu}, 
    {label: 'btn', accelerator: 'Alt+Ctrl+I', id: 'btn', click: () => {console.log('test')}}
]

// Costruzione del menu applicando il template
const menu = Menu.buildFromTemplate(template)

// Inizializzare il menu
Menu.setApplicationMenu(menu)

function sendEventToWebPage() {
    let text = 'da main'
    console.log('log di test')
    mainWindow.webContents.openDevTools();
    mainWindow.webContents.send('clickMenu', {data: text} )
}

function addDynamicMenu() {
   menu.append(
    new MenuItem({
        label: 'aggiunto'
    })
   )
   Menu.setApplicationMenu(menu)
}

function insertDynamicMenu() {
    menu.insert(2,
     new MenuItem({
         label: 'aggiunto2'
     })
    )
    Menu.setApplicationMenu(menu)
 }

 function disableButtonMenu() {
    console.log('aaa');
    menu.getMenuItemById('btn').enabled = false;
 }

let mainWindow;

// Inizializzazione della finestra e associazione alla finestra web
const createWindow = () => {
    mainWindow = new BrowserWindow({
        // width: 600,
        // height: 480,
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
