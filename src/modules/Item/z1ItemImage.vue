<template>
    <div class ="container-image" ref="container_image" :style="options">
        <div :style="image_options">
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

const props = defineProps(["item"]);
const { options, eoptions, coptions, getItemOptions } = useItemOptions()
const { content, getItemContent } = useItemContent()
const container_image = ref(null)
const image_options = ref(null)
const content_options = ref(null)
const image = ref({})

onMounted(async () => {
    window.addEventListener("resize", windowResize);
    getItemOptions(props.item)
    getItemContent(props.item)
    calcularWidth()
})

const urlFile = computed(() => {
    return `http://localhost:4000/uploads/${props.item.file}`;
})

function windowResize() {
  //console.log("windowResize",player.value.width())
  calcularWidth()
}

function calcularWidth() {
  image_options.value = eoptions.value
  content_options.value = coptions.value
  
  const cwidth = container_image.value.getBoundingClientRect().width;
  let vwidth = 0 
  if(coptions.value['show']!='none'){
    if (cwidth>=600 && coptions.value['show']=='right') {
        image_options.value['float'] = 'left';
        content_options.value['float'] = 'right';
        content_options.value['margin-top'] = 0
        content_options.value['text-align'] = 'left'        
        vwidth = Math.floor(cwidth * 0.48)-12
        content_options.value['width'] = vwidth+"px"
    } else if(cwidth>=600 && coptions.value['show']=='left') {
        image_options.value['float'] = 'right';
        content_options.value['float'] = 'left';
        content_options.value['margin-top'] = 0
        content_options.value['text-align'] = 'left'
        vwidth = Math.floor(cwidth * 0.48)-12
        content_options.value['width'] = vwidth+"px"
    } else {
        image_options.value['float'] = 'none';
        image_options.value['display'] = "block"
        image_options.value['margin-left'] = "auto"
        image_options.value['margin-right'] = "auto" 
        content_options.value['float'] = 'none';
        content_options.value['margin-top'] = '6px'
        content_options.value['margin-left'] = 'auto'
        content_options.value['margin-right'] = 'auto'
        content_options.value['text-align'] = 'center'
        vwidth = Math.floor(0.30*(cwidth-300)+300)-12
    } 
  } else {
    content_options.value['display'] = "none"
    vwidth = Math.floor(0.30*(cwidth-300)+300)-12
  }

  image_options.value['width'] = vwidth+"px"
  image.value['width'] = vwidth+"px"
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
/*
img {
    width:80%;
    display:block;
    margin-left: auto;
    margin-right: auto;
}
.image {
  float: left;
  min-width:300px;
}
.content-image {
  float: left;
}
*/
</style>