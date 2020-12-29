const { cli } = require("../process");

const doImportListXML = async () => {
  const out = await cli("ddonpach -listxml");
  console.log("proc is", out);
  return out;
};

module.exports = doImportListXML;
