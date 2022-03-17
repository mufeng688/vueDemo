const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      ajax: {
        target: "http://47.97.192.7:10000/",
        // target: "http://169.254.218.100:8888/",
        // target: "https://m.maizuo.com/",
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          "^/ajax": "/",
        },
      },
    },
  },
});
