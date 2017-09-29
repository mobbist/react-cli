# 尝试搭建react前端工程化构建

## 目标

1. 使用一条简单的命令就可以架起一个react react-router react-redux的开发环境,并打开浏览器,mock数据.下一秒就可以开始编程

1. 使用一条简单的命令就可以将代码压缩打包发布到线上

## 目录结构作用

- build:          webpack生产配置,发布配置,基本配置相关,

- config:         生产环境和开发环境的配置参数

- node_modules:   安装的第三方依赖

- src:            项目源码, webpack会对该目录下代码做特殊处理

- .babelrc        babel配置文件,当babel启动的时候,会找该文件,读取这里的配置 es6转为es5,将一些草案阶段的语法也转为ES5使用

- .editconfig     编辑器使用的一些配置

- .eslintignore   代码风格检查时候的所需要忽略的文件

- .eslintrc       在安装cli的时候选择需要帮我们做代码风格的检查

- .gitignore      提交的代码所要忽略的文件

- .postcssrc      预先设置css规则

- index.html      项目入口模板

- package.json    一些项目描述, npm脚本命令, 第三方包目录等

## 开发环境

开发环境需要有开发环境的一些功能比如:

1. 代码语法检测
