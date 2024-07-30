<template>
    <div class ="container-course-box" :style="{background:bgGradient }">
        <div>{{ course.title }}</div>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
const props = defineProps(["course","index"]);
//Change bgColor
//backgroundColor:bgColor
const bgColors=["#7facab","#bba4a2","#a3ab99","#a8a8b5","#baac7f","#c9b194"]
const bgColor = bgColors[props.index % 6]
//console.log(bgColor)  
//Change bgGradient
const bgGradient = computed(() => {
    return `linear-gradient(to right, #676B6A, ${bgColor})`;
})
</script>

<style>
.container-course-box {
    display: block;
    font-size: 17px;
    color:floralwhite;
    width: 280px;
    height: 140px;
    padding: 10px;
    margin-right: 12px;
    margin-bottom: 12px;
}
</style>