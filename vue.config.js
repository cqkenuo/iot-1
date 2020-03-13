module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "primary-color": "#1EAF84",
          "link-color": "#1EAF84",
          "border-radius-base": "2px",
          "font-size-base": "12px"
        },
        javascriptEnabled: true
      }
    }
  },
  pwa: {
    iconPaths: {
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      maskIcon: "favicon.ico",
      msTileImage: "favicon.ico"
    }
  },
  chainWebpack(config) {
    config.entry("main").add("babel-polyfill");
  }
};