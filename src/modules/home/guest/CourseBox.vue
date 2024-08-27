<template>
    <div class ="container-course-box" :style="{background:bgGradient }">
        <RouterLink class="link-course-box" :to="`/guest/course/${course._id}`">{{ course.title }}</RouterLink>
        <button @click="handleSuscribete"
            class="block rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700">
            Suscríbete
        </button>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { defineProps, computed } from 'vue';
import axios from "axios"
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
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore.js';
const store = useAuthStore();
const { isAuthenticated, user, token } = storeToRefs(store);
const handleSuscribete = () => {
    console.log(token.value)
    axios.get(`http://localhost:4000/api/student/subscriber/add/${props.course._id}`, {
        headers: {
            'Authorization': `Bearer ${token.value}`
        }
    })
    .then(response => {
        course.value = response.data.course[0];
    })
};
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