<template>
    <div class ="card card-course" :style="{background:bgGradient }">
        <div class="card-body">
            <RouterLink class="link-course-box link-underline link-underline-opacity-0" :to="`/student/course/${subscription.id}`">{{ subscription.title }}</RouterLink>
            CourseStudent
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { defineProps, computed } from 'vue';

const props = defineProps(["subscription","index"]);
//backgroundColor:bgColor
const bgColors=["#7facab","#bba4a2","#a3ab99","#a8a8b5","#baac7f","#c9b194"]
//Change bgColor
const bgColor = bgColors[props.index % 6]
//console.log(bgColor)  
//Change bgGradient
const bgGradient = computed(() => {
    return `linear-gradient(to right, #676B6A, ${bgColor})`;
})
</script>

<style>
.card-course {
    display: block;
    float: left;
    width: 260px;
    height: 140px;
    padding: 10px;
    margin-right: 12px;
    margin-bottom: 12px;
}
.card-body {
    padding: 0
}
.link-course-box {
    font-size: 17px;
    color:floralwhite;
    padding-right: 10px;
    border-bottom: 0;
}
.bx {
    background-color: rgb(109, 218, 182);
}
</style>