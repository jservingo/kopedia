<template>
    <div class ="container-fluid container-item">
        <Text v-if="item.type=='text'" :item="item"
            @show-info="showInfo">
        </Text> 
        <Image v-if="item.type=='image'" :item="item"
            @show-info="showInfo">
        </Image>
        <Audio v-if="item.type=='audio'" :item="item"
            @show-info="showInfo">
        </Audio>
        <Video v-if="item.type=='video'" :item="item"
            @show-info="showInfo">
        </Video>
        <Formula v-if="item.type=='formula'" :item="item"></Formula>        
    </div>
</template>

<script setup>
import Audio from '../Item/ItemAudio.vue'
import Formula from '../Item/ItemFormula.vue'
import Image from '../Item/ItemImage.vue'
import Text from '../Item/ItemText.vue'
import Video from '../Item/ItemVideo.vue'
import { defineProps } from 'vue';

defineProps(["item"]);
const emit = defineEmits(['show-info']) 

function showInfo(info) {
    //console.log("Info captured:",info)
    emit("show-info",info)
}
</script>

<style>
.container-item {
    display: block;
}
</style>