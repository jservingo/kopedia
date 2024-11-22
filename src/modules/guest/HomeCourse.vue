<template>
    <div class ="card card-course" :style="{background:bgGradient }">
        <div class="card-body">
            <div class="d-flex">
                <div class ="container-fluid container-home-course-header">
                    <RouterLink class="link-home-course link-underline link-underline-opacity-0" :to="`/guest/course/${course.id}`">{{ course.title }} - HomeCourse</RouterLink>
                </div>
                <div class ="container-fluid container-home-course-buttons ml-auto">
                    <button class="btn btn-primary" @click="handleSuscribete">
                        Suscríbete
                    </button>
                </div>
            </div>
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
    font-size: 15px;
    color: whitesmoke;
    line-height: 16px !important;
}
.container-home-course-header {
    font-size: 14px;
    color: whitesmoke;
    line-height: 16px !important;
}
.container-home-course-buttons { 
    font-size: 14px;
    color: whitesmoke;
    width: 150px;
}
.btn-edit {
    background-color: #82c591 !important;
    padding: 0;
}
.btn-clipboard {
    background-color: #b8c57d !important;
    padding: 0;
}
.btn-delete {
    background-color: #c57d93 !important;
    padding: 0;
}
</style>