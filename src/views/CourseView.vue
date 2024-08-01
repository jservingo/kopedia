<template>
    <div class ="container-course">
        <Header :title="course.title"></Header>
        <Unit v-for="(unit,index) in course.unidades" :unit="unit" :index="index"></Unit>
    </div>
</template>

<script setup>
import Header from '../modules/course/componentes/Header.vue'
import Unit from '../modules/unit/components/Unit.vue'
import { ref, onMounted } from 'vue';
import useCourse from '../composables/useCourse';
import { useRoute } from 'vue-router';
//Get id
const route = useRoute()
const id = ref(route.params.id);
//Get course
const { course, getCourse } = useCourse()
onMounted(() => {
    getCourse()
})
</script>

<style scoped>
.container-course {
    display: block;
}
</style>