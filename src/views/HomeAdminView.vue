<template>
    <div class ="container-home">
        <Header :username="info.username"></Header>
        <CourseBox v-for="(course,index) in info.courses" :course="course" :index="index"></CourseBox>
    </div>
</template>

<script setup>
import Header from '../modules/home/admin/Header.vue'
import CourseBox from '../modules/home/admin/CourseBox.vue'
import { ref, onMounted } from 'vue';
import useHome from '../composables/useHomeAdmin';
import { useAuthStore } from '../stores/authStore';

const store = useAuthStore()

const { info, getInfo } = useHome()
onMounted(() => {
    getInfo()
})
</script>

<style>
.container-home {
    display: block;
}
</style>