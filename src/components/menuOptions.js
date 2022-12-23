const { app } = require("electron");
const isMac = require("../utlis/isMac");

const menuOptions = [
  {
    label: "File",
    submenu: [isMac() ? { role: "close" } : { role: "quit" }],
  },
  {
    label: "Host Web",
    submenu: [
      { label: "New Host" },
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
