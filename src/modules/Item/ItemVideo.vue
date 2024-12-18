<template>
    <div class ="container-video" ref="container_video" :style="options">   
        <div ref="video" :style="video_options">     
          <video ref="videoPlayer" class="video-js"></video>
        </div>
        <div v-html="content" :style="content_options"></div>
        <div style="clear:both"></div>
    </div>
</template>
  
<script setup>
//ref="'container_video_' + item.id"
//ref="'video_' + item.id"
import videojs from 'video.js';
import { ref, onMounted, computed} from 'vue';
import useItemOptions from '@/composables/useItemOptions';
import useItemContent from '@/composables/useItemContent';

const props = defineProps(["item"]);
const { options, eoptions, coptions, getItemOptions } = useItemOptions()
const { content, getItemContent } = useItemContent()
const videoPlayer = ref(null)
const container_video = ref(null)
const video = ref(null)
const video_options = ref(null)
const content_options = ref(null)
const player = ref(null);
const videoOptions = ref(null)
const factor = ref(0)

//const container_video = useTemplateRef('container_video_' + item.id)
//const container_video_width = container_video.clientWidth

onMounted(() => {
    window.addEventListener("resize", windowResize);
    getItemOptions(props.item)
    getItemContent(props.item)
    const vwidth = calcularWidth()
    console.log("vwidth",vwidth)
    
    videoOptions.value = {
      language: 'es',
      playbackRates: [0.7, 1.0, 1.5, 2.0],
      width: vwidth, 
      autoplay: false,
      controls: true,
      sources: [
        {  
          src: 'http://localhost:4000/uploads/'+props.item.file,   
          type: 'video/mp4'
        }
      ]
    }
    player.value = videojs(videoPlayer.value, videoOptions.value, () => {
      //player.value.log('onPlayerReady', this);
    });
})

function windowResize() {
  //console.log("windowResize",player.value.width())
  const vwidth = calcularWidth()
  player.value.width(vwidth)
}

function calcularWidth() {
  video_options.value = eoptions.value
  content_options.value = coptions.value

  const cwidth = container_video.value.getBoundingClientRect().width;
  let vwidth = 0 
  if(coptions.value['show']!='none'){
    if (cwidth>=600 && coptions.value['show']=='right') {
      video_options.value['float'] = 'left';
      video_options.value['display'] = "block"
      video_options.value['margin-left'] = "auto"
      video_options.value['margin-right'] = "auto" 
      content_options.value['float'] = 'right';
      content_options.value['margin-top'] = 0
      content_options.value['text-align'] = 'left'  
      vwidth = Math.floor(cwidth * 0.48)-12
      content_options.value['width'] = vwidth+"px"
    } else if(cwidth>=600 && coptions.value['show']=='left') {
      video_options.value['float'] = 'right';
      video_options.value['display'] = "block"
      video_options.value['margin-left'] = "auto"
      video_options.value['margin-right'] = "auto" 
      content_options.value['float'] = 'left';
      content_options.value['margin-top'] = 0
      content_options.value['text-align'] = 'left'
      vwidth = Math.floor(cwidth * 0.48)-12
      content_options.value['width'] = vwidth+"px"
    } else if(coptions.value['show']!='none'){
      video_options.value['float'] = 'none';
      video_options.value['display'] = "block"
      video_options.value['margin-left'] = "auto"
      video_options.value['margin-right'] = "auto" 
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

  video_options.value['width'] = vwidth+"px"
  return vwidth
}
</script>

<style>
.container-video {
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
</style>