<template>
    <div class ="container-fluid container-home">
        <Header :username="info.username"></Header>
        <CourseBox v-for="(course,index) in info.courses" :course="course" :index="index"></CourseBox>
    </div>
</template>

<script setup>
import Header from '@/components/guest/HomeHeader.vue'
import CourseBox from '@/components/guest/HomeCourse.vue'
import { ref, onMounted } from 'vue';
import useHome from '@/composables/guest/useHomeGuest';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';

//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);
//console.log("token",token.value);
const { info, getInfoGuest, getInfoStudent } = useHome()

onMounted(() => {
    if (isAuthenticated.value)
        getInfoStudent(token.value)    
    else
        getInfoGuest()
        
})
</script>

<style>
.container-home {
    display: block;
}
</style>