<template>
<div>
    <loading :flag='!list' v-if="!list"></loading>
    <div v-else>
        <div class="theme">
            <img :src="list.image" />
            <div></div>
            <h3>
                <p v-html="list.description"></p>
                <P v-html="list.name"></P>
            </h3>
        </div>
        <div class="list">
            <div class="list-con" link @click="go(y.id)" v-for="y in list.stories">
                <img v-if="y.images" :src="y.images[0]" />
                <p v-html="y.title"></p>
            </div>
        </div>
    </div>

    <!-- 回到顶部组件 -->
    <back-top :scroller="scroller" :flag="circleFlag"></back-top>
</div>
</template>

<script>
import { mapState } from 'vuex'
import backTop from './../components/backTop'
import api from './../api/index'
import loading from './../components/loading'
export default {
    data() {
        return {
            list : '',
            scroller : window
        }
    },

    computed : {
        ...mapState({
            num : state => state.num,
            circleFlag : state => state.circleFlag,
            theme : state => state.theme
        })
    },

    mounted : function() {

        // this.$el-vue根dom元素
        this.scroller = this.$el;

        // 触发store里面mutationsd的calNum方法，从而改变state全局对象里面的全局变量num(记录当前显示的主题id)
        this.$store.commit('calNum', this.$route.query.id);
    },

    // 监听id的变化，更新视图
    watch : {
        num : function() {
            this.getList();
        }
    },

    methods : {

        // 跳转到详情页
        go(id) {
            this.$router.push({
                path : 'article',
                query: {
                    id : id
                }
            });
        },

        getList() {
            let vue = this,
                id = this.$route.query.id,
                dom = document.querySelector('.app-view');
            this.list = '';
            dom.scrollTop = 0;
            if ( this.theme.hasOwnProperty(id) ) {
                this.list = this.theme[id];
            } else {
                api.getTopicsById(id).then(function(data) {
                    vue.theme[id] = data.data;
                    vue.list = data.data;
                });
            }  
        }
    },

    components : {
        backTop,
        loading
    }

} 
</script>

<style lang="less" scoped>
@yellow: #FFD300;
@blue: #5B7492;
@gray: #acb9c8;
.theme {
    height: 8rem;
    position: relative;
    overflow: hidden;
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
        width: auto;
        height: 8rem;
        left: 50%;
        transform: translate(-50%,0);
        position: relative;
    }
    h3,p{
        margin: 0;
    }
    h3 {
        width: 70%;
        color: #fff;
        font-size: 0.5rem;
        line-height: 1rem;
        right: 5%;
        bottom: 1.5rem;
        text-align: right;
        position: absolute;
        text-shadow: 1px 1px 10px rgba(0, 0, 0, .5);
        p:first-child {
            position: relative;
            margin-bottom: 0.5rem;
            &:before {
                content: "";
                width: 3rem;
                bottom: -.3rem;
                right: 0;
                display: block;
                position: absolute;
                border: 2px solid @yellow;
            }
        }

    }
}
.list {
    margin-top: -.5rem;
}
</style>
