<template>
    <div class ="card card-item" :style="{background:bgGradient }">
        <div class="card-body">
            <div class="d-flex">
                <div class ="container-fluid container-card-item-header">
                    <span>{{ item.type }} - {{ item.content }}&nbsp;</span>
                </div>
                <div class ="container-fluid container-card-item-buttons ml-auto">
                    <button  @click="$emit('edit-item',item)" class="btn btn-edit">
                        <img src="@/assets/edit.svg"/>
                    </button>&nbsp;
                    <button @click="$emit('add-item-to-clipboard',item)" class="btn btn-clipboard">
                        <img src="@/assets/add_clipboard.png"/>
                    </button>&nbsp;
                    <button @click="$emit('delete-item',item)" class="btn btn-delete">
                        <img src="@/assets/delete.svg"/>
                    </button> 
                </div>
            </div>
            <Audio v-if="item.type=='audio'" :item="item"></Audio>
            <Formula v-if="item.type=='formula'" :item="item"></Formula>
            <Image v-if="item.type=='image'" :item="item"></Image>
            <!--<Text v-if="item.type=='text'" :item="item"></Text>--> 
            <!--:options="options" :autoplay="autoplay" :videoPlayerId="videoPlayerId"-->
            <Video v-if="item.type=='video'" :item="item" :options="voptions"></Video>               
        </div>
    </div>
</template>

<script setup>
import Audio from '../Item/ItemAudio.vue'
import Formula from '../Item/ItemFormula.vue'
import Image from '../Item/ItemImage.vue'
import Text from '../Item/ItemText.vue'
import Video from '../Item/ItemVideo.vue'
import { defineProps, computed } from 'vue';

const props = defineProps(["item","index","voptions"]);
//backgroundColor:bgColor
const bgColors=["#7facab","#bba4a2","#a3ab99","#a8a8b5","#baac7f","#c9b194"]
//Change bgColor
const bgColor = bgColors[props.index % 6] 
//Change bgGradient
const bgGradient = computed(() => {
    return `linear-gradient(to right, #676B6A, ${bgColor})`;
})
</script>

<style>
.card-item {
    float: left;
    width: 100%;
    padding-top: 6px;
    padding-bottom: 6px;
    margin-right: 12px;
    margin-bottom: 12px;
}
.card-body {
    padding: 0
}
.container-card-item-header {
    font-size: 14px;
    color: whitesmoke;
    line-height: 16px !important;
}
.container-card-item-buttons { 
    font-size: 14px;
    color: whitesmoke;
    width: 170px;
}
.btn-edit {
    background-color: #82c591 !important;
    padding: 0;
}
.btn-clipboard {
    background-color: #b8c57d !important;
    padding: 0;
}
.btn-delete {
    background-color: #c57d93 !important;
    padding: 0;
}
</style>