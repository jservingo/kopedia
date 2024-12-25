<template>
    <div class ="container-image" :style="container_options">
        <div :style="item_options">
            <img v-if="item.file" :src="urlFile" :style="image">
        </div>
        <div v-html="content" :style="content_options"></div>
        <div style="clear:both"></div>
    </div>
</template>

<script setup>
import { defineProps, onMounted, ref, computed } from 'vue';
import useItemOptions from '@/composables/useItemOptions';
import useItemContent from '@/composables/useItemContent';
import useItemWidth from '@/composables/useItemWidth';

const props = defineProps(["item"]);
const { options, eoptions, coptions, getItemOptions } = useItemOptions()
const { content, getItemContent } = useItemContent()
const { width, container_options, item_options, content_options, getItemWidth } = useItemWidth()
const image = ref({})

onMounted(async () => {
    window.addEventListener("resize", windowResize);
    getItemOptions(props.item)
    getItemContent(props.item)
    getItemWidth(window.innerWidth, options, eoptions, coptions)
    image.value['width'] = width.value+"px"
})

const urlFile = computed(() => {
    return `http://localhost:4000/uploads/${props.item.file}`;
})

function windowResize() {
  getItemWidth(window.innerWidth, options, eoptions, coptions)
  image.value['width'] = width.value+"px"
}
</script>

<style scoped>
.container-image {
    display: block;
    width:80%; min-width:320px;
    background:rgb(228, 230, 236);
    color:rgb(8, 19, 51);
    border: 4px solid rgb(8, 19, 51);
    border-radius: 10px;
    font-size: 16px; line-height: 20px !important;
    margin-left: auto; margin-right: auto;
    margin-bottom: 6px; padding: 10px   
}
</style>