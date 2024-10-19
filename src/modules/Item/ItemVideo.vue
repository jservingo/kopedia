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
      options: {
        type: Object,
        default() {
          return {};
        }
      },
      item: {
        type: Object
      }
    },
    data() {
      return {
        player: null
      }
    },
    mounted() {
      console.log("Options",this.options.sources[0].src)
      this.player = videojs(this.$refs.videoPlayer, this.options, () => {
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