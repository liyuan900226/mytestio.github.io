<template>
    <div class="about">
        <div id="list2">
            <p>每日视频收评:</p>
            <div v-for="item in stockList" :key="item.id">
                <p>
                    <a :href="item.play_url">{{ item.title }}{{item.play_url}}</a>
                </p>
                <p>发布时间：{{ item.published_at }} &nbsp;&nbsp;&nbsp;播放量：{{ item.play_count }}</p>
                <br>
            </div>
        </div>
        <div id="list3">
            <p>课件:</p>
            <div v-for="item in courseList" :key="item.id">
                <p>
                    <a :href="item.course_url">{{ item.course_title }}{{ item.course_url }}</a>
                </p>
                <p>发布时间：{{ item.updated_at }} &nbsp;&nbsp;&nbsp;播放量：{{ item.course_detail_time }}</p>
                <br>
            </div>
        </div>
    </div>
</template>

<script>
import { getStock, getCourse } from '../../api/class';
export default {
    name: 'About',
    data() {
        return {
            stockList:[],
            courseList:[],
        };
    },
    mounted() {
        // 顶底 809
        // 宁静致远 115
        // 田文军 795
        getStock(809).then(res => {
            console.log(1)
            this.stockList = res.data.videos
        })
        // 顶底 119
        // 一个掘金者 62
        getCourse(119).then(res => {
            this.courseList = res.data.data
        })
    },
    methods: {
        // getStock() {
        //     axios.get('http://tnbapi.dn8188.com/lecturers/east/videos_es?bigVId=41&lecturer_id=809&per=20&token=1644889903463abf7c002d48257bdb9e13289d20ba53c', {
        //     }).then(res => {
        //         console.log(res.data.videos)
        //         this.stockList = res.data.videos
        //     })
        // },
        // getCourse() {
        //     axios.get('http://tnbapi.dn8188.com/courseSeries/subCourseList_es?bigVId=41&course_id=119&token=1644889903463abf7c002d48257bdb9e13289d20ba53c', {
        //     }).then(res => {
        //         console.log(res.data.data)
        //         this.courseList = res.data.data
        //     })
        // },
    },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/assets/scss/base';
a,p{
    font-size: 12px;
}
</style>
