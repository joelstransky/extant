const { app } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const { store } = require("../store");

const launchROM = (rom) => {
  const mamepath = store.get("settings.mamepath");
  const mame = spawn(path.join(mamepath, "mame64"), [rom], { cwd: mamepath });

  mame.on("close", function (code) {
    if (code === 0) {
      console.log("mame process complete.");
    } else {
      console.log("mame process exited with code " + code);
    }
  });
};

module.exports = launchROM;
