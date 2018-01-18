const path = require('path');
module.exports={
    //入口文件的配置项
    entry:{
        // 多入口文件
        entry:'./src/entry.js',
        entry1:'./src/entry1.js',
    },
    //出口文件的配置项
    output:{
        //打包的路径
        path:path.resolve(__dirname,'dist'),
        //[name]的意思是根据入口文件的名称，打包成相同的名称，有几个入口文件，就可以打包出几个文件。
        filename:'[name].js'
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{},
    //插件，用于生产模版和各项功能
    plugins:[],
    //配置webpack开发服务功能
    devServer:{}
}