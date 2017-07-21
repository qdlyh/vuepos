<!-- 返回顶部组件 -->
<template></template>
<script>
import Scroll from './scroll'
export default {
    mixins : [Scroll],   /* 接受一个混合对象的数组,先调用自身 */
    props : {            /* 通过子组件props获取父组件flag的数组  */
        flag : {
            type : Boolean,
            default : false
        }
    },
    methods : {
        onScroll() {
            const scroller = this.scroller,
                isWindow = scroll === window,
                height = Math.ceil( window.screen.height / 2 ),
                scrollTop = isWindow ? scroller.scrollY : scroller.scrollTop;
            // 滑屏过半（），则促发store这个全局状态对象里面的calCircleFlag函数，从而去修改circleFlag的状态来控制回到顶端的按钮的显示与隐藏
            if ( scrollTop > height ) {
                // 显示 回到顶部按钮
                !this.flag && this.$store.commit('calCircleFlag', 1);
            } else {
                this.flag && this.$store.commit('calCircleFlag');
            }
        }
    }
}
</script>