<template>
    <div class ="container-fluid container-home">
        <Header :username="info.username"></Header>
        <CourseBox v-for="(course,index) in info.courses" :course="course" :index="index"></CourseBox>
    </div>
</template>

<script setup>
import Header from '../modules/home/admin/CourseHeader.vue'
import CourseBox from '../modules/home/admin/CourseAdmin.vue'
import { ref, onMounted } from 'vue';
import useHome from '../composables/useHomeAdmin';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/authStore';

//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);
//console.log(token.value);
const { info, getInfo } = useHome()

onMounted(() => {
    getInfo(token.value)
})
</script>

<style>
.container-home {
    display: block;
}
</style>