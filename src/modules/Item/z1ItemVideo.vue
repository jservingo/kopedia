<template>
    <audio-player :option="audioOption" />
    <div>{{ item.file }}</div>
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
        //src:"https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
        src: "http://localhost:4000/uploads/"+props.item.file,
        title: "Audio",
        coverImage: "@/assets/audio.png",
      });
      return {
        audioOption,
      };
    },
  };
</script>

<style>
 .audio__player-play {
   width: 20px;
   height: 30px;
   position: static !important;
 }

 .audio__player-title {
   display: none;
 }
 </style>
