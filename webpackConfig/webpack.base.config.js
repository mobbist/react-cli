var path = require("path")
var config = require("./config");
module.exports = {
    //入口起点（entry）会相对于此目录查找。
    context: path.resolve('./src'),
    entry: {
        app: './main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: "[name].js",
        //静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径,同时index.html的位置就决定了publicPath 的配置
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        //在引入文件的时候不需要写这些文件的后缀名, 会自动补全
        //extensions: ['.js', '.json'],
        //设置别名,每一个key值对应一个地址, 再去引入某个页面下的地址的时候, 就可以使用这个别名的Key值
        alias: {
            //   'vue$': 'vue/dist/vue.esm.js', 
            //   '@': resolve('src'),
        }
    },
    module: {
        //关于模块配置
        rules: [
            //babel-loader 依赖babel-core
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
}



// publicPath 设为相对路径，相对路径实际上是相对于index.html的路径，为什么这么说？比如publicPath:"./dist/"，JS文件名为bundle.js，
// 按上面的公式，最终访问JS的路径为./dist/bundle.js， 这个路径同时也是index.html引用bundle.js的路径，既然要在index.html通过相对路径引用bundle.js，
// 那么index.html的位置就决定了 publicPath 的配置，比如index.html在A文件夹下，而发布的路径不想放到A文件夹里，而是想和A文件夹同级，
// 那么就应配置为publicPath :"../dist/"，这就是相对于index.html的路径来讲，bundle.js在上一层的dist文件夹里。相对路径的好处是本地可以访问，
// 比如一些混合 APP 用的file协议，用绝对路径肯定是不行的。
//publicPath 设为相对于协议url（//）或http地址（http://），比如publicPath:'http://wwww.qinshenxue.com/static/'，开发环境当然是不能这么干，使用这个的场景是将资源托管到CDN，比如公司的静态资源服务器等。

//另外publicPath应该以'/'结尾，同时其他loader或插件的配置不要以'/'开头。