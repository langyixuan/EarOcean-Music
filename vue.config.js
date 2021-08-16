const path = require("path");

module.exports = {
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,

  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      scss: {
        prependData: `@import "./src/styles/main.scss";`
      }
    }
  },

  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: true
    }
  },

  transpileDependencies: ["quasar"],

  devServer: {
    // 项目启动后自动打开浏览器
    open: true,
    // 指定本地服务器的端口号
    port: 8181,
    // 跨域配置
    proxy: {
      '/api': {
        // 跨域地址(将/api 替换成 http://localhost:3000 )
        target: 'http://localhost:3000',
        //路径重新方案
        pathRewrite: { '^/api': '' },
        // 是否允许处理跨域问题
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },

  },
};
