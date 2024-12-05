<template>
    <div class ="container-video">        
        <video ref="videoPlayer" class="video-js" :style="options"></video>
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
    computed: {
      options: function() {
        let options = {}
        options['width'] = 768
        if (this.item.options) {
          let opts = this.item.options.split(';')
          for (let i=0;i<opts.length;i++) {
            let opt = opts[i].split(':')
            let key = opt[0]
            let value = opt[1]
            switch (key) {
                case 'width':
                    options['width'] = value
                    break
                case 'align':
                    switch (value) {
                        case "center":
                            options['display'] = "block"
                            options['margin-left'] = "auto"
                            options['margin-right'] = "auto" 
                            break;
                        case "right":
                            options['display'] = "block"
                            options['margin-left'] = "auto" 
                            break;
                    } 
                    break               
                case 'background':
                    options['background-color'] = this.get_color(value)                    
                    options['border'] = "2px solid rgb(8, 19, 51)"
                    options['border-radius'] = "16px"
                    options['padding'] = "10px" 
                    break; 
                case 'color':
                    options['color'] = value  
                    break
                default:
                    options[key] = value              
            }
          }
        }
        return options
      }
    },
    methods: {
      get_color(color) {
        switch (color) {
            case "green":
                return"rgb(160, 230, 206)"
            case "green-dark":
                return "rgb(160, 230, 206)"
            case "blue":
                return "rgb(163, 184, 230)";
            case "blue-dark":
                return "rgb(81, 118, 192)"
            case "yellow":
                return "rgb(241, 241, 155)"
            case "yellow-dark":
                return "rgb(200, 200, 60)"
            case "yellow":
                return "rgb(241, 241, 155)"
            case "red":
                return "rgb(240, 120, 120)"
            case "red-dark":
                return "rgb(185, 84, 84)"
            case "white":
                return "rgb(228, 230, 236)"
            case "gray":
                return "rgb(180, 180, 180)"
            case "black":
                return "rgb(8, 19, 51)"
            case "prueba":
                return "rgb(185, 84, 84)"
            default:
                return color
        } 
      }
    }, 
    mounted() {
      this.videoOptions = {
        language: 'es',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        width: this.options.width, //768
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
    margin-bottom: 6px;
}
</style>