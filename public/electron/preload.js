const { contextBridge, ipcRenderer } = require("electron");
const inChannels = ["fromMain"];
const outChannels = ["toMain"];
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("Extant", {
  api: {
    invoke: (channel, data) => {
      if (outChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, data);
      }
      return Promise.reject();
    },
    send: (channel, data) => {
      // whitelist channels
      if (outChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    receive: (channel, func) => {
      // let validChannels = ["fromMain"];
      if (inChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
  },
});
