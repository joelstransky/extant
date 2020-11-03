const is = require("electron-is");
const execute = () => {
  const process = require("child_process");
  const cmd = is.windows() ? "test.bat" : "public/test.sh";
  console.log("executing...", cmd);
  const child = process.spawn(cmd);

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

exports.execute = execute;
