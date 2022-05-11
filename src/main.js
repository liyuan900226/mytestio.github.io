import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import 'amfe-flexible/index.js';

// 样式
import './styles/index.scss';
// import { putMsg } from 'native-tool'
// putMsg()
// 添加全局变量
import globleTool from './utils/globleTool.js';
Vue.use(globleTool);
Vue.config.productionTip = false;

// 执行mock配置
// require('./mock')// require('./mock')// require('./mock')// require('./mock')// require('./mock')// require('./mock')// require('./mock')// require('./mock')// require('./mock')

// 前置全局导航守卫
router.beforeEach((to, from, next) => {
    // 此处可以写一些拦截逻辑

    // next('/login');  // 跳转至 '/login'路由
    // console.log(1);

    // 不做拦截
    next();
});
// h其实就是createElement函数，createElement返回的是：虚拟节点 (virtual node)
// 也常简写它为“VNode”。“虚拟 DOM”是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼
new Vue({
    router,
    store,
    // 此处引入的vue是runtime版本，不带模版(.vue)解析器compiler。
    // 因为webpack打包后会将模版解析为js，此后不再需要模版解析器。所以此处用的是runtime版本，如果是cdn最好也用这个版本
    // 因为没有模版解析器，故此处不能使用template配置项，需要使用render函数解析模版
    // render 函数可以直接处理 .vue文件
    // .vue 文件中的template是用vue-template-compiler解析的
    // h: createElement
    // render: function (h) {
    //     return (
    //         <AnchoredHeading level={1}>
    //             <span>Hello</span> world!
    //         </AnchoredHeading>
    //     )
    // }
    // render: h => h('h1', 'hello')
    render: h => h(App)
}).$mount('#app');

