<template>
    <div class ="card card-item" :style="{background:bgGradient }">
        <div class="card-body">
            <Audio v-if="item.type=='audio'" :item="item"></Audio>
            <Formula v-if="item.type=='formula'" :item="item"></Formula>
            <Image v-if="item.type=='image'" :item="item"></Image>
            <Text v-if="item.type=='text'" :item="item"></Text> 
            <!--:options="options" :autoplay="autoplay" :videoPlayerId="videoPlayerId"-->
            <Video v-if="item.type=='video'" :item="item" :options="voptions"></Video> 
            <p>type: {{ item.type }}</p>
            <button  @click="$emit('edit-item',item)" class="btn btn-primary">
                Edit item
            </button>
            <button @click="$emit('delete-item',item)" class="btn btn-danger">
                Delete item 
            </button>            
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
    
    padding-left: 10px;
    margin-right: 12px;
    margin-bottom: 12px;
}
.card-body {
    padding: 0
}
</style>