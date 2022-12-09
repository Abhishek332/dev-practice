const { app, BrowserWindow } = require('electron');

const createWindow = () => {
	const screen = new BrowserWindow({
		width: 800,
		height: 600,
		backgroundColor: '#gff55d',
	});

	screen.loadFile(`${__dirname}/index.html`);
	screen.menuBarVisible = false;
};

app.whenReady().then(() => {
	createWindow();
});
