const is = require("electron-is");
const { spawn, execFile } = require("child_process");
const { store } = require("./store");
const execute = () => {
  const cmd = is.windows() ? "test.bat" : "public/test.sh";
  console.log("executing...", cmd);
  const child = spawn(cmd);

  child.on("error", function (err) {
    console.log("stderr: <" + err + ">");
  });

  child.stdout.on("data", function (data) {
    console.log(data);
  });

  child.stderr.on("data", function (data) {
    console.log("stderr: <" + data + ">");
  });

  child.on("close", function (code) {
    if (code === 0) {
      console.log("child process complete.");
    } else {
      console.log("child process exited with code " + code);
    }
  });
};

const cli = (cmd) => {
  const mamepath = store.get("settings.mamepath");
  return new Promise((resolve, reject) => {
    const child = execFile(
      "mame64",
      cmd.split(" "),
      { cwd: mamepath, maxBuffer: 1024 * 4096 },
      (error, stdout, stderr) => {
        if (error) {
          console.log("stderr: <" + stderr + ">");
          throw error;
        }
        // console.log("stdout", stdout);
        resolve(stdout);
      }
    );

    child.on("close", function (code) {
      if (code === 0) {
        console.log("child process complete.");
      } else {
        console.log("child process exited with code " + code);
      }
    });
  });
};

exports.execute = execute;
exports.cli = cli;
// send
// *response
// receive
// *respond
