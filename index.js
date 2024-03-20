if (process.env.DEBUG) {
  require("nodemon")({ script: "development.js" });
} else {
  require("./build");
}
