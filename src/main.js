const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

const isMac = process.platform === 'darwin';

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	win.loadFile(`${__dirname}/index.html`);
	win.removeMenu();

	//Creating Menu
	const template = [
		// { role: 'appMenu' }
		...(isMac ? [{
		  label: app.name,
		  submenu: [
			{ role: 'about' },
			{ type: 'separator' },
			{ role: 'services' },
			{ type: 'separator' },
			{ role: 'hide' },
			{ role: 'hideOthers' },
			{ role: 'unhide' },
			{ type: 'separator' },
			{ role: 'quit' }
		  ]
		}] : []),
		// { role: 'fileMenu' }
		{
		  label: 'File',
		  submenu: [
			isMac ? { role: 'close' } : { role: 'quit' }
		  ]
		},
		// { role: 'editMenu' }
		{
		  label: 'Edit',
		  submenu: [
			{ role: 'undo' },
			{ role: 'redo' },
			{ type: 'separator' },
			{ role: 'cut' },
			{ role: 'copy' },
			{ role: 'paste' },
			...(isMac ? [
			  { role: 'pasteAndMatchStyle' },
			  { role: 'delete' },
			  { role: 'selectAll' },
			  { type: 'separator' },
			  {
				label: 'Speech',
				submenu: [
				  { role: 'startSpeaking' },
				  { role: 'stopSpeaking' }
				]
			  }
			] : [
			  { role: 'delete' },
			  { type: 'separator' },
			  { role: 'selectAll' }
			])
		  ]
		},
		// { role: 'viewMenu' }
		{
		  label: 'View',
		  submenu: [
			{ role: 'reload' },
			{ role: 'forceReload' },
			{ role: 'toggleDevTools' },
			{ type: 'separator' },
			{ role: 'resetZoom' },
			{ role: 'zoomIn' },
			{ role: 'zoomOut' },
			{ type: 'separator' },
			{ role: 'togglefullscreen' }
		  ]
		},
		// { role: 'windowMenu' }
		{
		  label: 'Window',
		  submenu: [
			{ role: 'minimize' },
			{ role: 'zoom' },
			...(isMac ? [
			  { type: 'separator' },
			  { role: 'front' },
			  { type: 'separator' },
			  { role: 'window' }
			] : [
			  { role: 'close' }
			])
		  ]
		},
		{
		  role: 'help',
		  submenu: [
			{
			  label: 'Learn More',
			  click: async () => {
				const { shell } = require('electron')
				await shell.openExternal('https://electronjs.org')
			  }
			}
		  ]
		}
	  ]
	  
	  const menu = Menu.buildFromTemplate(template)
	  Menu.setApplicationMenu(menu)
	  
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

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (! isMac) {
		app.quit();
	}
});

