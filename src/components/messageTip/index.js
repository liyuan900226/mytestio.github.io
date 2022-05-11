import messageTipVue from './index.vue';
// 定义插件对象
const MessageTip = {};
// vue的install方法，用于定义vue插件
MessageTip.install = function(Vue, options) {
    console.log(options);
    const MessageTipInstance = Vue.extend(messageTipVue);
    let currentMsg;
    const initInstance = () => {
        // 实例化vue实例
        currentMsg = new MessageTipInstance();
        let msgBoxEl = currentMsg.$mount().$el;
        document.body.appendChild(msgBoxEl);
    };
    // 在Vue的原型上添加实例方法，以全局调用
    Vue.prototype.$msgTip = {
        showTip(options) {
            if (!currentMsg) {
                initInstance();
            }
            if (typeof options === 'string') {
                currentMsg.content = options;
            } else if (typeof options === 'object') {
                Object.assign(currentMsg, options);
            }
            return currentMsg; // 为了链式调用
        },
    };
};
export default MessageTip;
