const { app, BrowserWindow, Menu } = require("electron");
const menuOptions = require("./components/menuOptions");
const path = require("path");

const isMac = process.platform === "darwin";

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile(`${__dirname}/index.html`);
  win.removeMenu();

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

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
