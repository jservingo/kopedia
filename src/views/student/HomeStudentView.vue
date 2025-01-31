<template>
    <div class ="container-fluid container-home">
        <Header></Header>
        <LastCard></LastCard>        
    </div>
    <div v-if="infoStudent.subscriptions" class ="container-fluid container-home">
        <CourseBox v-for="(subscription,index) in infoStudent.subscriptions" :subscription="subscription" :index="index"></CourseBox>
    </div>
    <div v-if="infoGuest.courses" class ="container-fluid container-home">
        <UcourseBox v-for="(course,index) in infoGuest.courses" :course="course" :index="index"></UcourseBox>
    </div>
</template>

<script setup>
import Header from '@/modules/student/HomeHeader.vue'
import CourseBox from '@/modules/student/HomeCourse.vue'
import UcourseBox from '@/modules/guest/HomeCourse.vue'
import LastCard from '@/modules/student/LastCard.vue' 
import { ref, onMounted } from 'vue';
import useHome from '@/composables/student/useHomeStudent';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';

//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);
//console.log(token.value);
const { infoStudent, infoGuest, getInfoStudent, getInfoGuest } = useHome()

onMounted(() => {
    getInfoStudent(token.value)
    getInfoGuest(token.value)
})
</script>

<style>
.container-home {
    display: block;
    color:floralwhite;
}
</style>