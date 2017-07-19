<template>
<div id="app">

    <!-- 顶部，首页显示菜单栏，详情页显示返回按钮 根据store里面的state中二斗drawer来判断-->
    <header class="header">
        <i v-if="!drawer" class="iconfont icon-ic_menu" @click="toggle()"></i>
        <i v-else class="iconfont icon-ic_back" @click="back()"></i>
    </header>

    <!-- 菜单栏列表 -->
    <aside class="aside" :class="{open : open , block : block}" @click="toggle()">
        <ul>
            <li :class="{ chose: num == 1 }" @click="change(1)">
                <span>首页</span>
                <i class="iconfont icon-ic_star" :class="{'iconcolor' : num == 1}"></i>
            </li>
            <li :class="{ chose: num == x.id}" v-for="( x, index ) in list" @click="change(x.id)">
                <span v-html="x.name"></span>
                <i class="iconfont icon-ic_star" :class="{'iconcolor' : num == x.id }"></i>
            </li>
        </ul>
        <!-- 遮罩层 -->
        <div class="cover" @touchmove="prevent"></div>
    </aside>
    
    <!-- 下面这个结构就是用来显示不同组件的 -->
    <!-- 内容列表主体 router-view 是基本的动态组件-->
    <router-view class="app-view"></router-view>

    <!-- 回到顶部 -->
    <div v-if="circleFlag" class="circle" @click="top()">
        <i class="iconfont icon-ic_top"></i>
    </div>

</div>
</template>

<script>
// vuex 就是管理整个app的所有状态
import { mapState } from 'vuex'
import api from './api/index'
export default {
    data() {
        return {
            list : [],//左边栏类目数据
            open : false,
            block : false
        }
    },

    // 计算属性，这里面都是store里的全局属性
    computed : {
        ...mapState({
            circleFlag : state => state.circleFlag,
            num : state => state.num,
            drawer : state => state.drawer
        })
    },

    mounted : function() {
        let vue = this;

        // 获取左边栏类目数据
        api.getTopics().then(function(data) {
            vue.list = data.data.others;
        });

        // 显示左上角的菜单按钮
        this.$store.commit('calDrawer' , 1);
    },

    methods : {

        // 左上角返回按钮
        back() {
            window.history.back();
        },

        // 控制左边栏显示隐藏,定时器是为了动画效果能显示而已
        toggle() {
            let vue = this;
            if ( !this.open ) {
                this.block = true;
                setTimeout(() => {
                    vue.open = true;
                }, 0);
            } else {
                this.open = false;
                setTimeout(() => {
                    vue.block = false;
                }, 300);
            }
        },

        // 路由跳转
        change(id) {
            let path = id == 1 ? 'home' : 'theme';
            // 跳转到theme组件(id==1)或者home组件(id!=1)
            this.$router.push({
                path : path,
                query : {
                    id : id || ''
                }
            });
            // 触发store里面的calNum方法 从而改变state里面num的值
            this.$store.commit('calNum', id);
        },

        prevent(event) {
            event.preventDefault();
            event.stopPropagation();
        },

        // 返回顶部
        top() {
            let vue = this,
                dom = document.querySelector('.app-view'),
                height = dom.scrollTop,
                scrollTop = parseInt( height / 50 ),
                time = setInterval(function() {
                    height -= scrollTop;
                    if ( height <= 0 ) {
                        dom.scrollTop = 0;
                        // 调用store里面的mutations的calCircleFlag方法，改变state.circleFlag的值
                        vue.$store.commit('calCircleFlag');
                        clearInterval(time);
                    } else {
                        dom.scrollTop = height;
                    }
                }, 2);
        }
    }
}
</script>

<style lang="less">
    .slide-left-enter,
    .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(50vw, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
        opacity: 0.1;
        -webkit-transform: translate(-50vw, 0);
    }

    .app-view {
        z-index: 1;
        width: 100vw;
        height: 100vh;
        overflow: auto;
        position: absolute;
        transition: transform 0.3s ease;
        -webkit-overflow-scrolling: touch;
    }

    .app-view-hidden {
        overflow: hidden;
    }

    .header {
        width: 100%;
        height: 1.5rem;
        z-index: 9;
        padding-left: 5%;
        position: fixed;
        background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.51) 95%);
        .iconfont {
            color: #fff;
            font-size: 0.8rem;
            top: 20%;
            position: relative;
        }
    }

    .aside {
        display: none;
        z-index: 11;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        position: fixed;
        &::-webkit-scrollbar {
            display: none!important;
            width: 0!important;
            height: 0!important;
            -webkit-appearance: none;
            opacity: 0!important;
        }
        ul {
            margin: 0;
            float: left;
            width: 60%;
            height: 100%;
            padding: 1.3rem 0.5rem 0.5rem;
            overflow: auto;
            background: rgba(91, 116, 146, 0.75);
            transform: translate(-100%, 0);
            transition: transform 0.3s ease;
            -webkit-overflow-scrolling: touch;
            &::-webkit-scrollbar {
                display: none!important;
                width: 0!important;
                height: 0!important;
                -webkit-appearance: none;
                opacity: 0!important;
            }
        }
        li {
            cursor: pointer;
            font-size: 0.43rem;
            list-style: none;
            color: #fff;
            margin-top: 20px;
            .iconfont {
                float: right;
                font-size: 0.6rem;
            }
            &.chose {
                color: #FFD300;
            }
        }
        .cover {
            width: 100%;
            height: 100%;
            opacity: 0;
            display: none;
            background: rgba(172, 185, 201, 0.40);
            transition: opacity 0.3s ease;
        }
        &.open {
            display: block;
            ul {
                transform: translate(0);
            }
            .cover {
                opacity: 1;
                display: block;
            }
        }
        &.block {
            display: block;
        }
    }

    .circle {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.80);
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
        right: 5%;
        bottom: 5vw;
        position: fixed;
        z-index: 10;
        i {
            top: 50%;
            left: 50%;
            font-size: 0.6rem;
            color: #ACB9C9;
            transform: translate(-50%, -50%);
            position: absolute;
        }
    }

    @media screen and (min-width: 640px) {
        .app-view {
            width: 640px;
            left: 50%;
            transform: translate(-50%, 0);
        }
        .aside ul {
            width: 350px;
        }
    }
</style>