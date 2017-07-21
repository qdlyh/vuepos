import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const vuex = new Vuex.store({
  //state全局状态变量
  state: {
    num: 1, //当前类目ID
    drawer: false, //左上角返回按钮和菜单按钮
    circleFlag: false, //返回顶部 flag
    theme: {}, //缓存类目页信息
    article: {}, //缓存文章详细信息
  },
  //mutations改变全局状态方法
  mutations: {
     //当前类目ID
     calNum:(state,n)=>{
         state.num = n
     },
        //列表后退按钮切换
     calDrawer(state,n){
        if (n) {
            state.drawer = false;
        }else{
            state.drawer = true;
        }
     },
    //回到顶部
    calCircleFlag(state,n){
        if (n) {
            state.circleFlag = true;
        }else{
            state.circleFlag = false;
        }
    }
  }
})

export default vuex