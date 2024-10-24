<template>
    <div class ="container-video">        
        <video ref="videoPlayer" class="video-js"></video>
        <div>{{ item.file }}</div>
    </div>
</template>
  
<script>
import videojs from 'video.js';
  
export default {
    name: 'VideoPlayer',
    props: {
      item: {
        type: Object
      }
    },
    data() {
      return {
        player: null,
        videOptions: null
      }
    },
    mounted() {
      this.videoOptions = {
        language: 'es',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        width: '800px',
        autoplay: false,
        controls: true,
        sources: [
          {  
            src: 'http://localhost:4000/uploads/'+this.item.file,   
            type: 'video/mp4'
          }
        ]
      }
      this.player = videojs(this.$refs.videoPlayer, this.videoOptions, () => {
        this.player.log('onPlayerReady', this);
      });
    },
    beforeDestroy() {
      if (this.player) {
        this.player.dispose();
      }
    }
}
</script>

<style>
.container-video {
    display: block;
    font-size: 15px;
    color: floralwhite;
}
</style>