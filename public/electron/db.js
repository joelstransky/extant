const { app } = require("electron");
const path = require("path");
const Datastore = require("nedb");

const filename = path.join(app.getPath("userData"), "machines.db");
const db = new Datastore({ filename, autoload: true });
module.exports = db;
