<template>
    <div>
        <h2>这是home-detail页面</h2>
        <input v-model="num" type="number" />
        <p>total: {{ total() }}</p>
        {{ arr }}
        <p @click="back">back</p>
    </div>
</template>

<script>
export default {
    name: 'HomeDetail',
    data() {
        return {
            num: '',
            num2: '',
            arr: [{ name: 1 }],
        };
    },
    mounted() {
        setTimeout(() => {
            this.$set(this.arr, 0, 3);
            // this.arr[0] = 2
        }, 500);
    },
    methods: {
        total() {
            console.log(111);
            return this.num * 10;
        },
        back() {
            history.go(-1);
        },
    },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/assets/scss/base';
h2 {
    color: $c-stu-theme;
}
</style>
