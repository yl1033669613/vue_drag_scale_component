<template>
    <transition name="fade">
        <div v-if="visible" class="layer-container" @mousemove="handleMousemove($event)" @mouseup="handleMouseup($event)">
            <div class="layer-mask" @click="handleClose"></div>
            <div class="layer-win" :style="{width: width + 'px', height: height + 'px', left: left + 'px', top: top + 'px'}">
                <div class="layer-header" @mousedown="moveHandleMousedown($event)">
                    <p>{{title}}</p>
                    <div class="layer-fn-btns">
                        <i @click="handleFullScreen(1)" v-if="fullScreen">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzNBMDlCRDBBNTFFMTFFOEFBQkNEMENCNTdCODIxRUUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzNBMDlCRDFBNTFFMTFFOEFBQkNEMENCNTdCODIxRUUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3M0EwOUJDRUE1MUUxMUU4QUFCQ0QwQ0I1N0I4MjFFRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3M0EwOUJDRkE1MUUxMUU4QUFCQ0QwQ0I1N0I4MjFFRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkpC/0oAAAD/SURBVHjaYvz//z8DrQHjqCWjltDPEkZGRhiTE4jPAbE0EP8l0rx/QPwGiOuB5q4gxhIQsAViXhIsUQXiaiB+BjTXGCbIgkWhORAXQX1wH4h/g+wmwoLzQDwJiPmBOBBZApslM4FYH4g3QDUQArCgmAjEp4D4ExD/JGQJDxDPAOJMEuP3JRCLAzEbugQTFsXfgFiAjETEjO4DfJZQHQxJS0D5hAMar3gtYURKMeTEywcgfo2a/oCZERkDwV0gXkiGBe+AuArqcA5kM7El4etAHAfEllCXMRCZVwSB+BE0yH4QKrtAhscCsSwpZSAQXwbiPlhQIZs7Wp+MUEsAAgwA0t1wYsj+U0MAAAAASUVORK5CYII=" alt="">
                        </i>
                        <i @click="handleFullScreen(2)" v-if="!fullScreen">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTg4M0JFMkFBNTFFMTFFOEIxMThBNDZGMjBENTBBNzQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTg4M0JFMkJBNTFFMTFFOEIxMThBNDZGMjBENTBBNzQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1ODgzQkUyOEE1MUUxMUU4QjExOEE0NkYyMEQ1MEE3NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1ODgzQkUyOUE1MUUxMUU4QjExOEE0NkYyMEQ1MEE3NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlWh9u4AAACuSURBVHjaYvz//z8DrQHjqCWjltDXEkZGxnggFQ7E/EBMrCv+AvEpIF4DNPMkigzIEnQMBF+ghpOD52CYh8MSEOFFaqgA8Qcg3oFuHhMODb+AmINES3ihjvuDLsGERxMziZawwGKAFEuoBoa/JWxA/JhEs94B8T9sCYYFj6bNQHwDiFmJsABkOBcQCwHxZ2JzfCSQ8obm+H9E5hFQjj8LzSdnRkvhUUuGkSUAAQYAhViSuZhVoFcAAAAASUVORK5CYII=" alt="">
                        </i>
                        <i @click="handleClose">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjMwQzY2RTFBNTFFMTFFODg0Njg5QUMwRDM1MTA0N0MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjMwQzY2RTJBNTFFMTFFODg0Njg5QUMwRDM1MTA0N0MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MzBDNjZERkE1MUUxMUU4ODQ2ODlBQzBEMzUxMDQ3QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MzBDNjZFMEE1MUUxMUU4ODQ2ODlBQzBEMzUxMDQ3QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoKfz3AAAADPSURBVHjaYvz//z8DrQETAx3AqCWjlmACRkbG60C8FIgZ8OAqIP6G1xZQPsGFgWA/SAkQT8ChPQUq/xCvOQQsAYEFUIM60SyIgYqfIehYIiwBgcVoPgqH8s8RFSJEWgICq6EG74XSN4gOdhIsAYENUAtekBS3JFiSALXgL5TuoLYlaUhxIArE06D8qdSyBJaKLoCyDpLFC5F9RIklGVCDruDIJyug8lMosQSc0QiUGjsgHsFtDgsBA7qB+CIBNY3QoMRdPI1Wv6OW0AwABBgA4JPXAFPKQMQAAAAASUVORK5CYII=" alt="">
                        </i>
                    </div>
                </div>
                <div class="layer-content">
                    <div class="layer-content-mask" v-if="acType > 0"></div>
                    <!-- 防止在内部存在iframe，在拖动或者缩放时鼠标在iframe上时脱离原网页坐标而无法监听鼠标位置 -->
                    <slot></slot>
                </div>
                <div class="scale-btn" @mousedown="scaleHandleMousedown($event)">
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'dragScaleLayer',
    props: {
        layerWidth: {
            type: Number,
            default: 800
        }, //定义弹窗宽度
        layerHeight: {
            type: Number,
            default: 500
        }, //定义弹窗高度
        layerLeft: {
            type: Number,
            default: 0
        }, //定义弹窗距左边界距离
        layerTop: {
            type: Number,
            default: 0
        }, //定义弹窗距顶部距离
        visible: {
            type: Boolean,
            default: false
        }, //定义弹窗显示状态属性 默认false
        title: {
            type: String,
            default: ""
        }, //定义弹窗显标题
        miniW: {
            type: Number,
            default: 200
        }, //缩放最小宽度 默认200px
        miniH: {
            type: Number,
            default: 200
        } //缩放最小高度 默认200px
    },
    data() {
        return {
            acType: -1, //定义操作弹窗动作类型 1为缩放 2为拖动

            visWidth: 1000, //保存页面文档宽度
            visHeight: 1000, //保存页面文档高度

            width: 800, //弹窗实际操作高度
            height: 500, //弹窗实际操作宽度
            left: 0, //弹窗距文档左边实际操作距离
            top: 0, //弹窗距顶部实际操作距离

            scale: {
                stX: 0,
                stY: 0,
                currW: 0,
                currH: 0
            }, //定义缩放临时参数

            move: {
                stX: 0,
                stY: 0,
                currL: 0,
                currT: 0
            }, //定义拖动临时参数

            fullScreen: false, //定义全屏弹窗状态
            fsWidth: 0,
            fsHeight: 0, //全屏显示时保存弹窗非全屏显示时的大小与状态
            fsLeft: 0,
            fsTop: 0
        }
    },
    mounted() {
        let self = this;
        self.getDocSize(); //初始获取文档宽高

        window.addEventListener("resize", function() {
            self.getDocSize(); //监听window 宽高发生变化时 重新获取宽高
            if (self.fullScreen) { //全屏状态下更新弹窗宽高
                self.width = self.visWidth;
                self.height = self.visHeight;
            }
        }, false)
    },
    watch: {
        visible(val, oldVal) { //监听弹窗的显示状态 初始弹窗位置与大小
            if (val) {
                //如未定义弹窗位置则默认居中
                if (!this.layerLeft) {
                    this.left = (this.visWidth - this.layerWidth) / 2;
                };
                if (!this.layerTop) {
                    this.top = (this.visHeight - this.layerHeight) / 2;
                };
                this.width = this.layerWidth;
                this.height = this.layerHeight;
                this.fullScreen = false;
            }
        }
    },
    methods: {
        getDocSize() {
            this.visWidth = document.documentElement.clientWidth || document.body.clientWidth;
            this.visHeight = document.documentElement.clientHeight || document.body.clientHeight;
        },
        scaleHandleMousedown(e) { //缩放弹窗 开始 
            if (this.fullScreen) return; //全屏时禁止缩放
            this.acType = 1;
            this.scale.stX = e.clientX;
            this.scale.stY = e.clientY;
            this.scale.currW = this.width;
            this.scale.currH = this.height;
        },
        moveHandleMousedown(e) { //拖动弹窗 开始
            if (this.fullScreen) return;
            this.acType = 2;
            this.move.stX = e.clientX;
            this.move.stY = e.clientY;
            this.move.currL = this.left;
            this.move.currT = this.top;
        },
        handleMouseup(e) { //结束操作
            this.acType = -1;
        },
        handleMousemove(e) {
            if (this.acType === 1) { //缩放
                let crW = 0,
                    crH = 0;
                crW = this.scale.currW + (e.clientX - this.scale.stX);
                crH = this.scale.currH + (e.clientY - this.scale.stY);
                if (crW <= this.miniW) {
                    this.width = this.miniW;
                } else {
                    this.width = crW;
                };
                if (crH <= this.miniH) {
                    this.height = this.miniH;
                } else {
                    this.height = crH;
                }
            };
            if (this.acType === 2) { //移动
                this.left = this.move.currL + (e.clientX - this.move.stX);
                this.top = this.move.currT + (e.clientY - this.move.stY);
            }
        },
        handleClose() { //关闭弹窗
            this.$emit('close');
        },
        handleFullScreen(type) { //全屏
            if (type == 1) {
                if (!this.fullScreen) return;
                this.fullScreen = false;

                this.width = this.fsWidth;
                this.height = this.fsHeight;
                this.left = this.fsLeft;
                this.top = this.fsTop;
            } else {
                if (this.fullScreen) return;
                this.fullScreen = true;

                this.fsWidth = this.width;
                this.fsHeight = this.height;
                this.fsLeft = this.left;
                this.fsTop = this.top;

                this.width = this.visWidth;
                this.height = this.visHeight;
                this.left = 0;
                this.top = 0;
            }
        }
    }
}
</script>
<style scoped lang="scss">
.layer-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2000;
}

.layer-mask {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .4);
}

.layer-win {
    position: fixed;
    top: 25vh;
    left: 25vw;
    width: 50vw;
    height: 50vh;
    background: #fff;
    border-radius: 3px;
    overflow: hidden;
    -moz-user-select: none;
    /*火狐*/
    -webkit-user-select: none;
    /*webkit浏览器*/
    -ms-user-select: none;
    /*IE10*/
    -khtml-user-select: none;
    /*早期浏览器*/
    user-select: none;
    .layer-header {
        position: relative;
        height: 40px;
        font-size: 16px;
        line-height: 40px;
        padding: 0 10px;
        cursor: move;
        color: #909399;
        p {
            margin: 0;
            display: inline-block;
            max-width: calc(100% - 100px);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: left;
        }
        .layer-fn-btns {
            float: right;
            height: 100%;
            i {
                cursor: pointer;
                margin: 0 5px;
                img {
                    width: 25px;
                    height: 25px;
                    vertical-align: middle;
                }
            }
        }
        &:after {
            content: "";
            position: absolute;
            width: 100%;
            height: 1px;
            background: #eee;
            left: 0;
            bottom: 0;
        }
    }
    .layer-content {
        position: relative;
        width: 100%;
        height: calc(100% - 40px);
        .layer-content-mask {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 100;
            width: 100%;
            height: 100%;
        }
    }
    .scale-btn {
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 101;
        width: 18px;
        height: 18px;
        cursor: se-resize;
        &:after {
            content: "";
            position: absolute;
            bottom: 2px;
            right: 2px;
            border-top: 6px solid #656565;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            transform: translate(36%, 36%) rotate(-45deg);
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .2s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
