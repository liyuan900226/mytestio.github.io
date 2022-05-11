<template>
    <div>
        <!--<div class="content">-->
        <!--     <div class="tabs">-->
        <!--         <div class="icon-left"><</div>-->
        <!--         <div @click="next" class="icon-right">></div>-->
        <!--         <div ref="tabs" class="out">-->
        <!--             <div class="tab-box">-->
        <!--                 <div :class="{ative: index == current}" class="tabs-item" v-for="(item,index) in list" :key="index + ''" @click="changeTab(item,index)">-->
        <!--                     {{item.colour}}-{{ item.count}}-->
        <!--                 </div>-->
        <!--             </div>-->
        <!--         </div>-->
        <!--     </div>-->
        <!--    <div class="tabs-content">-->
        <!--        <p v-for="(it,index) in obj.attr" :key="index + ''">{{it.size}}&#45;&#45;{{it.number}}</p>-->
        <!--    </div>-->
        <!--</div>-->
        <div class="c">
            <van-tabs v-model="active" swipeable>
                <van-tab v-for="item in list" :title="item.name">{{item.name}}</van-tab>
            </van-tabs>
        </div>
        <button @click="aa">---</button>
        <button @click="bb">+++</button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Tab, Tabs } from 'vant';
    import { Swipe, SwipeItem } from 'vant';

    Vue.use(Swipe);
    Vue.use(SwipeItem);
    Vue.use(Tab);
    Vue.use(Tabs);
    export default {
        name: "Home",
        data() {
            return {
                list: [
                    {
                        name: '标签1'
                    },
                    {
                        name: '标签2'
                    },
                    {
                        name: '标签3'
                    },
                    {
                        name: '标签4'
                    },
                    {
                        name: '标签5'
                    },
                    {
                        name: '标签1'
                    },{
                        name: '标签1'
                    },
                    {
                        name: '标签2'
                    },
                    {
                        name: '标签3'
                    },
                    {
                        name: '标签4'
                    },
                    {
                        name: '标签5'
                    },
                    {
                        name: '标签1'
                    },
                ]

            }
        },
        // mounted() {
        //     let tab = this.$refs.tabs;
        //     let getStyle = window.getComputedStyle(tab.children[0].children[0],null);
        //     console.log(tab.children[0].children[0],getStyle.marginLeft);
        //     let mLeft = parseFloat(getStyle.marginLeft.substr(0,getStyle.marginLeft.length-2));
        //     let mRight = parseFloat(getStyle.marginRight.substr(0,getStyle.marginRight.length-2));
        //     console.log(mLeft,mRight);
        //     this.width = mLeft + mRight + tab.children[0].children[0].offsetWidth;
        //     console.log(this.width);
        //
        //     // let num = tab.offsetWidth/this.width;
        //     // console.log(num);
        //     // // 被遮挡部分的可见宽度= 可见宽度 - 数量乘以单个元素的宽度
        //     // this.unoccupied = tab.offsetWidth - parseInt(num) * this.width;
        //     // console.log(this.unoccupied);
        //     // 最终精简为取余（得数跟上面的计算是一样的）
        //     this.unoccupied = tab.offsetWidth % this.width
        //     console.log(this.unoccupied);
        //     this.differ = this.width - this.unoccupied;
        //     this.unoccupied = this.differ < 10 ? this.width: this.unoccupied;
        //     this.tabsCount = parseInt(tab.offsetWidth / this.width);
        //     console.log(this.tabsCount);
        //
        // },
        methods: {
            aa() {
                window.navigator.vibrate(1000)
                let v = parseInt(document.getElementsByClassName('van-tab')[0].clientWidth)
                console.log(document.getElementsByClassName('van-tabs__nav')[0].scrollLeft -= v)
            },
            bb() {
                let v = parseInt(document.getElementsByClassName('van-tab')[0].clientWidth)
                console.log(document.getElementsByClassName('van-tabs__nav')[0].scrollLeft += v)
            },
            changeTab(item,index) {
                this.current = index;
                this.obj = item;
                console.log(index);

            },
            next() {
                console.log(1);
                let totalLength = this.width * this.list.length;
                this.$nextTick(() => {
                    let dom = this.$refs.tabs;
                    if(dom.clientWidth < totalLength && this.moveX + dom.clientWidth < totalLength) {
                        let x = this.width - this.unoccupied;
                        this.moveX += this.moveX ?this.width:  x||this.width;
                        if(this.moveX + this.clientWidth > totalLength) {
                            this.moveX = this.moveX - this.width;
                        }
                        this.translatex(this.moveX);
                    }
                })


            },
            translatex(x) {
                this.moveX = x<0? 0: x;
                this.$refs.tabs.children[0].style.transform = `translateX(-${this.moveX}px)`

            }

        }
    }
</script>

<style lang="scss" scoped>
    .c{
        padding: 0 30px;
        /*transition: all 500ms linear;*/
    }
    /*.ative {*/
    /*    background: #5e89ef;*/
    /*}*/
    /*.content {*/
    /*    .tabs {*/
    /*        position: relative;*/
    /*        .icon-left {*/
    /*            position: absolute;*/
    /*            left: 0;*/
    /*            z-index: 100;*/
    /*        }*/
    /*        .icon-right {*/
    /*            position: absolute;*/
    /*            right: 0;*/
    /*            z-index: 100;*/
    /*            width: 50px;*/
    /*            height: 50px;*/
    /*            background: rgba(0,0,0,0.2);*/
    /*        }*/
    /*    }*/
    /*    .out {*/
    /*        overflow: hidden;*/
    /*        position: relative;*/
    /*    }*/
    /*    .tab-box {*/
    /*        height: 60px;*/
    /*        display: flex;*/
    /*        justify-content: space-between;*/
    /*        align-items: center;*/
    /*        flex-wrap: nowrap;*/
    /*        position: relative;*/
    /*        .tabs-item {*/
    /*            color: #333333;*/
    /*            flex-shrink: 0;*/
    /*            min-width: 100px;*/
    /*        }*/

    /*    }*/
    /*    .tabs-content {*/
    /*        height: 200px;*/
    /*        background: #63D630;*/
    /*        p {*/
    /*            margin: 0;*/
    /*            padding: 0;*/
    /*        }*/
    /*    }*/
    /*}*/

</style>
