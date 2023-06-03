const { ipcRenderer } = require("electron");

const minimizeBtn = document.getElementById("minimize");
const squareBtn = document.getElementById("square");
const closeBtn = document.getElementById("close");

minimizeBtn.addEventListener("click", () => {
    ipcRenderer.send("window:minimize");
});

squareBtn.addEventListener("click", () => {
    ipcRenderer.send("window:square");
});

closeBtn.addEventListener("click", () => {
    ipcRenderer.send("window:close");
});

ipcRenderer.on('clickMenu', (event, data) => {
    console.log(data.data);
})