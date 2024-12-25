<template>
    <div class="container-text" :style="container_options">
        <div v-html="content" :style="item_options"></div> 
    </div>
</template>

<script setup>
import useItemOptions from '@/composables/useItemOptions';
import useItemContent from '@/composables/useItemContent';
import { defineProps, onMounted, ref, computed } from 'vue';

const props = defineProps(["item"]);
const { options, eoptions, getItemOptions } = useItemOptions()
const { content, getItemContent } = useItemContent()
const container_options = ref({})
const item_options = ref({})

onMounted(async () => {
    window.addEventListener("resize", windowResize);
    getItemOptions(props.item)
    getItemContent(props.item)
    container_options.value = options.value
    item_options.value = eoptions.value
    calcularWidth()
})

function calcularWidth() {
    //Calcular container_width
    let wwidth = window.innerWidth
    let cwidth = 0
    if (wwidth<800) { 
        cwidth = wwidth - 90
    } else if (wwidth<=1067) {
        cwidth = Math.floor(0.33708*(wwidth-800)+710)
    }
    else {
        cwidth = Math.floor(wwidth*0.8)
    }
    container_options.value['width'] = cwidth+"px"
}

function windowResize() {
    calcularWidth()
} 
</script>

<style scoped>
.container-text {
    display: block;
    min-width:300px;
    background:rgb(228, 230, 236);
    color:rgb(8, 19, 51);
    border: 4px solid rgb(8, 19, 51);
    border-radius: 10px;
    font-size: 16px; line-height: 20px !important;
    margin-left: auto; margin-right: auto;
    margin-bottom: 10px; padding: 10px
}
.prueba-de-colores {
    background-color: rgb(38, 34, 250);
    border-radius: 20px;
    border: 10px double;
}
</style>