<template>
    <div class ="container">
        <Header :title="course.title"></Header>
        <Unit v-for="unit in course.unidades" :unit="unit"></Unit>
    </div>
</template>

<script setup>
import Header from './Header.vue'
import Unit from './Unit.vue'
import { ref, onMounted } from 'vue';
import useCourse from '../../../composables/useCourse';

const { course, getCourse } = useCourse()
onMounted(() => {
    getCourse()
})
</script>

<style>
.container {
    display: block;
}
</style>