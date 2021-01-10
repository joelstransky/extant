const { app } = require("electron");
const fs = require("fs");
const path = require("path");

const checkListXML = () =>
  fs.existsSync(path.join(app.getPath("userData"), "listXML.xml"));

module.exports = checkListXML;
