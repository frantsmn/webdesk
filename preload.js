const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  runCommand: (cmd) => ipcRenderer.send('run-command', cmd),
  openLink: (url) => ipcRenderer.send('open-link', url),
  onSystemInfo: (callback) => ipcRenderer.on('system-info', (event, data) => callback(data))
});
