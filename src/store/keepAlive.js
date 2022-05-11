export default {
    state: {
        catch_components: [],
    },
    mutations: {
        ADD_COMPONENTS({ catch_components }, componentName) {
            // 该组件没有被缓存， 添加
            if (catch_components.indexOf(componentName) === -1) {
                catch_components.push(componentName);
            }
        },
        DELETE_COMPONENTS({ catch_components }, componentName) {
            // 该组件已被缓存， 删除
            let i = catch_components.indexOf(componentName);
            if (i !== -1) {
                catch_components.splice(i, 1);
            }
        },
    },
    actions: {},
    getters: {},
};
