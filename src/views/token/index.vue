<template>
    <div>
        <button @click="login">登录</button>
        <br>
        <button @click="freash">刷新token</button>
        <br>
        <button @click="request">请求</button>
    </div>
</template>

<script>
import service from '@/utils/request.js'
export default {
    name: 'index',
    mounted() {
        // this.login()
    },
    methods: {
        login() {
            service({
                method: 'get',
                url: '/login',
                data: {}
            }).then(res => {
                localStorage.setItem('auth-token', res.data.data.token);
                localStorage.setItem('refreashToken', res.data.data.refreashToken);
                console.log('token失效时间' + new Date(res.data.data.token).toLocaleTimeString())
                console.log('刷新token失效时间' + new Date(res.data.data.refreashToken).toLocaleTimeString())
            })
        },
        request() {
            service({
                method: 'get',
                url: '/list',
                data: {}
            }).then(res => {
                // console.log(res)
            }).catch(e => console.log(e))
        },
        freash() {
            service({
                method: 'get',
                url: `/login/refreashToken/123`,
                data: {}
            })
        }
    },
};
</script>

<style scoped></style>
