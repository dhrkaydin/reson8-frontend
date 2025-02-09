import { app, BrowserWindow } from "electron";
import path from "path";

let mainWindow: BrowserWindow | null;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Path to preload script
      nodeIntegration: false,
    },
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5713"); // Load Vite dev server
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html")); // Load built app
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});