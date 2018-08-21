import dragScaleLayer from './drag_scale_layer.vue'
// 导入组件 
const vueDragScaleLayer = {
    install(Vue, options) {
        Vue.component(dragScaleLayer.name, dragScaleLayer)
    }
}

if (typeof window !== 'undefined' && window.Vue) { 
	window.Vue.use(vueDragScaleLayer)
}

export default vueDragScaleLayer
