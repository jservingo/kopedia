<template>
  <div class ="container-audio" :style="container_options">
    <div :style="item_options">
      <audio-player :option="audioOption" />
    </div>
    <div v-html="content" :style="content_options"></div>
  </div>
</template>
  
<script setup>
import AudioPlayer from "vue3-audio-player";
import "vue3-audio-player/dist/style.css";
import { ref, onMounted, computed} from 'vue';
import useItemOptions from '@/composables/useItemOptions';
import useItemContent from '@/composables/useItemContent';

const props = defineProps(["item"]);
const { options, eoptions, coptions, getItemOptions } = useItemOptions()
const { content, getItemContent } = useItemContent()
const container_options = ref({})
const item_options = ref({})
const content_options = ref({})

const audioOption = ref({
    src: "http://localhost:4000/uploads/"+props.item.file,
    title: "Audio",
    coverImage: "",
})

onMounted(() => {
  window.addEventListener("resize", windowResize);
  getItemOptions(props.item)  
  getItemContent(props.item)
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
    let width = 0
    if (cwidth<=600)
        width = cwidth-28
    else 
        width = Math.floor(0.30*(cwidth-300)+300)-12 
    width = cwidth-28
    container_options.value['width'] = cwidth+"px"
    item_options.value['width'] = width+"px"
    console.log("WIDTH",width)
}

function windowResize() {
    calcularWidth()
} 
</script>

<style>
 .container-audio {
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

 .audio__player {
  align-items: normal !important;
 }

 .audio__player-play {
   height: 0;
 }

 .audio__player-title {
   display: none;
 }

 .audio__player-play > img {
  display: none;
 }

 .audio__player-play-icon {
  margin: -32px
 }

 .audio__player-progress-container {
  align-self: center !important; 
  margin-left: 45px;
 }
</style>

