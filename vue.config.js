const path = require("path");
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        Components: path.resolve(__dirname, "src/components"),
        Pages: path.resolve(__dirname, "src/pages"),
        Router: path.resolve(__dirname, "src/router"),
        Store: path.resolve(__dirname, "src/store"),
        Blocks: path.resolve(__dirname, "src/blocks"),
        PublicGestures: path.resolve(__dirname, "public/gestures"),
        PublicStatuses: path.resolve(__dirname, "public/statuses"),
      },
    },
  },
};
