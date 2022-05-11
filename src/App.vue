<template>
    <div id="app">
        <keep-alive :include="catch_components">
            <transition
                enter-active-class="animated tada"
                leave-active-class="animated bounceInRight"
                :duration="{ enter: 1000, leave: 500 }"
            >
                <router-view></router-view>
            </transition>
        </keep-alive>

        <!--<div-->
        <!--    class="tab-bar"-->
        <!--    v-if="$route.path == '/' || $route.path == '/about'"-->
        <!--&gt;-->
        <!--    <div @click="go('/')">home</div>-->
        <!--    <div @click="go('/about')">about</div>-->
        <!--    <div>exp1</div>-->
        <!--    <div>exp2</div>-->
        <!--</div>-->
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'Home',
    components: {},
    data() {
        return {
            p_name: 1,
        };
    },
    mounted() {
        console.log(process.env);
        console.log(this);
        console.log(111);
    },
    methods: {
        go(route) {
            this.$router.replace(route);
        },
    },
    computed: {
        names() {
            return this.name + 1;
        },
        ...mapState({
            // 箭头函数可使代码更简练
            catch_components: state => state.c.catch_components,
        }),
    },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/assets/scss/_mixin';
.tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    div {
        flex: 1;
        text-align: center;
    }
}
</style>
