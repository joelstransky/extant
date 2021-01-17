const { app } = require("electron");
const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const consts = require("../consts");
const db = require("../db");

const doConvertXML = async () => {
  const parser = new xml2js.Parser({ attrkey: "@" });
  const listXMLpath = path.join(app.getPath("userData"), "listXML.xml");
  return new Promise((resolve, reject) => {
    console.log("starting xml2js");
    fs.readFile(listXMLpath, function (err, data) {
      parser.parseString(data, function (err, result) {
        console.dir(result);
        console.log("Done");
        db.insert(result.mame["machine"], (err) => {
          console.log("insert complete");
          err && console.log("error::", err);
        });
        resolve({ type: consts.CONVERT_XML_COMPLETE });
      });
    });
  });
};

module.exports = doConvertXML;
