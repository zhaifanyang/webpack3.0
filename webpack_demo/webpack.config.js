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
    module:{
        rules: [
            {
// test：用于匹配处理文件的扩展名的表达式，这个选项是必须进行配置的；
// use：loader名称，就是你要使用模块的名称，这个选项也必须进行配置，否则报错；
// include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
// query：为loaders提供额外的设置选项（可选）。
              test: /\.css$/,
              use: [ 'style-loader', 'css-loader' ]
            }
          ]
    },
    //插件，用于生产模版和各项功能
    plugins:[],
    //配置webpack开发服务功能
    devServer:{
        //设置基本目录结构
        contentBase:path.resolve(__dirname,'dist'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host:'localhost',
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:1717
    }
}