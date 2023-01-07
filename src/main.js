const { app, BrowserWindow, Menu } = require("electron");
const menuOptions = require("./menuOptions");
const path = require("path");
const isMac = require("./utils/isMac");
const electronReload = require("electron-reload");

electronReload(__dirname, {
  electron: path.join(__dirname, "../node_modules/"),
});

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadFile(path.join(__dirname, "main.html"));
  mainWindow.removeMenu();

  //Creating Menu
  const menu = Menu.buildFromTemplate(menuOptions);
  Menu.setApplicationMenu(menu);

  // ipcMain.handle('dark-mode:toggle', () => {
  // 	if (nativeTheme.shouldUseDarkColors) {
  // 		nativeTheme.themeSource = 'light';
  // 	} else {
  // 		nativeTheme.themeSource = 'dark';
  // 	}
  // 	return nativeTheme.shouldUseDarkColors;
  // });

  // ipcMain.handle('dark-mode:system', () => {
  // 	nativeTheme.themeSource = 'system';
  // });
}

app.on("ready", () => createWindow());

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  if (!isMac()) {
    app.quit();
  }
});

exports = mainWindow;
