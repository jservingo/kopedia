<template>
    <div class ="container-video" ref="container_video" :style="itemOptions">   
        <div ref="video" :style="video_options">     
          <video ref="videoPlayer" class="video-js"></video>
        </div>
        <div :style="content_options">Hola Que tal</div>
        <div style="clear:both"></div>
    </div>
</template>
  
<script setup>
//ref="'container_video_' + item.id"
//ref="'video_' + item.id"
import videojs from 'video.js';
import { ref, onMounted, computed} from 'vue';
import useItemOptions from '@/composables/useItemOptions';

const props = defineProps(["item"]);
const { options, eoptions, coptions, getItemOptions } = useItemOptions()
const videoPlayer = ref(null)
const container_video = ref(null)
const video = ref(null)
const video_options = ref(null)
const content_options = ref(null)

const player = ref(null);
const videoOptions = ref(null)
const factor = ref(0)
const m = ref(0)
//const container_video = useTemplateRef('container_video_' + item.id)
//const container_video_width = container_video.clientWidth

onMounted(() => {
    window.addEventListener("resize", windowResize);
    getItemOptions(props.item)
    video_options.value = eoptions.value
    content_options.value = coptions.value
    console.log("eoptions",eoptions.value)
    console.log("coptions",coptions.value)
    //Obtener cwidth
    const cwidth = container_video.value.getBoundingClientRect().width;
    //Calcular factor
    let factor = 0;
    if (cwidth >= 1000)
      factor = 0.5
    else if(cwidth >= 800)
      factor = 0.6
    if(cwidth >= 800)
      factor = 0.6 
    if (cwidth>=700 && coptions.value['show']=='right') {
      console.log("RIGHT")
      video_options.value['float'] = 'left';
      content_options.value['float'] = 'right';
      factor = 0.48
    } else if(cwidth>=700 && coptions.value['show']=='left') {
      console.log('LEFT')
      video_options.value['float'] = 'right';
      content_options.value['float'] = 'left';
      factor = 0.48
    } else {
      factor = 0.6
    }
    //Calcular vwidth
    m.value = (cwidth*factor-300)/(cwidth-300)
    const vwidth = Math.floor(cwidth * factor)-12
    video_options.value['width'] = vwidth+"px"
    content_options.value['width'] = vwidth+"px"  
    console.log("video_options",video_options.value)  
    console.log("content_options",content_options.value)
    /*
    let opt_width = 400
    if (eoptions.value && eoptions.value.width) {
      //console.log("width",eoptions.value.width)
      opt_width = eoptions.value.width.substring(0,3) - 26
    }
    //console.log("opt_width", opt_width)
    */   
    videoOptions.value = {
      language: 'es',
      playbackRates: [0.7, 1.0, 1.5, 2.0],
      width: vwidth, //opt_width 768
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

const itemOptions = computed(() => {
    return options.value;
})

function windowResize() {
  //console.log("windowResize",player.value.width())
  const cwidth = container_video.value.getBoundingClientRect().width;
  const vwidth = Math.floor(m.value*(cwidth-300)+300)-12
  console.log("vwidth",vwidth)
  player.value.width(vwidth)
  video_options.value = eoptions.value
  video_options.value['width'] = vwidth+"px"
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
.video {
  float: left
}
.content-video {
  float: left
}
</style>