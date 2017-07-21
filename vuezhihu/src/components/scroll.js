export default {
    props : {
        scroller : {
            type : [HTMLDocument, Element, Window],         //scroller的三种类型
            default () {
                return window;
            }
        }
    },

    mounted() {
        this.$bindScroll();
    },

    methods : {
        $bindScroll() {
            if ( !this.scroller ) {           //不是三组类型的话返回
                return ;
            }
            this._handleScroll = ( e ) => {
                if ( this.onScroll ) {
                    this.onScroll();
                }
            };
            this.scroller.addEventListener( 'scroll', this._handleScroll );   //添加点击事件
        },
        $unbindScroll( scroller ) {
            scroller = scroller || this.scroller;
            if ( this._handleScroll ) {
                scroller.removeEventListener( 'scroll', this._handleScroll );  //去除点击事件
            }
        }
    },
    beforeDestroy() {
        this.$unbindScroll();
    },
    watch : {
        scroller( scroller, oldScroller ) {
            if ( scroller === oldScroller ) {
                return ;
            }
            this.$unbindScroll( oldScroller );
            this.$bindScroll( scroller );
        }
    }
}