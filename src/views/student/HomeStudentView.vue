<template>
    <div class ="container-fluid container-home">
        <Header></Header>
        <LastCard></LastCard>        
    </div>
    <div v-if="infoStudent.subscriptions" class ="container-fluid container-home">
        <CourseBox v-for="(subscription,index) in infoStudent.subscriptions" :subscription="subscription" :index="index"></CourseBox>
    </div>
    <div v-if="infoGuest.courses" class ="container-fluid container-home">
        <UcourseBox v-for="(course,index) in infoGuest.courses" :course="course" :index="index"
            @suscribirse="handleSuscribirse">
        </UcourseBox>
    </div>
</template>

<script setup>
import Header from '@/components/student/HomeHeader.vue'
import CourseBox from '@/components/student/HomeCourse.vue'
import UcourseBox from '@/components/guest/HomeCourse.vue'
import LastCard from '@/components/student/LastCard.vue' 
import useHome from '@/composables/student/useHomeStudent';

import { ref, onMounted } from 'vue';
import axios from "axios"
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
import alertify from 'alertifyjs';

//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);
//console.log(token.value);
const { infoStudent, infoGuest, getInfoStudent, getInfoGuest } = useHome()

onMounted(() => {
    getInfoStudent(token.value)
    getInfoGuest(token.value)
})

const handleSuscribirse = (course) => { 
    if (isAuthenticated.value) {
        /*
        axios.get(`http://localhost:4000/api/student/subscription/add/${course.id}`, {
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        */
        axios({
            method: "post",
            url: `http://localhost:4000/api/student/subscription/add`, 
            data: {"id":course.id}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            //Buscar curso en infoGuest
            const gcourse = infoGuest.value.courses.find(({ id }) => id === course.id);
            //Eliminar curso de de infoGuest
            infoGuest.value.courses = infoGuest.value.courses.filter((loopItem) => loopItem !== gcourse)
            //Agregar curso a infoStudent
            infoStudent.value.subscriptions.push(course)
        })
    }
    else {
  		alertify.error("Please login first");
    }
}    
</script>

<style>
.container-home {
    display: block;
    color:floralwhite;
}
</style>