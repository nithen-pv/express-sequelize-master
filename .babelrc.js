const pkg = require("./package.json");

const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        node: pkg.engines.node,
      },
    },
  ],
];

const plugins = [
  [
    "module-resolver",
    {
      root: ["./src"],
    },
  ],
];

module.exports = {
  presets,
  plugins,
};
