<template>
    <div class ="container-course-box" :style="{background:bgGradient }">
        <RouterLink class="link-course-box" :to="`/student/course/${subscription.course._id}`">{{ subscription.course.title }}</RouterLink>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { defineProps, computed } from 'vue';
const props = defineProps(["subscription","index"]);
//Change bgColor
//backgroundColor:bgColor
const bgColors=["#7facab","#bba4a2","#a3ab99","#a8a8b5","#baac7f","#c9b194"]
const bgColor = bgColors[props.index % 6]
//console.log(bgColor)  
//Change bgGradient
const bgGradient = computed(() => {
    return `linear-gradient(to right, #676B6A, ${bgColor})`;
})
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore.js';
const store = useAuthStore();
const { isAuthenticated, user } = storeToRefs(store);
</script>

<style>
.container-course-box {
    display: block;
    float: left;
    width: 260px;
    height: 140px;
    padding: 10px;
    margin-right: 12px;
    margin-bottom: 12px;
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