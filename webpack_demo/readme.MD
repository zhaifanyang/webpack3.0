设置webpack-dev-server：
/webpack.config.js
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
/package.json
"scripts": {
    "server":"webpack-dev-server"
 },
下载包：npm install webpack-dev-server --save-dev
npm run server  启动服务 http://localhost:1717
///////////////////////
打包CSS文件：
建立index.css文件
要打包CSS你必须先要有个CSS文件，在/src目录下，我们建立一个css文件夹，在文件夹里建立index.css文件。
CSS和引入做好后，我们就需要使用loader来解析CSS文件了，这里我们需要两个解析用的loader，分别是style-loader和css-loader。
用npm install 进行项目安装：
npm install style-loader --save-dev  //它是用来处理css文件中的url()等
npm install --save-dev css-loader    //它是用来将css插入到页面的style标签
loaders配置：
修改webpack.config.js中module属性中的配置代码如下：
webpack.config.js
   module:{
        rules: [
            {
              test: /\.css$/,
              use: [ 'style-loader', 'css-loader' ]
            }
          ]
    },

