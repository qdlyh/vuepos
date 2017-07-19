<template>
<div>
    <loading :flag='!list.length&&!refreshing'></loading>

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
    <load-more :scroller="scroller" :loading="loading" @load="loadMore" ></load-more>

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
            refreshing : false,
            loading : false,
            count: 1, 
            scroller : null,
            list : [],
            swiper : '',
            tops :[]
        }
    },
    computed : {
        ...mapState({
            circleFlag : state => state.circleFlag,
        })
    },

    mounted() {
        this.getList(1);
        this.scroller = this.$el;
        let swiper = this.$refs.swiper;
        if ( swiper.dom ) {
            this.swiper = swiper.dom;
        }
    },

    methods : {

        // 跳转到详情页
        go(id) {
            this.$router.push({
                path: 'article',
                query: {
                    id : id
                }
            });
        },

        // 获取列表数据
        getList(type) {
            var vue = this;
            if ( type ) {
                api.getNews().then(function(data) {
                    vue.tops = data.data.top_stories;
                    vue.list.push(data.data);
                    vue.loading = false;
                });
            } else {
                api.getNewsByDate( vue.GetDate(vue.count) ).then(function(data) {
                    vue.list.push(data.data);
                    vue.loading = false;
                });
            }
        },

        // 加载更多（时间倒序）
        loadMore() {
            this.loading = true;
            this.count--;
            this.getList();
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

    components : {
        swipe,
        backTop,
        loadMore,
        loading
    }
}
</script>

<style lang="less">@yellow: #FFD300;
@blue: #5B7492;
@gray: #acb9c8;

.app-view {
    .swiper-container {
        width: 100%;
    }
    .swiper-slide {
        height: 8rem;
        overflow: hidden;
        position: relative;
    }
    .swiper-container-horizontal > .swiper-pagination-bullets {
        bottom: 1rem;
        width: 95%;
        text-align: right;
    }
    .list:nth-child(2) {
        margin-bottom: 0;
        padding-top: 0;
        .list-time {
            top: -.8rem;
        }
    }
}
.swiper-slide {
    div {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.4;
        position: absolute;
        background-color: @blue;
    }
    img {
        top: 50%;
        position: relative;
        transform: translate(0, -50%);
    }
    h3 {
        width: 70%;
        color: #fff;
        margin: 0;
        font-size: 0.5rem;
        line-height: 1rem;
        right: 5%;
        bottom: 2.6rem;
        text-align: right;
        position: absolute;
        text-shadow: 1px 1px 10px rgba(0, 0, 0, .5);
        &:before {
            content: "";
            width: 3rem;
            bottom: -.6rem;
            right: 0;
            display: block;
            position: absolute;
            border: 2px solid @yellow;
        }
    }
}
.list {
    width: 90%;
    z-index: 1;
    position: relative;
    padding-top: 0.8rem;
    margin: .8rem auto 0;
    &-time {
        top: 0;
        margin: 0;
        color: #fff;
        padding: 0 1rem;
        font-size: 0.4rem;
        line-height: 0.8rem;
        letter-spacing: 0.1rem;
        border-radius: 0.4rem;
        text-align: center;
        background-color: @yellow;
        transform: translate(0,-50%);
        position: absolute;
        box-shadow: 0 3px 10px 0 rgba(91,115,146,0.15);
    }
    &-con {
        cursor: pointer;
        display: flex;
        padding: 0.3rem;
        margin-bottom: 0.4rem;
        border-radius: 0.15rem;
        align-items: center;
        background-color: #fff;
        box-shadow: 0 3px 10px 0 rgba(91,115,146,0.15);
        img {
            width: 2rem;
            margin-right: 0.4rem;
        }
        p {
            width: 6rem;
            color: @blue;
            font-size: 0.4rem;
            text-align: justify;
            word-break: break-all;
        }
    }
}
</style>
