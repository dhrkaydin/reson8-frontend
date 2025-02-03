import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'url';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const isDev = process.env.VITE_NODE_ENV === 'development';
  console.log('isDev:', isDev);

  if (isDev) {
    console.log('Loading development build from http://localhost:5713');
    mainWindow.loadURL('http://localhost:5713');
  } else {
    console.log('Loading production build');
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }

  mainWindow.webContents.openDevTools();

  mainWindow.webContents.on("did-fail-load", (event, errorCode, errorDescription) => {
    console.error("❌ Failed to load:", errorDescription);
  });

  mainWindow.webContents.on("did-finish-load", () => {
    console.log("✅ Page loaded successfully!");
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
