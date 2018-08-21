<template>
    <div id="app">
        <div @click="open" class="btn">
            打开弹窗
        </div>
        <drag-scale-layer :title="'测试'" :visible="popVis" @close="editPopClose"></drag-scale-layer>
    </div>
</template>
<script>
import Vue from 'vue'
import dragScaleLayer from './lib/index.js'
Vue.use(dragScaleLayer)

export default {
    name: 'app',
    data() {
        return {
            popVis: false
        }
    },
    methods: {
        editPopClose (){
            this.popVis = false;
        },
        open (){
            this.popVis = true;
        }
    }
}
</script>
<style lang="scss">
.btn{
    cursor: pointer;
    width: 100px;
    margin: 100px auto;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 5px;
    border: 1px solid #ccc;
}
</style>
