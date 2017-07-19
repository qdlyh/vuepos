import Vue from 'vue'
import Vuex from 'vuex'
Vue.use( Vuex )
export default new Vuex.Store({
    // state-全局状态变量
    state : {
        num : 1,//当前类目Id
        drawer : false,//左上角返回按钮以及类目按钮切换
        circleFlag : false,//回到顶端flag
        theme : {},//缓存类目页信息
        article : {},//缓存日报详情信息
    },

    // mutations-改变全局状态的方法
    mutations : {

        // 当前类目ID
        calNum : ( state, n ) => {
            state.num = n;
        },

        // 列表，返回按钮切换
        calDrawer( state, n ) {
            if ( n ) {
                state.drawer = false;
            } else {
                state.drawer = true;
            }
        },

        // 回到顶部
        calCircleFlag( state, n ) {
            if ( n ) {
                state.circleFlag = true;
            } else {
                state.circleFlag = false;
            }
        }
    }
}); 

