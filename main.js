const {app, BrowserWindow, ipcMain, shell} = require('electron');
const {exec} = require('child_process');
const path = require('path');
const os = require('os');

function getSystemInfo(callback) {
  const uptime = os.uptime();
  const ramTotal = (os.totalmem() / 1024 / 1024 / 1024).toFixed(1);
  const ramUsed = ((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(1);
  const cpuLoad = os.loadavg();

  exec("df -h --output=used,size / | tail -1", (err, stdout) => {
    let diskUsed = '?', diskTotal = '?';
    if (!err) {
      const parts = stdout.trim().split(/\s+/);
      diskUsed = parts[0];
      diskTotal = parts[1];
    }
    callback({
      uptime,
      cpuLoad,
      ramUsed,
      ramTotal,
      diskUsed,
      diskTotal
    });
  });
}

async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // const win = new BrowserWindow({
  //     fullscreen: true,
  //     frame: false,
  //     webPreferences: {
  //         preload: path.join(__dirname, 'preload.js')
  //     }
  // });
  // await win.loadFile('app/index.html');

  await win.loadURL('http://localhost:5173');

  // Отправка системных данных каждые 2 сек
  setInterval(() => {
    getSystemInfo((info) => {
      win.webContents.send('system-info', info);
    });
  }, 1000);
}

ipcMain.on('run-command', (event, cmd) => {
  exec(cmd, (err) => {
    if (err) console.error(err);
  });
});

ipcMain.on('open-link', (event, url) => {
  shell.openExternal(url);
});

app.whenReady().then(createWindow);
