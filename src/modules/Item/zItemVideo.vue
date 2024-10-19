<template>
    <div class ="container-video">
        <div>{{ item.file }}</div>
        <video ref="videoPlayer" class="video-js"/>
    </div>
</template>

<script setup>
import { defineProps, onMounted, onBeforeUnmount, watch, ref } from 'vue';
import videojs from 'video.js';
//import 'C:\nodejs\kopedia\node_modules\video.js\dist\video-js.css'

const props = defineProps(["item","voptions"]);
const videoJsPlayer = ref(null)

const handleLoadedMetadata = () => {
  const aspectRatio = videoJsPlayer.videoWidth() / videoJsPlayer.videoHeight();
  information.value = `aspect=${aspectRatio} (${videoJsPlayer.videoWidth()}x${videoJsPlayer.videoHeight()})`;
  console.log( information.value );
};

onMounted( () => {
  videoJsPlayer.value = videojs( 'videoPlayerId', props.voptions);
  //videoJsPlayer.on( 'loadedmetadata', handleLoadedMetadata );
  console.log("Mounted")
});

onBeforeUnmount( ()=> {
  if (videoJsPlayer.value != null) {
    videoJsPlayer.dispose();
  }
});

const seekPosition = (seekSeconds) => {
  if (videoJsPlayer != null) {
    videoJsPlayer.currentTime(seekSeconds);
  }
};

watch( 
  () => props.options?.sources,
  (newSources, _ ) => {
    const ispaused = videoJsPlayer.paused();
    if (!ispaused) {
      videoJsPlayer.pause();
    }
    videoJsPlayer.src( newSources );

    // videoJsPlayer.load();
    if(!ispaused) {
      videoJsPlayer.play();
      console.log('play (auto)');
    }
  },
  {
    deep: true
  }
);

defineExpose({
  seekPosition,
});
</script>

<style>
.container-video {
    display: block;
    font-size: 15px;
    color: floralwhite;
}
</style>