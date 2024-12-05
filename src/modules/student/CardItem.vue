<template>
    <div class ="container-fluid container-item">
        <Text v-if="item.type=='text'" :item="item"></Text> 
        <Image v-if="item.type=='image'" :item="item"></Image>
        <Audio v-if="item.type=='audio'" :item="item"></Audio>
        <Video v-if="item.type=='video'" :item="item"></Video>
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
</script>

<style>
.container-item {
    display: block;
}
</style>