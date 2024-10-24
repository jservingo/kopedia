<template>
    <div class ="container-audio">
        <AudioPlayer :options="{
            src: 'http://localhost:4000/uploads/GENESIS_DUKE_FULL_ALBUM.mp3',
            title: 'Audio',
            coverImage: '@/assets/audio.png'
        }"/>
        <div>{{ item.file }}</div>
    </div>
</template>

<script setup>
import AudioPlayer from 'vue3-audio-player'
import { defineProps, ref } from 'vue';
const props = defineProps(["item"]);
console.log("http://localhost:4000/uploads/"+props.item.file)

const options = {
    src: "http://localhost:4000/uploads/"+props.item.file,
    title: "Audio",
    coverImage: "@/assets/audio.png"
};
</script>

<style>
.container-audio {
    display: block;
    font-size: 15px;
    color: floralwhite;
}
</style>