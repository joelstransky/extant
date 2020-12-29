const fs = require("fs");
const path = require("path");
const { appData_x } = require("../utils");

const checkListXML = () => fs.existsSync(path.join(appData_x(), "listXML.xml"));

module.exports = checkListXML;
