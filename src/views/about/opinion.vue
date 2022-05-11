<template>
    <div>
        <div v-for ="item in list" class="item">
            <p>{{ item.summary }}</p>
            <p>发布时间：{{ item.published_at }}  </p>
        </div>
    </div>
</template>

<script>
import {getOpinion} from "../../api/class";

export default {
    name: "opinion",
    data() {
        return{
            list: []
        }
    },
    mounted() {
        getOpinion().then(res => {
            this.list = res.data.data.lecturer_feeds
        })
    },
    methods: {

    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/assets/scss/base';
.item{
    margin-bottom: 30px;
}
a,p{
    font-size: 12px;
}
</style>
