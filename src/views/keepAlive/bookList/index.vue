<template>
    <div>
        <p>
            <button @click="add">点击添加</button>
        </p>
        <p
            style="padding-top: 70px; background-color: #5e89ef"
            v-for="(item, i) in arr"
            :key="i"
        >
            {{ item.name }}
        </p>
        <a style="padding-top: 70px; display: block" @click="go()"
            >点击跳转book-detail</a
        >
    </div>
</template>

<script>
export default {
    name: 'BOOK_LIST',
    data() {
        return {
            arr: [],
            saveY: 0,
        };
    },
    methods: {
        add() {
            this.arr.push({
                name: (Math.random() * 10).toFixed(0),
            });
        },
        go() {
            this.$router.push('/bookDetail');
        },
    },
    activated() {
        document.getElementById('app').scrollTop = this.saveY;
    },
    beforeRouteLeave(to, from, next) {
        // 要在离开该组件的时候控制需要缓存的组件，否则将出现第一次不缓存的情况
        if (to.path === '/bookDetail') {
            // 去往详情页的时候需要缓存组件，其他情况下不需要缓存
            this.saveY = document.getElementById('app').scrollTop;
            console.log(1122, this.$options.name);
            this.$store.commit('ADD_COMPONENTS', this.$options.name);
        } else {
            this.$store.commit('DELETE_COMPONENTS', this.$options.name);
        }
        next();
    },
};
</script>

<style scoped></style>
