import { Toast } from 'vant';

/**
 * 全局方法及组件
 */
export default {
    install(Vue) {
        Vue.prototype.Toast = Toast;
    },
};
