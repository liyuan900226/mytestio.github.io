<template>
    <div class="home">
        <button @click="goVideo">视频</button>
        <br>
        <button @click="goMeeting">聊天室</button>
<!--        <test v-model="name" placeholder="placeholder" />-->
<!--        <h2>这是home页面</h2>-->
<!--        <p>-->
<!--            <button @click="testLoading">测试Loading</button>-->
<!--        </p>-->
<!--        <p>-->
<!--            <button @click="goKeep">测试keepAlive</button>-->
<!--        </p>-->
<!--        <p>-->
<!--            <button @click="goToken">测试刷新token</button>-->
<!--        </p>-->
<!--        <input type="text" />-->
<!--        <p @click="go()">点击跳转home-detail</p>-->

<!--        年龄：{{ age }} 年{{ year }}-->
<!--        <button @click="add">点击变更vuex</button>-->
<!--        <p class="width_750">测试750px长度</p>-->
<!--        <p class="width_720">测试720px长度</p>-->
<!--        <p class="width_690">测试690px长度</p>-->
<!--        <button @click="showPicker6 = true">打开</button>-->
    </div>
</template>

<script>
import Vue from 'vue';
import { Popup } from 'vant';
import 'vant/lib/popup/style';
Vue.component(Popup.name, Popup);
import { Picker } from 'vant';
import 'vant/lib/picker/style';
Vue.component(Picker.name, Picker);

import { login, getInfo, getJson } from '../../api/user';
import { mapState } from 'vuex';
import test from '../../components/test';
export default {
    name: 'Home',

    data() {
        return {
            arr: [
                {
                    name: 'zhangsan',
                    total: 0,
                    list: [

                    ]
                }
            ],
            form: {
                // name: '',
            },
            url: 'img/AheadImg.jpg',
            name: '123',
            showPicker6: false,
            columns6: [
                {
                    key: '123',
                    text: '北京1',
                },
                {
                    key: '123',
                    text: '北京2',
                },
                {
                    key: '123',
                    text: '北京3',
                },
                {
                    key: '123',
                    text: '北京4',
                },
                {
                    key: '123',
                    text: '北京5',
                },
                {
                    key: '123',
                    text: '北京6',
                },
                {
                    key: '123',
                    text: '北京7',
                },
                {
                    key: '123',
                    text: '北京8',
                },
                {
                    key: '123',
                    text: '北京9',
                },
                {
                    key: '123',
                    text: '北京17',
                },
            ],
        };
    },
    components: {
        Popup,
        Picker,
        test,
    },
    mounted() {
        this.arr.push(1)
        console.log(this.arr)
        this.form.name = '张三';
        // console.log(this.$foo);
        login({ name: 1 });

    },
    methods: {
        testLoading() {
            // this.Toast('提示内容');
            login({
                userName: "张三"
            })
            // getInfo({
            //     info: "getInfo"
            // });
        },
        go() {
            this.$router.push({
                name: 'HomeDetail',
                params: {
                    id: 2,
                    name: 3,
                },
            });
        },
        add() {
            // this.$store.commit('increment', 1)
            this.$store.dispatch('increment', 1);
            this.$store.commit('increaseYear', 1);
        },
        goKeep() {

        },
        goMeeting() {
            this.$router.push({ name: 'aboutDetail'});
        },
        goVideo() {
            this.$router.push({ name: 'about'});
        },
        goToken() {
            this.$router.push({ path: '/token' });
        },
    },

    computed: {
        // age() {
        //     return this.$store.state.a.age
        // },
        ...mapState({
            // 箭头函数可使代码更简练
            age: state => state.a.age,
            year: state => state.a.year,

            // 传字符串参数 'count' 等同于 `state => state.count`
            // countAlias: 'count',

            // 为了能够使用 `this` 获取局部状态，必须使用常规函数
            // countPlusLocalState (state) {
            //     return state.count + this.localCount
            // }
        }),
    },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/assets/scss/base';
h2 {
    color: $c-stu-theme;
    font-size: 20px;
}

.width_750 {
    background-color: #5dd6ff;
    height: 80px;
    width: 375px;
}
.width_720 {
    background-color: #5dd6ff;
    height: 80px;
    width: 360px;
}
.width_690 {
    background-color: #5dd6ff;
    height: 80px;
    width: 345px;
}
</style>
