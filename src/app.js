const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

const { FileManager } = require('./filemanager')
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('src/index.html')
}

app.whenReady().then(() => {
  createWindow()
  let f = new FileManager()
  f.run()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})