<template>
    <div>
        <!-- 每次都请求主页数据，没有加载完成显示loading -->
        <loading :flag="!list.length&&!refreshing"></loading>
        <!-- 轮播组件 :attr 是动态数据 attr 是字符串属性-->
        <swipe swipeid="swipe" ref="swiper" :autoplay="3000" effect="slide" :tops="tops" target="article"></swipe>
        <div class="list" v-for="x in list">
            <p class="list-time">{{x.date.substring(0,4)+"/"+x.date.substring(4,6)+"/"+x.date.substring(6,8)}}</p>
            <div class="list-con" link @click="go(y.id)" v-for="y in x.stories">
                <img :src="y.images[0]" />
                <p>{{y.title}}</p>
            </div>
        </div>
        <!-- 加载更多组件 @load="loadMore" 还记得在loadMore.vue里面的this.$emit('load')吗,这里这样设置就是为了能触发那个-->
        <load-more :scroller="scroller" :loading="loading" @load="loadMore"></load-more>
        <!-- 回到顶部组件 -->
        <back-top :scroller="scroller" :flag="circleFlag"></back-top>
    </div>
</template>
<script>
import api from './../api/index'
import { mapState } from 'vuex'
import backTop from './../components/backTop'
import swipe from './../components/swipe/swipe'
import loadMore from './../components/loadMore'
import loading from './../components/loading'
export default {
    data() {
        return {
            refreshing: false,
            loading: false,      //loading
            count: 1,
            scroller: null,
            list: [],
            swiper: '',
            tops: [],
        }
    },
    /* 计算属性简写 */
    computed: {
        ...mapState(['circleFlag'])
    },
    //钩子函数，挂载完成
    mounted() {
        this.getList(1);
        this.scroller = this.$el;
        let swiper = this.$refs.swiper;
        if (swiper.dom) {
            this.swiper = swiper.dom;
        }
    },
    methods: {
        //转跳详情页
        go(id) {
            this.$router.push({
                path: 'article',
                query: {
                    id: id
                }
            })
        },
        //获取列表数据
        getList(type) {
            var vue = this;
            if (type) {
                api.getNews().then(function (data) {
                    vue.tops = data.data.top_stories
                    vue.list.push(data.data);
                    vue.loading = false;
                })
            } else {
                api.getNewsByDate(vue.GetData(vue.count)).then(function (data) {
                    vue.list.push(data.data)
                    vue.lodaing = false;
                })
            }
        },
        // 加载更多（时间倒序）
        loadMore() {
            this.loading = true;  /* 显示loading */
            this.count--;         /* 事件倒序 */
            this.getList();      /* 请求列表数据 */
        },

        // 转化时间格式
        GetDate(Count) {
            var dd = new Date();
            dd.setDate(dd.getDate() + Count); //获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1; //获取当前月份的日期
            m = m > 10 ? m : "0" + m
            var d = dd.getDate();
            d = d >= 10 ? d : "0" + d;
            return y + "" + m + "" + d;
        }
    },
    /* 注册组件 */
    components: {
        swipe,
        backTop,
        loadMore,
        loading
    }
}

</script>
