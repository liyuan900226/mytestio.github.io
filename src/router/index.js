import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 引入功能模块路由
import home from '../views/home/index';
import about from '../views/about/index';
import keepAlive from '../views/keepAlive/index';
import token from '../views/token/index';


const routes = [...home, ...about, ...keepAlive, ...token];

const router = new VueRouter({
    mode: 'hash',
    routes,
});

export default router;

/**
 * query 传参
 * this.$router.push({
 *     name: 'router' 或者 path: '/router',
 *     query: {
 *         id: 1,
 *         name: 2
 *     }
 * })
 * 在路径上的样式 router?id=1&name=2  刷新不会丢失
 *
 */

/**
 * params 传参
 * params是路由的一部分，路由中需要定义参数
 * {
 *      path: '/router',
 *      name: 'router/:id',
 *      component: () => import('./router.vue')
 * }
 * this.$router.push({
 *     name: 'router' 不能使用path
 *     params: {
 *         id: 1,
 *         name: 2
 *     }
 * })
 *
 * this.$route.params = {
 *     id: 1,
 *     name: 2
 * }
 * 在路径上的样式 router/2  如果name没有在路由中定义，则刷新后this.$route.params中的name会丢失
 *
 */

/**
 * 总结：
 * 1、使用query传参，不用在路由中定义
 * 2、
 */
