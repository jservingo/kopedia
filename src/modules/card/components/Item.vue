<template>
    <div class ="container">
        <Audio v-if="item.type=='audio'" :url="item.url"></Audio>
        <Formula v-if="item.type=='formula'" :formula="item.formula"></Formula>
        <Image v-if="item.type=='image'" :url="item.url"></Image>
        <Text v-if="item.type=='text'" :text="item.text"></Text> 
        <Video v-if="item.type=='video'" :url="item.url"></Video>
    </div>
</template>

<script setup>
import Audio from './Audio.vue'
import Formula from './Formula.vue'
import Image from './Image.vue'
import Text from './Text.vue'
import Video from './Video.vue'
import { defineProps } from 'vue';
defineProps(["item"]);
</script>

<style scoped>
.container {
    display: block;
}
</style>