<template>
    <div class ="container">
        <h2>Kopedia home</h2>
        <Header :username="info.username"></Header>
        <CourseBox v-for="course in info.courses" :course="course"></CourseBox>
    </div>
</template>

<script setup>
import Header from './Header.vue'
import CourseBox from './CourseBox.vue'
import { ref, onMounted } from 'vue';
import useHome from '../../../composables/useHome';

const { info, getInfo } = useHome()
onMounted(() => {
    getInfo()
})
</script>

<style>
.container {
    display: block;
}
</style>