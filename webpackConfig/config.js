var path = require("path");

//导出开发模式和生产模式的一些文件目录配置等等
module.exports = {
    build: {
        //assetsRoot: path.resolve(__dirname, "../build/"),
        assetsRoot: "/",
        assetsPublicPath: "/dist/"
    },
    dev: {
        assetsPublicPath: "/",
        assetsSubDirectory: "static",
        autoOpenBrowser: true,
        port: 3001
    }
}