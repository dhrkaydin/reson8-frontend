"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
let mainWindow;
electron_1.app.whenReady().then(() => {
    mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path_1.default.join(__dirname, "preload.js"), // Path to preload script
            nodeIntegration: false,
        },
    });
    if (process.env.NODE_ENV === "development") {
        mainWindow.loadURL("http://localhost:5713"); // Load Vite dev server
    }
    else {
        mainWindow.loadFile(path_1.default.join(__dirname, "../dist/index.html")); // Load built app
    }
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
