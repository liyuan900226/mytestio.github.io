import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 引入子模块
import moduleA from './moduleA';
import moduleB from './moduleB';
import keepAlive from './keepAlive';

export default new Vuex.Store({
    modules: {
        a: moduleA,
        b: moduleB,
        c: keepAlive,
    },
});

/** state、getters
 * 在计算属性中使用state和getters：
 * age() { return this.$store.state.a.age }
 * age_() { return this.$store.getters.a.age_ }
 */

/** mutations
 * 提交 mutations：this.$store.commit('increment', params)
 * 第一个参数是mutations的名字，第二个参数是传参
 * ！注意：如果不同模块下有相同名字的mutations，则每次提交都会触发所有的，一般mutations名字不要重复
 */

/** action
 * action 类似于 mutation，不同在于：
 * action 提交的是 mutation，而不是直接变更状态。
 * action 可以包含任意异步操作。
 */
