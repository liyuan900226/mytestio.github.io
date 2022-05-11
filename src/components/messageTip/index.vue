<template>
    <div class="container">
        <div @click="sendTitle">题目</div>
        {{ content }}
        <span @click="sentFoot">尾部</span>
    </div>
</template>

<script>
export default {
    name: 'messageTip',
    props: {
        duration: {
            type: Number,
            default: 3000,
        },
        content: {
            type: String,
            default: 'q',
        },
    },
    components: {},
    methods: {
        showTitle() {
            console.log(2222);
        },
        sendTitle() {
            this.$emit('gogo', 123456);
        },
        sentFoot() {
            this.$emit('ww', 6666666);
        },
    },
};
</script>

<style lang="scss" scoped></style>
