<template>
<div class="con">
    <loading :flag='!data.body'></loading>

    <div v-if="data.image" class="con-img">
        <img :src="data.image" />
        <div class="con-img-mask"></div>
        <h2 v-html="data.title"></h2>
    </div>
    <div class="con-answer" @click.prevent="pop($event)" v-html="data.body"></div>
    <back-top :scroller="scroller" :flag="circleFlag"></back-top>
</div>
</template>

<script>
import api from './../api/index'
import backTop from './../components/backTop'
import { mapState } from 'vuex'
import loading from './../components/loading'
export default {
    computed : {
        ...mapState({
            circleFlag : state => state.circleFlag,
            article : state => state.article
        })
    },
    data() {
        return {
            data : '',
            scroller : window
        }
    },
    mounted : function() {
        // this.$el-vue实例根对象，这里就是.app-view元素
        this.scroller = this.$el;

        let vue = this,
            // 获取当前文章id
            id = this.$route.query.id;

        // 下面是对浏览过的文章详情做一个数据缓存，this.article 这家伙就是在store的state里面的公共数据对象
        if ( this.article.hasOwnProperty(id) ) {
            this.data = this.article[id];
        } else {
            // 发送请求获取数据，这里的api是在api文件夹下面的index.js里面的 相当于 axios.get( 'https://zhihu-agent.herokuapp.com/get?api=/4/news/' + id )
            api.getNewsById(id).then(function(data) {
                vue.article[id] = data.data;
                vue.data = data.data;
            });
        }
        
    },
   
    methods : {
        // 跳转到对应的url
        pop(e) {
            let href = e.target.href;
            if ( href ) {
                window.open( href );
            }
        }
    },

    components : {
        backTop,
        loading
    }
}
</script>

<style lang="less">@red: #FC4482;
@yellow: #FFD300;
@blue: #5B7492;
@gray: #acb9c8;
img {
    width: 100%;
}
.page-content {
    text-align: center;
}
.con {
    color: #666;
    height: 100vh;
    .con-img {
        height: 6rem;
        overflow: hidden;
        position: relative;
        img {
            top: 50%;
            width: 100%;
            position: relative;
            transform: translate(0,-50%);
        }
        h2 {
            width: 60%;
            margin: 0;
            padding: 0;
            right: 5%;
            bottom: 1rem;
            text-align: right;
            font-size: 0.45rem;
            color: rgba(255,255,255,.9);
            position: absolute;
            text-shadow: 0 0 5px rgba(0,0,0,.5);
        }
        &-mask {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(91,116,146,0.50);
            position: absolute;
        }
    }
    .con-answer {
        padding: 5%;
        position: relative;
        h2,
        li,
        p {
            text-align: justify!important;
        }
        h2 {
            color: @blue;
            position: relative;
            z-index: 1;
        }
        a {
            color: @yellow;
            word-break: break-word;
        }
        .headline-title {
            color: @blue;
        }
        .meta {
            text-align: left;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            .avatar {
                vertical-align: middle;
                display: inline-block;
                width: 0.6rem;
                margin-right: 0.1rem;
            }
            span {
                color: #666;
            }
            .author {
                color: @red;
                display: inline-table;
            }
        }
        .content {
            font-size: 0.35rem;
        }
        .question {
            blockquote {
                text-align: justify;
                position: relative;
                &::before {
                    content: '';
                    left: -.5rem;
                    display: block;
                    height: 100%;
                    border-left: .1rem solid @yellow;
                    position: absolute;
                }
            }
            &:first-child {
                padding-top: 0;
            }
            &:last-child {
                padding-bottom: 0;
                &::before {
                    display: none;
                }
            }
            ul {
                padding-left: 0.3rem;
                li {
                    text-align: left;
                }
            }
        }
        .content-image {
            width:inherit;
            max-width: 100%;
        }
        .view-more {
            text-align: center;
            margin-bottom: .5rem;
            a {
                z-index: 1;
                position: relative;
            }
        }
    }
}
</style>
