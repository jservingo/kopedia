<template>
    <div class ="container-course">
        <Header :title="course.title"></Header>
        <Unit v-for="(unit,index) in course.unidades" :unit="unit" :index="index"></Unit>
    </div>
</template>

<script setup>
import Header from './Header.vue'
import Unit from '../../unit/components/Unit.vue'
import { ref, onMounted } from 'vue';
import useCourse from '../../../composables/useCourse';

const { course, getCourse } = useCourse()
onMounted(() => {
    getCourse()
})
</script>

<style>
.container-course {
    display: block;
}
</style>