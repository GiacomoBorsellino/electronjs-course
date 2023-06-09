// Import electron
const { log } = require("console");
const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  Tray,
  nativeImage,
  Notification,
  globalShortcut,
} = require("electron");
// Importa il path
const path = require("path");

const mousetrap = require("mousetrap");

// Import Context-Menu libreria
const contextMenu = require("electron-context-menu");

// contextMenu({
//     showSaveImageAs: true,
//     labels: {
//         saveImageAs: 'Toblerone'
//     }
// })

contextMenu({
  showSaveImageAs: true,
  labels: {
    saveImageAs: "Toblerone",
  },
  menu: (actions, props, browserWindow, dictionarySuggestions) => [
    actions.separator(),
    {
      label: "Unicorn",
      click: () => {
        console.log("Wooody");
      },
    },
    actions.separator(),
  ],
});

// Definizione Menu barra
const template = [
  {
    label: "bottone1",
    click: () => {
      console.log("test click su pulsante menu");
    },
  },
  {
    label: "bottone2",
    submenu: [
      {
        label: "sottobottone1",
        click: () => {
          console.log("test 1");
        },
      },
      { type: "separator" },
      {
        label: "sottobottone2",
        click: () => {
          console.log("test 2");
        },
        enabled: false,
      },
      {
        label: "sottobottone3",
        click: () => {
          console.log("test 3");
        },
      },
    ],
  },
  { label: "OpenSecondWindow", click: createSecondWindow },
];

// Costruzione del menu applicando il template
const menu = Menu.buildFromTemplate(template);

// Inizializzare il menu
Menu.setApplicationMenu(menu);

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
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");

  mainWindow.webContents.on("before-input-event", (event, input) => {
    if (input.control && input.alt && input.key.toLowerCase() === "i") {
      event.preventDefault();
      console.log("Scorciatoia specifica");
    }
  });

  mainWindow.webContents.openDevTools();

  // mainWindow.on('minimize', (event) => {
  //     mainWindow.setSkipTaskbar(true)
  // })

  // Carica il file inde.html in questa finestra

  // mainWindow.webContents.on('context-menu', () => {
  //     menu.popup()
  // })
};

// Creazione seconda window
let secondWindow;
function createSecondWindow() {
  secondWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    width: 400,
    height: 200,
    webPreferences: {
      // Integra node lato web
      nodeIntegration: true,
      // Non isola il contesto
      contextIsolation: false,
    },
  });
  // Carica il file form.html
  secondWindow.loadFile("form.html");

  mainWindow.webContents.openDevTools();

  // Alla chiusura di questa finestra principale verrà chiusa l'intera Applicazione (con tutte le finstre secondarie a seguito)
  mainWindow.on("closed", () => {
    app.quit();
  });
}

// Botton Topbar
ipcMain.on("window:minimize", (event, data) => {
  mainWindow.minimize();
});

ipcMain.on("window:square", (event, data) => {
  if (mainWindow.isMaximized()) {
    mainWindow.restore();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on("window:close", (event, data) => {
  mainWindow.close();
});

ipcMain.on("window:form", (event, data) => {
  console.log("arrivato");
  secondWindow.webContents.openDevTools();
  secondWindow.close();
  secondWindow = null;
  // mainWindow.webContents.send('dataDaForm')
});

ipcMain.on("notification", () => {
  const notification = new Notification({
    title: "Zuppa di ceci",
    subtitle: "ricetta",
    body: "Ingredienti: fagioli",
    icon: icon,
  });
  console.log("not", notification);
  // Mostra la notifica
  notification.show();
  // Gestisce eventi sulla notifica
  notification.on("close", (event, args) => {
    console.log("close");
  });
});

let tray = null;
let icon = null;
// Quando l'applicazione è pronta, crea la finestra
app
  .whenReady()
  .then(() => {
    // globalShortcut.register("Alt+Shift+i", () => {
    //   console.log("Scorciatoia");
    // });

    app.setAppUserModelId("me.utente");
    createWindow();

    icon = nativeImage.createFromPath(path.join(__dirname, "trayIcon.png"));
    tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
      { label: "chiudi", role: "quit" },
    ]);
    tray.setContextMenu(contextMenu);

    tray.setToolTip("Tooltip Applicazione di Giacomo");
    tray.setTitle("Title Applicazione di Giacomo");

    tray.on("double-click", (event) => {
      mainWindow.show();
    });
  })
  .catch((error) => {
    console.log(error);
  });
