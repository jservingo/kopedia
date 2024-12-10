<template>
    <div class="container-text" :style="options">
        <div v-html="content" :style="eoptions"></div> 
    </div>
</template>

<script setup>
import useItemOptions from '@/composables/useItemOptions';
import { defineProps, onMounted, ref, computed } from 'vue';

const props = defineProps(["item"]);
const { options, eoptions, getItemOptions } = useItemOptions()

onMounted(async () => {
    getItemOptions(props.item)
})

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

const content = computed(() => {
    let content = ""
    if (props.item.fcontent == null)
        content = props.item.content
    else
        content = props.item.fcontent
    content = content.replaceAll('<title>','<span style="font-weight:700; color:rgb(38, 34, 250);">')
    content = content.replaceAll('</title>','</span>')
    content = content.replaceAll('<list>','<ul style="list-style-type:none;margin-bottom:0;padding-left:0;">')
    content = content.replaceAll('</list>','</ul>')
    content = content.replaceAll('<li>','<li style="margin-top:8px;margin-bottom:8px;">')
    content = content.replaceAll('display="block"','')
    content = content.replaceAll('<nl>','<br><br>')    
    content = content.replaceAll('<blue>','<span style="font-weight:700 !important;color:blue;">') 
    content = content.replaceAll('<black>','<span style="font-weight:700 !important;color:black;">') 
    content = content.replaceAll('<white>','<span style="font-weight:700 !important;color:white;">')     
    content = content.replaceAll('<red>','<span style="font-weight:700 !important;color:red;">') 
    content = content.replaceAll('<brown>','<span style="font-weight:700 !important;color:brown;">') 
    content = content.replaceAll('<green>','<span style="font-weight:700 !important;color:green;">') 
    content = content.replaceAll('<teal>','<span style="font-weight:700 !important;color:teal;">')
    content = content.replaceAll('<crimson>','<span style="font-weight:700 !important;color:crimson;">')
    content = content.replaceAll('<orange>','<span style="font-weight:700 !important;color:orangered;">')
    content = content.replaceAll('<purple>','<span style="font-weight:700 !important;color:purple;">')
    content = content.replaceAll('<olive>','<span style="font-weight:700 !important;color:olive;">')
    content = content.replaceAll('<steal>','<span style="font-weight:700 !important;color:stealblue;">')         
    content = content.replaceAll('</blue>','</span>')
    content = content.replaceAll('</color>','</span>')
    content = content.replaceAll('font:strong', 'font-weight:700')
    content = content.replaceAll('color:#blue', 'color:rgb(163, 184, 230)')
    if (content.indexOf("$latex-bold")!=-1) {
        content = content.replaceAll('MathML"','MathML" style="font-weight:700;"')
        content = content.replaceAll('$latex-bold','')
    }
    return content
});
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