const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    // proxy: {
    //   '/api': {
    //     target: 'http://5.23.54.183:105',
    //     changeOrigin: true,
    //     ws: true
    //   },
    // },
  },
});
