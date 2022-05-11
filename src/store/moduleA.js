export default {
    state: {
        age: 1,
        year: 2020,
    },
    mutations: {
        increment(state) {
            // 变更状态
            state.age++;
        },
        increaseYear(state) {
            state.year++;
        },
    },
    actions: {
        // this.$store.dispatch('increment', 1)
        increment: ({ commit }) => {
            setTimeout(() => commit('increment'), 2000);
        },
    },
    getters: {
        age_(state) {
            return state.age + 1;
        },
    },
};
