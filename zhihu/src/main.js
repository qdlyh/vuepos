import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'

// 注册app组件
new Vue({
    el : '#app',
    router,
    store,
    template : '<App/>',
    components: { App }
})

let indexScrollTop = 0,
    dom = document.querySelector('.app-view');

/*router全局钩子函数有2个：
    beforeEach：在路由切换开始时调用
    afterEach：在每次路由切换成功进入激活阶段时被调用
    把一些公共的操作都写这里，就不用到每个组件里面去控制了，比如左上角的返回按钮以及类目菜单按钮的切换等*/
router.beforeEach( ( to, from, next ) => {
    // 只有详情才显示左上角返回按钮
    if ( to.path == '/article' ) {
        dom = document.querySelector('.app-view');
        indexScrollTop = dom.scrollTop;
        store.commit('calDrawer');
    } else {
        store.commit( 'calDrawer', 1 );
    }
    store.commit( 'calCircleFlag' );
    next();
});
router.afterEach( ( to, from, next ) => {
    if ( to.path == '/article' ) {
        dom.scrollTop = 0;
    } else {
        Vue.nextTick( () => {
            if ( to.path == '/theme' ) {
                store.commit( 'calNum', location.href.split('=')[1] );
            }
            dom.scrollTop = indexScrollTop
        });
    }
});