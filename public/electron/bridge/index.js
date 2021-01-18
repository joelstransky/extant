const { dialog, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");
const consts = require("../consts");
const db = require("../db");
const { cli } = require("../process");
const showDialog = (options = { properties: ["openDirectory"] }) =>
  dialog.showOpenDialog(options);
console.log("consts are ", consts);
const readVgaPlay = async (mamepath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.dirname(mamepath) + "/hash/vgmplay.xml",
      "utf-8",
      (err, data) => {
        if (err) {
          alert("An error ocurred reading the file :" + err.message);
          return;
        }
        resolve(data);
        // Change how to handle the file content
        // console.log("The file content is : " + data);
      }
    );
  });
};
const listXML = async () => {
  const out = await cli("ddonpach -listxml");
  console.log("proc is", out);
  return out;
};
const listAll = async () => {
  // const out = await cli("-listfull");
  // console.log("listAll is", out);
  return "";
};
const bridge = {
  init(win, store) {
    // responds to send
    ipcMain.on(consts.MAIN_CHANNEL_IN, (event, message) => {
      console.log("toMain received", message);
      switch (message.type) {
        case "settings/setMamePath":
          console.log("settings/setMamePath");
          store.set({ "settings.mamepath": message.payload.mamepath });
          break;
        case "settings/doImportListXML":
          console.log("got doImportXML");
          require("./doImportListXML")().then(() => {
            win.webContents.send(consts.LIST_XML_COMPLETE);
          });
          break;
        case "settings/doListXML2js":
          console.log("got doListXML2js");
          require("./doConvertXML")().then(() => {
            win.webContents.send(consts.CONVERT_XML_COMPLETE);
          });
          break;
        case "roms/findROMS":
          db.find(message.payload.query, (err, docs) => {
            win.webContents.send();
          });
          break;
        default:
          break;
      }
      // execute();
      win.webContents.send(consts.MAIN_CHANNEL_OUT, {
        success: "there was success",
      });
    });
    // responds to invoke
    console.log("BRIDGE::", consts.MAIN_CHANNEL_IN);
    ipcMain.handle(consts.MAIN_CHANNEL_IN, async (event, message) => {
      console.log("invoke toMain received", message);
      switch (message.type) {
        case consts.CHECK_LIST_XML:
          // return Promise.resolve({});
          return require("./checkListXML")();
        case "GetElectronStore":
          console.log("at getelecstore");
          return Promise.resolve({
            type: "returnElectronStore",
            payload: store.store,
          });
        case "ShowDialog":
          return showDialog();
        case "ReadVGAPlay":
          return readVgaPlay(message.payload);
        case "Mame64:ListXML":
          return listXML();
        case "Mame64:ListAll":
          return listAll();
        case consts.RESPOND_WITH_QUERY:
          console.log("resp with q", message);
          return new Promise((resolve, reject) => {
            db.find(message.payload, (err, docs) => {
              err && console.log("err is", err);
              console.log("docs are", docs);
              resolve(docs);
            });
          });
        case consts.LAUNCH_ROM:
          require("./launchRom")(message.payload.rom);
          break;
        default:
          break;
      }
    });
  },
};

exports.bridge = bridge;
