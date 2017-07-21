/* main.js 是入口文件 主要作用是初始化vue实例并使用需要的插件*/
import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'

// 注册app组件
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})

let indexScrollTop = 0,
  dom = document.querySelector('.app-view'); //找到主体内容

/*router全局钩子函数有2个：
   beforeEach：在路由切换开始时调用
   afterEach：在每次路由切换成功进入激活阶段时被调用
   把一些公共的操作都写这里，就不用到每个组件里面去控制了，比如左上角的返回按钮以及类目菜单按钮的切换等*/
router.beforeEach((to, from, next) => {
  /* 只有详情页才显示左上角后退按钮 */
  if (to.path == '/article') {
    dom = document.querySelector('.app-viwe'); //找到主体内容
    indexScrollTop = dom.scrollTop; //indexScrollTop高度等于页面滚动条高度
    store.commit('calDrawer', 1); //显示后退按钮
  } else {
    store.commit('calDrawer')    //不显示
  }
  next()
})

/*  */
router.afterEach((to, from, next) => {
  if (to.path == '/article') {
    dom.scrollTop = 0;
  } else {
    Vue.nextTick(() => {
      if (to.path == '/theme') {
        store.commit('calNum', location.href.split('=')[1]);
      }
      dom.scrollTop = indexScrollTop
    });
  }
});
