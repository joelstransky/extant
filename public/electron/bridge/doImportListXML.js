const { app } = require("electron");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");
const { store } = require("../store");

const doImportListXML = async () => {
  const mamepath = store.get("settings.mamepath");
  const mame = spawn(path.join(mamepath, "mame64"), ["-listxml"], {
    cwd: app.getPath("userData"),
    maxBuffer: 1024 * 4096,
  });

  const file = fs.createWriteStream(
    path.join(app.getPath("userData"), "listXML.xml")
  );

  mame.stdout.pipe(file);

  mame.on("error", function (err) {
    console.log("onError::stderr: <" + err + ">");
  });

  mame.stdout.on("data", (data) => {});

  mame.stderr.on("data", (data) => {
    console.log("mameStderrOnData::stderr: <" + data + ">");
  });
  return new Promise((resolve, reject) => {
    mame.on("close", (code) => {
      if (code === 0) {
        console.log("child process complete.");
        resolve();
      } else {
        console.log("child process exited with code " + code);
        reject(code);
      }
    });
  });
};

module.exports = doImportListXML;
