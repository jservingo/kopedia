<template>
    <div class ="container-video" :style="container_options">   
        <div :style="item_options">     
          <video ref="videoPlayer" class="video-js"></video>
        </div>
        <div v-html="content" :style="content_options"
          @click.prevent="clickInfo">
        </div>
        <div style="clear:both"></div>
    </div>
</template>
  
<script setup>
import videojs from 'video.js';
import { ref, onMounted, computed} from 'vue';
import useItemOptions from '@/composables/useItemOptions';
import useItemContent from '@/composables/useItemContent';
import useItemWidth from '@/composables/useItemWidth';

const props = defineProps(["item"]);
const { options, eoptions, coptions, getItemOptions } = useItemOptions()
const { content, info, getItemContent } = useItemContent()
const { width, container_options, item_options, content_options, getItemWidth } = useItemWidth()
const emit = defineEmits(['show-info']) 
const videoPlayer = ref(null)
const videoOptions = ref(null)
const player = ref(null);

onMounted(() => {
    window.addEventListener("resize", windowResize);
    getItemOptions(props.item)
    getItemContent(props.item)
    getItemWidth(window.innerWidth, options.value, eoptions.value, coptions.value)
    
    videoOptions.value = {
      language: 'es',
      playbackRates: [0.7, 1.0, 1.5, 2.0],
      width: width.value, 
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

function clickInfo(ev) {
    if (ev.target.tagName === "IMG") {
        let index = ev.target.id.substr(ev.target.id.length-1); 
        let sinfo = info[index]
        emit("show-info",sinfo)        
    } else if (ev.target.tagName === "A") {
      let id = ev.target.id; 
      if (id=="btn_mas")
          getItemContent(props.item, "btn_menos")
      else
          getItemContent(props.item, "btn_mas")
    }
}

function windowResize() {
  getItemWidth(window.innerWidth, options.value, eoptions.value, coptions.value)
  player.value.width(width.value)
} 
</script>

<style>
.container-video {
  display: block;
  min-width:300px; /*width:80%; */ 
  background:rgb(228, 230, 236);
  color:rgb(8, 19, 51);
  border: 4px solid rgb(8, 19, 51);
  border-radius: 10px;
  font-size: 16px; line-height: 20px !important;
  margin-left: auto; margin-right: auto;
  margin-bottom: 10px; padding: 10px
}
</style>