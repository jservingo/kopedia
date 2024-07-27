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
import { ref } from 'vue';

const info = ref({
    id: 1,
    username: 'demo',
    courses: [
        {
            id: 1,
            title: 'Matematicas - Curso de Prueba',        
        }, 
        {
            id: 2,
            title: 'Ingles - Curso de Prueba',
        }, 
    ]
})
</script>

<style>
.container {
    display: block;
}
</style>