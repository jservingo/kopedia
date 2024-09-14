<template>
    <div class ="container-fluid container-item">
        <Audio v-if="item.type=='audio'" :url="item.url"></Audio>
        <Formula v-if="item.type=='formula'" :formula="item.content"></Formula>
        <Image v-if="item.type=='image'" :url="item.url"></Image>
        <Text v-if="item.type=='text'" :text="item.content"></Text> 
        <Video v-if="item.type=='video'" :url="item.url"></Video>
    </div>
</template>

<script setup>
import Audio from './ItemAudio.vue'
import Formula from './ItemFormula.vue'
import Image from './ItemImage.vue'
import Text from './ItemText.vue'
import Video from './ItemVideo.vue'
import { defineProps } from 'vue';
defineProps(["item"]);
</script>

<style>
.container-item {
    display: block;
}
</style>