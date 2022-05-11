export default {
    state: {
        year: 2019,
    },
    mutations: {
        increaseYear(state, n) {
            // 变更状态
            state.year -= n;
        },
    },
    actions: {},
};
