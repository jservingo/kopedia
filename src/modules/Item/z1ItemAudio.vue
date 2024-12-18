<template>
    <div class ="container-audio">
      <audio-player :option="audioOption" />
    </div>
  </template>
    
  <script>
    import { ref } from 'vue';
    import AudioPlayer from "vue3-audio-player";
    import "vue3-audio-player/dist/style.css";
    export default {
      name: "App",
      components: { AudioPlayer },
      props: [
        'item'
      ],
      setup(props) {
        const audioOption = ref({
          src: "http://localhost:4000/uploads/"+props.item.file,
          title: "Audio",
          coverImage: "",
        });
        return {
          audioOption,
        };
      },
    };
  </script>
  
  <style>
   .container-audio {
      display: block;
      margin-top: 4px;
      font-size: 16px;
      color: floralwhite;
      padding-top: 8px;
      margin-bottom: 6px;
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
   }
  </style>
  