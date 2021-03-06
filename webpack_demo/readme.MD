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
////////////////
压缩JS代码：
我们需要在webpack.config.js中引入uglifyjs-webpack-glugin插件
const uglify = require('uglifyjs-webpack-plugin');
引入后在plugins配置里new一个 uglify对象就可以了，代码如下。
    plugins:[
        new uglify()
    ],
什么是开发环境，什么是生产环境。开发环境中是基本不会对js进行压缩的，在开发预览时我们需要明确的报错行数和错误信息，所以完全没有必要压缩JavasScript代码。而生产环境中才会压缩JS代码，用于加快程序的工作效率。devServer用于开发环境，而压缩JS用于生产环境，在开发环境中作生产环境的事情所以Webpack设置了冲突报错。
///////////////////////
两个解析图片用的loader：
npm install --save-dev file-loader url-loader
file-loader：解决引用路径的问题，拿background样式用url引入背景图来说，我们都知道，webpack最终会将各个模块打包成一个文件，因此我们样式中的url路径是相对入口html页面的，而不是相对于原始css文件所在的路径的。这就会导致图片引入失败。这个问题是用file-loader解决的，file-loader可以解析项目中的url引入（不仅限于css），根据我们的配置，将图片拷贝到相应的路径，再根据我们的配置，修改打包后文件引用路径，使之指向正确的文件。
url-loader：如果图片较多，会发很多http请求，会降低页面性能。这个问题可以通过url-loader解决。url-loader会将引入的图片编码，生成dataURl。相当于把图片数据翻译成一串字符。再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了。当然，如果图片较大，编码会消耗性能。因此url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURl，大于limit的还会使用file-loader进行copy。
配置url-loader：
  //模块：例如解读CSS,图片如何转换，压缩
    module:{
        rules: [
            {
              test: /\.css$/,
              use: [ 'style-loader', 'css-loader' ]
            },{
               test:/\.(png|jpg|gif)/ ,
               use:[{
                   loader:'url-loader',
                   options:{
                       limit:500000 //limit：是把小于500000B的文件打成Base64的格式，写入JS。
                   }
               }]
            }
          ]
    },
为什么只使用了url-loader
有的小伙伴会发现我们并没有在webpack.config.js中使用file-loader，但是依然打包成功了。我们需要了解file-loader和url-loader的关系。url-loader和file-loader是什么关系呢？简答地说，url-loader封装了file-loader。url-loader不依赖于file-loader，即使用url-loader时，只需要安装url-loader即可，不需要安装file-loader，因为url-loader内置了file-loader。
/////////////////
CSS分离:extract-text-webpack-plugin
安装：npm install --save-dev extract-text-webpack-plugin
引入：安装完成后，需要先用require引入。
const extractTextPlugin = require("extract-text-webpack-plugin");
设置Plugins：引入成功后需要在plugins属性中进行配置。这里只要new一下这个对象就可以了。
 new extractTextPlugin("/css/index.css")
修改代码如下：
module:{
        rules: [
            {
              test: /\.css$/,
              use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
              })
            },{
               test:/\.(png|jpg|gif)/ ,
               use:[{
                   loader:'url-loader',
                   options:{
                       limit:500000
                   }
               }]
            }
          ]
    },
利用extract-text-webpack-plugin插件很轻松的就把CSS文件分离了出来，但是CSS路径并不正确，
publicPath：是在webpack.config.js文件的output选项中，主要作用就是处理静态文件路径的。

在处理前，我们在webpack.config.js 上方声明一个对象，叫website。
var website ={
    publicPath:"http://192.168.1.108:1717/"
}
然后在output选项中引用这个对象的publicPath属性。
 //出口文件的配置项
    output:{
        //输出的路径，用了Node语法
        path:path.resolve(__dirname,'dist'),
        //输出的文件名称
        filename:'[name].js',
        publicPath:website.publicPath
    },
配置完成后，你再使用webpack命令进行打包，你会发现原来的相对路径改为了绝对路径，这样来讲速度更快。
图片路径问题：
利用extract-text-webpack-plugin插件很轻松的就把CSS文件分离了出来，但是CSS路径并不正确，很多小伙伴就在这里搞个几天还是没有头绪，网上也给出了很多的解决方案，我觉的最好的解决方案是使用publicPath解决，我也一直在用。
publicPath：是在webpack.config.js文件的output选项中，主要作用就是处理静态文件路径的。
在处理前，我们在webpack.config.js 上方声明一个对象，叫website。
var website ={
    publicPath:"http://192.168.1.108:1717/"
}
注意，这里的IP和端口，是你本机的ip或者是你devServer配置的IP和端口。
然后在output选项中引用这个对象的publicPath属性。
//出口文件的配置项
    output:{
        //输出的路径，用了Node语法
        path:path.resolve(__dirname,'dist'),
        //输出的文件名称
        filename:'[name].js',
        publicPath:website.publicPath
    },
配置完成后，你再使用webpack命令进行打包，你会发现原来的相对路径改为了绝对路径，这样来讲速度更快。
////////////////
  "scripts": {
    "server": "webpack-dev-server --open",
    "build":"webpack"
  },
如果webpack没有全局安装，进行如上配置，配置完成后，可以在控制台输入npm run build 进行打包。
/////////