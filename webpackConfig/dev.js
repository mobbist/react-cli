//首先需要检测node和npm的一些版本是否支持node


//加载开发和生产不同的config配置
var config = require("./config")

//判断是否有全局变量NODE_ENV,用于定义是开发还是生产环境,如果没有则定为开发环境
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse('"development"')
};
console.log(process.env.NODE_ENV)


//自动打开指定url的浏览器工具
var opn = require("opn")
var path = require('path')
var express = require("express")
//将webpack作为模块使用
var webpack = require("webpack")
// var proxyMiddleware = require("http-proxy-middleware")

//在开发环境里webpack的配置 
var webpackConfig = require('./webpack.dev.config')
var webpackDevServer = require("webpack-dev-server");
var compiler = webpack(webpackConfig);
//高集中度, 但是定制性比较差,可以通过配置来实现热加载
// var server = new webpackDevServer(compiler, {
//     contentBase: './',
//     publicPath: "/build/"
// })
// server.listen(3001);



//webpack dev middleware 
//功能: 包装webpack使其变为中间件容器,，就是在輸入到輸出的過程中 加工 的一種手段。
//webpack本身只负责打包编译的功能, express是我们开发的服务器, 需要在require到response的过程中透过express的middleware 就是这个webpack dev middleware
//优点: 不需要一直写入硬盘, 所有产生的结果直接存在内存


//webpack hot middleware
// webpack dev server 有提供一種Hot Module Replacement/Hot Reloading 熱替換的功能。 加入 new webpack.HotModuleReplacementPlugin() 或設定來啟用。
//而 webpack hot middleware 是給 webpack-dev-middleware 用的。就是讓我們在一般的 server 上加上熱替換的功能，
//總結來說就是 webpack-dev-middleware + webpack-hot-middleware 即可讓我們用 express 客製一個有熱替換功能的 webpack 開發伺服器。

//webpack 提供了 express 的 middleware 讓我們可以處理一些靜態資源檔而不是使用 express.static

var app = express();

//根据webpack的配置打包生成的文件,存在内存中, 也就是说我们访问的是存在于内存中的文件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    //访问静态目录的文件
    publicPath: webpackConfig.output.publicPath,
    //控制台输出任何东西
    quiet: true
})

//做热加载, 在改变内容的时候也是在内存中生成,这时候需要更新视图,则需要热加载, 就是这个作用
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false,
    heartbeat: 2000
})
app.use(devMiddleware)
app.use(hotMiddleware)

//设置端口
var port = process.env.PORT || config.dev.port
//设置URL
var uri = 'http://localhost:' + port
// 设置在启动应用的时候是否自动打开浏览器 
var autoOpenBrowser = !!config.dev.autoOpenBrowser

//设置资源访问的路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)





devMiddleware.waitUntilValid(() => {
    //所有都打包成功后,进行提示
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        //打开浏览器

        opn(uri)
    }
    //
    //_resolve()
})

var server = app.listen(3001)


//进行build打包编译: 需要传参回调, 否则不进行编译
// webpack(webpackConfig, function (err, stats) {
//     if (err) throw err;
//     //将编译状态通过node标准输出 == console.log
//     process.stdout.write(stats.toString({
//         //对输出颜色进行区分
//         colors: true,
//         modules: false,
//         children: false,
//         chunks: false,
//         chunkModules: false
//     }) + '\n\n')
// });

//git.exe push --progress "origin" mallv2 推送
//git.exe pull --progress --no-rebase -v "origin" mallv2  拉取
