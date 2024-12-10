<template>
    <!--
    <div class="container-text" v-html="content" :style="options"></div>
    -->
    <div v-katex="content" class="latex" :style="options"></div>
</template>

<script setup>
import useItemOptions from '@/composables/useItemOptions';
import { defineProps, onMounted, computed } from 'vue';
import katexvue3 from "katex-vue3";

const props = defineProps(["item"]);
const { options, getItemOptions } = useItemOptions()

onMounted(async () => {
    getItemOptions(props.item)
})

const content = computed(() => {
    let content = props.item.content
    content = content.replaceAll('font:strong', 'font-weight:700')
    //content = content.replaceAll('color:#blue', 'color:rgb(163, 184, 230)')
    return content
});
</script>

<style scoped>
.container-text {
    display: block;
    font-size: 16px;
    line-height: 18px !important;
    margin-bottom: 10px;
}
.subtitle {
    font-weight: 700;
    color: rgb(9, 25, 75);
}
.prueba-de-colores {
    background-color: rgb(124, 124, 124);
    border-radius: 20px;
    border: 10px double;
}
</style>