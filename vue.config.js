const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const resolve = dir => path.join(__dirname, dir);
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    lintOnSave: true,
    devServer: {
        // 不管是警告，还是错误全部展示在浏览器上
        // overlay: {
        //     warnings: true,
        //     errors: true,
        // },

        // 自动打开浏览器
        open: true,

        // 启动 GZip 压缩
        compress: true,

        // 关闭 host 检查
        disableHostCheck: true,

        // 代理相关的配置
        proxy: {
            '/list': {
                target: 'http://192.168.22.32:7001',
                // 是否跨域，虚拟的站点需要更管origin
                changeOrigin: true,
            },
        },
    },
    // https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
    publicPath: './',

    // CSS 的相关配置
    css: {
        // 向 CSS 相关的 loader 传递选项
        loaderOptions: {
            // 向 postcss-loader 传递内容
            // postcss-pxtorem，用于将单位转化为 rem
            // lib-flexible 用于设置 rem 基准值
            postcss: {
                plugins: [
                    // 浏览器前缀处理工具
                    require('autoprefixer')(),
                    require('postcss-pxtorem')({
                        // 基准单位设置为 37.5，也就是 37.5px 为 1rem
                        rootValue: 37.5,
                        // border 相关的 px 单位不做转换
                        propList: ['*', '!border*'],
                        // .vaulting-开头的class不进行rem转换
                    }),
                ],
            },
        },
    },

    /**
     * GZIP压缩配置
     * 超过一定大小进行压缩
     * 是否删除源文件
     */
    // cnpm i compression-webpack-plugin@5.0.1
    configureWebpack: () => {
        if (isProd) {
            return {
                plugins: [
                    new CompressionPlugin({
                        // 指定压缩文件
                        test: /\.js$|\.html$|\.css/,
                        // 超过10kb的文件进行压缩
                        threshold: 10240,
                        // 是否删除原文件
                        deleteOriginalAssets: false,
                    }),
                ],
            };
        }
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                // args[0] 添加属性cdn，在index.html模版中使用
                args[0].utils = []
                if(isProd) {
                    // 这些路径也可以时cdn地址，这样可以减轻服务器压力
                    args[0].utils.push('./utils/vue.runtime.min.js');
                    args[0].utils.push('./utils/vue-router.min.js');
                    args[0].utils.push('./utils/vuex.min.js');
                    args[0].utils.push('./utils/axios.min.js');
                    args[0].utils.push('./utils/vconsole.min.js')
                }else {
                    // 非生产环境添加vConsole
                    args[0].utils.push('./utils/vconsole.min.js')
                }
                return args;
            })


        // cdn 编译时不会将vue等打包进去，调用时去全局寻找
        if(isProd) {
            config.externals({
                vue: 'Vue',
                vuex: 'Vuex',
                'vue-router': 'VueRouter',
                axios: 'axios',
            });
        }


        /**
         * 添加一个自定义loader
         * 在跳转到其他网站前先跳转到一个需要用户确认跳转的中间页，就像知乎做的那样
         */
        // my-loader为loader的别名，./src/myLoader.js是loader的位置
        config.resolveLoader.alias.set('go-outSide', path.resolve(__dirname, './src/loader/goOutside.js'))
        // 修改vue文件Loader的选项，增加新的处理loader
        const vueRule = config.module.rule('vue')
        vueRule.use('go-outSide').loader('go-outSide').end()

        /**
         * 添加一个自定义plugin
         * 需要在每次发布前根据当前时间设置项目的版本号的功能
         */
            // ./src/versionPlugin.js是plugin的位置
        const VersionPlugin = require('./src/plugin/versionPlugin')
        config.plugin('version').use(VersionPlugin).tap(args => {
            // 此处添加的参数可在versionPlugin的构造函数中获取
            return args
        })


        /**
         * 优化打包后的文件
         */
        config.when(isProd, config => {
            config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    // 打包初始化时依赖的第三方模块
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial',
                    },
                    // 打包非初始化的第三方模块
                    utils: {
                        name: 'chunk-utils',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 9,
                    },
                    // 将 vant 拆分成一个单独的 chunk，优先级设为最高（因为在程序初始化的时候必须加载这个 UI 库）
                    vant: {
                        name: 'chunk-vant',
                        priority: 20,
                        test: /[\\/]node_modules[\\/]_?vant(.*)/,
                    },
                    // 将 ytlife-ui 拆分成一个单独的 chunk，优先级低于 vant
                    ytlifeUI: {
                        name: 'chunk-ytlifeUI',
                        priority: 19,
                        test: /[\\/]node_modules[\\/]_?ytlife-ui(.*)/,
                    },
                    // 将公共的组件拆分成一个单独的 chunk
                    commons: {
                        name: 'chunk-commons',
                        test: resolve('src/components'),
                        minChunks: 3,
                        priority: 5,
                        reuseExistingChunk: true,
                    },
                },
            });
        });
    },
};
