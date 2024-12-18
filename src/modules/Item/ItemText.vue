<template>
    <div class="container-text" :style="options">
        <div v-html="content" :style="eoptions"></div> 
    </div>
</template>

<script setup>
import useItemOptions from '@/composables/useItemOptions';
import useItemContent from '@/composables/useItemContent';
import { defineProps, onMounted, ref, computed } from 'vue';

const props = defineProps(["item"]);
const { options, eoptions, getItemOptions } = useItemOptions()
const { content, getItemContent } = useItemContent()

onMounted(async () => {
    getItemOptions(props.item)
    getItemContent(props.item)
})

/*
const get_latex_style = (content) => {
    let pos = content.indexOf("$latex-style") 
    let num = content.length
    if (pos==-1) 
        return("")
    let i = pos+14
    console.log(i)
    while (content.charAt(i)!="'" && i<num) {
        i++ 
    } 
    if (content.charAt(i)!="'") {
        return("")
    }
    return content.substring(pos+14,i)   
}
*/
</script>

<style scoped>
.container-text {
    display: block;
    width:80%; min-width:300px;
    background:rgb(228, 230, 236);
    color:rgb(8, 19, 51);
    border: 4px solid rgb(8, 19, 51);
    border-radius: 10px;
    font-size: 16px; line-height: 20px !important;
    margin-left: auto; margin-right: auto;
    margin-bottom: 10px; padding: 10px
}
.subtitle {
    font-weight: 700;
    color: rgb(9, 25, 75);
}
.prueba-de-colores {
    background-color: rgb(38, 34, 250);
    border-radius: 20px;
    border: 10px double;
}
</style>