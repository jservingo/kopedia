<template>
  <div class ="container-audio" :style="options">
    <div :style="eoptions">
      <audio-player :option="audioOption" />
    </div>
  </div>
</template>
  
<script setup>
import AudioPlayer from "vue3-audio-player";
import "vue3-audio-player/dist/style.css";
import { ref, onMounted, computed} from 'vue';
import useItemOptions from '@/composables/useItemOptions';

const props = defineProps(["item"]);
const { options, eoptions, getItemOptions } = useItemOptions()
const audioOption = ref({
    src: "http://localhost:4000/uploads/"+props.item.file,
    title: "Audio",
    coverImage: "",
})

onMounted(() => {
  getItemOptions(props.item)  
})
</script>

<style>
 .container-audio {
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
  margin-left: 45px;
 }
</style>

