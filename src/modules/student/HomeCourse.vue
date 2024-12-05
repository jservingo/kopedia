<template>
    <div class ="card card-course" :style="{background:bgGradient }">
        <div class="card-body">
            <div class="d-flex">
                <div class ="container-fluid container-home-course-header">
                    <RouterLink class="link-home-course link-underline link-underline-opacity-0" :to="`/student/course/${subscription.id}`">{{ subscription.title }}</RouterLink>
                </div>
                <div class ="container-fluid container-home-course-progress ml-auto">
                    <div class="progress" style="height: 20px;">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>
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
    width: 100%;
    padding-top: 6px;
    padding-bottom: 6px;
    margin-right: 12px;
    margin-bottom: 12px;
}
.card-body {
    padding: 0
}
.link-home-course {
    font-size: 18px;
    color: whitesmoke;
    line-height: 18px !important;
}
.link-home-course:hover {
  color: rgb(30, 30, 255);;
}
.container-home-course-header {
    font-size: 18px;
    color: whitesmoke;
    line-height: 20px !important;
}
.container-home-course-progress { 
    font-size: 14px;
    color: whitesmoke;
    width: 110px;
    padding-left: 0;
}
.bx {
    background-color: rgb(109, 218, 182);
}
</style>