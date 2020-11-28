const Store = require("electron-store");
const schema = {
  settings: {
    mamepath: {
      type: "string",
      default: "",
    },
    isOpen: "boolean",
  },
};
// overrides schema
const defaults = {
  settings: {
    mamepath: "./from/electron",
    isOpen: false,
  },
};

const store = new Store({ name: "extant-user-preferences", schema, defaults });
exports.store = store;
