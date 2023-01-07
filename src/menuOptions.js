const isMac = require("./utils/isMac");
const { BrowserWindow } = require("electron");
const path = require("path");
const mainWindow = require("./main");

const webHoster = () => {
  const win = new BrowserWindow({
    width: 400,
    height: 250,
    parent: mainWindow,
    modal: true,
    preload: path.join(__dirname, "preload.js"),
    // frame: false,
  });
  // win.removeMenu();
  win.loadFile(path.join(__dirname, "webHoster.html"));
};

const menuOptions = [
  {
    label: "File",
    submenu: [isMac() ? { role: "close" } : { role: "quit" }],
  },
  {
    label: "Host Web",
    submenu: [
      {
        label: "New Host",
        click: webHoster,
      },
      { type: "separator" },
      { label: "See Hosts" },
    ],
  },
  {
    label: "Go Remote",
  },
  {
    label: "File Sharing",
  },
  { role: "viewMenu" },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://electronjs.org");
          shell.beep();
        },
      },
    ],
  },
];

module.exports = menuOptions;
