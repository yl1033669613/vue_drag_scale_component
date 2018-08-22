# vue_drag_scale_component
基于vue.js的pc端弹出框插件 可拖拽 全屏 可缩放
## 用法
```javascript
//1. 下载并直接引用 （基于vue.js 请先引用vue.js）
<script src="/your path/vue.js"></script>
<script src="/your path/drag-scale-layer.js"></script>

//2. npm install drag-scale-layer -S 
import Vue from 'vue'
import dragScaleLayer from 'drag-scale-layer'
Vue.use(dragScaleLayer) //使用插件
```
## 页面组件属性参数
```javascript
<drag-scale-layer :title="'测试'" :visible="popVis" @close="closeFunction">
  //弹窗内代码
  ...
</drag-scale-layer>

//组件事件
@close //监听组件内关闭事件

...
closeFunction (){
	this.popVis = false;
}
...

// 组件属性
//layerWidth 定义组件被打开时的初始宽度 Number default 800
//layerHeight 定义组件被打开时的初始高度 Number default 500
//layerLeft 定义组件被打开时距离顶部位置 Number default 0 //不设置layerLeft layerTop 默认居中
//layerTop 定义组件被打开距离页面左边距位置 Number default 0   //不设置layerLeft layerTop 默认居中
//visible 控制组件的显示参数 Boolean default false
//title 定义组件的title String default ""
//miniW 定义组件最小宽度 Number default 200
//miniH 定义组件最小高度 Number default 200
```
## 兼容
兼容IE10以上

