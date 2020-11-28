const { dialog, ipcMain } = require("electron");
const showDialog = () =>
  dialog.showOpenDialog({ properties: ["openFile", "multiSelections"] });
const bridge = {
  init(win, store) {
    // responds to send
    ipcMain.on("toMain", (event, message) => {
      console.log("toMain received", message);
      switch (message.type) {
        case "settings/setMamePath":
          console.log("settings/setMamePath");
          store.set({ "settings.mamepath": message.payload.mamepath });
          break;
        default:
          break;
      }
      // execute();
      win.webContents.send("fromMain", { success: "there was success" });
    });
    // responds to invoke
    ipcMain.handle("toMain", async (event, message) => {
      console.log("toMain received");
      switch (message.type) {
        case "GetElectronStore":
          return Promise.resolve({
            type: "returnElectronStore",
            payload: store.store,
          });
        case "ShowDialog":
          return showDialog();
        default:
          break;
      }
      // execute();
    });
  },
};

exports.bridge = bridge;
