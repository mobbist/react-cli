//加载webpack基本配置
var baseWebpackConfig = require('./webpack.base.config')
var HtmlWebpackPlugin = require("html-webpack-plugin")
var webpack = require('webpack')
//对象合并工具
var merge = require('webpack-merge')

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    // //在循环的过程中, 会将入口文件,凭借成这样的形式  ['./build/dev-client', './src/main.js'],
    // //然后在编译的时候会变成这样: app:[ 'webpack-hot-middleware/client?noInfo=true&reload=true','./src/main.js']
    // //这是用来做热更新的, 用这个来监控main.js 如果有改动, 就立马做热更新


    //注意, 这里加载的entry的值是在baseWebpackconfig所定义的这个地址,但是他又有context来基于此目录进行查找
    baseWebpackConfig.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(baseWebpackConfig.entry[name])
    // baseWebpackConfig.entry[name] = ['webpack/hot/dev-server',
    //     'webpack-hot-middleware/client',
    //     '../src/main.js']
})





//对基本配置的补充
module.exports = merge(baseWebpackConfig, {
    plugins: [
        new HtmlWebpackPlugin({
            //生成的文件名
            filename: 'index.html',
            //以哪个文件为模板进行生成
            template: 'index.html',
            //在生成之后, 把打包后的JS文件插入到html中
            inject: true
        }),
        //开启热更新
        new webpack.HotModuleReplacementPlugin(),
    ]
})