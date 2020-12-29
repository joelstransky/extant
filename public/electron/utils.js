const is = require("electron-is");

const appData_x = () =>
  is.windows()
    ? "%APPDATA%"
    : is.linux()
    ? "~/.config"
    : "~/Library/Application Support";

module.exports = { appData_x };
