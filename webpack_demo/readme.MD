����webpack-dev-server��
/webpack.config.js
    devServer:{
        //���û���Ŀ¼�ṹ
        contentBase:path.resolve(__dirname,'dist'),
        //��������IP��ַ������ʹ��IPҲ����ʹ��localhost
        host:'localhost',
        //�����ѹ���Ƿ���
        compress:true,
        //���÷���˿ں�
        port:1717
    }
/package.json
"scripts": {
    "server":"webpack-dev-server"
 },
���ذ���npm install webpack-dev-server --save-dev
npm run server  �������� http://localhost:1717
///////////////////////
���CSS�ļ���
����index.css�ļ�
Ҫ���CSS�������Ҫ�и�CSS�ļ�����/srcĿ¼�£����ǽ���һ��css�ļ��У����ļ����ｨ��index.css�ļ���
CSS���������ú����Ǿ���Ҫʹ��loader������CSS�ļ��ˣ�����������Ҫ���������õ�loader���ֱ���style-loader��css-loader��
��npm install ������Ŀ��װ��
npm install style-loader --save-dev  //������������css�ļ��е�url()��
npm install --save-dev css-loader    //����������css���뵽ҳ���style��ǩ
loaders���ã�
�޸�webpack.config.js��module�����е����ô������£�
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
ѹ��JS���룺
������Ҫ��webpack.config.js������uglifyjs-webpack-glugin���
const uglify = require('uglifyjs-webpack-plugin');
�������plugins������newһ�� uglify����Ϳ����ˣ��������¡�
    plugins:[
        new uglify()
    ],
ʲô�ǿ���������ʲô�����������������������ǻ��������js����ѹ���ģ��ڿ���Ԥ��ʱ������Ҫ��ȷ�ı��������ʹ�����Ϣ��������ȫû�б�Ҫѹ��JavasScript���롣�����������вŻ�ѹ��JS���룬���ڼӿ����Ĺ���Ч�ʡ�devServer���ڿ�����������ѹ��JS���������������ڿ�����������������������������Webpack�����˳�ͻ������
///////////////////////
��������ͼƬ�õ�loader��
npm install --save-dev file-loader url-loader
file-loader���������·�������⣬��background��ʽ��url���뱳��ͼ��˵�����Ƕ�֪����webpack���ջὫ����ģ������һ���ļ������������ʽ�е�url·����������htmlҳ��ģ������������ԭʼcss�ļ����ڵ�·���ġ���ͻᵼ��ͼƬ����ʧ�ܡ������������file-loader����ģ�file-loader���Խ�����Ŀ�е�url���루��������css�����������ǵ����ã���ͼƬ��������Ӧ��·�����ٸ������ǵ����ã��޸Ĵ�����ļ�����·����ʹָ֮����ȷ���ļ���
url-loader�����ͼƬ�϶࣬�ᷢ�ܶ�http���󣬻ή��ҳ�����ܡ�����������ͨ��url-loader�����url-loader�Ὣ�����ͼƬ���룬����dataURl���൱�ڰ�ͼƬ���ݷ����һ���ַ����ٰ��⴮�ַ�������ļ��У�����ֻ��Ҫ��������ļ����ܷ���ͼƬ�ˡ���Ȼ�����ͼƬ�ϴ󣬱�����������ܡ����url-loader�ṩ��һ��limit������С��limit�ֽڵ��ļ��ᱻתΪDataURl������limit�Ļ���ʹ��file-loader����copy��
����url-loader��
  //ģ�飺������CSS,ͼƬ���ת����ѹ��
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
                       limit:500000 //limit���ǰ�С��500000B���ļ����Base64�ĸ�ʽ��д��JS��
                   }
               }]
            }
          ]
    },