<template>
    <div class ="container-video" :style="itemOptions">        
        <video ref="videoPlayer" class="video-js"></video>
    </div>
</template>
  
<script setup>
import videojs from 'video.js';
import { ref, onMounted, computed} from 'vue';
import useItemOptions from '@/composables/useItemOptions';

const props = defineProps(["item"]);
const { options, getItemOptions } = useItemOptions()
const videoPlayer = ref(null)

const player = ref(null);
const videoOptions = ref(null)

onMounted(() => {
    getItemOptions(props.item)
    let opt_width = 768
    if (options.value && options.value.width)
      opt_width = options.value.width.substring(0,3) - 26
    //console.log("opt_width", opt_width)
    videoOptions.value = {
      language: 'es',
      playbackRates: [0.7, 1.0, 1.5, 2.0],
      width: opt_width, //768
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
</script>

<style>
.container-video {
    display: block;
    font-size: 16px;
    color: floralwhite;
    margin-bottom: 6px;
}
</style>