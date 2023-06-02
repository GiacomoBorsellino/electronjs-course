window.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById('node-version')
    element.innerText = process.versions['node']

    const element2 = document.getElementById('chrome-version')
    element2.innerText = process.versions['chrome']

    const element3 = document.getElementById('electron-version')
    element3.innerText = process.versions['electron']
})