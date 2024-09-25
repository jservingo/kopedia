<template>
    <div class ="card card-course" :style="{background:bgGradient }">
        <div class="card-body">
            <RouterLink class="link-course-box link-underline link-underline-opacity-0" :to="`/guest/course/${course.id}`">{{ course.title }}</RouterLink>
            <button class="btn btn-primary" @click="handleSuscribete">
                Suscríbete
            </button>
            CourseGuest
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { defineProps, computed } from 'vue';
import axios from "axios"
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore.js';
import alertify from 'alertifyjs';

const props = defineProps(["course","index"]);
//backgroundColor:bgColor
const bgColors=["#7facab","#bba4a2","#a3ab99","#a8a8b5","#baac7f","#c9b194"]
//Change bgColor
const bgColor = bgColors[props.index % 6]
//Change bgGradient
const bgGradient = computed(() => {
    return `linear-gradient(to right, #676B6A, ${bgColor})`;
})

const store = useAuthStore();
const { isAuthenticated, user, token } = storeToRefs(store);

const handleSuscribete = () => {
    if (isAuthenticated.value) {
        console.log(token.value)
        axios.get(`http://localhost:4000/api/student/subscription/add/${props.course.id}`, {
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            //course.value = response.data.course[0];
        })
    }
    else {
  		alertify.error("Please login first");
    }
};
</script>

<style scoped>
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