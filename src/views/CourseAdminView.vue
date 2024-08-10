<template>
    <div class ="container-course">
        <Header :title="course.title"></Header>
        <Unit v-for="(unit,index) in course.units" :unit="unit" :index="index"></Unit>
    </div>
</template>

<script setup>
import Header from '../modules/course/admin/Header.vue'
import Unit from '../modules/unit/admin/Unit.vue'
import { ref, onMounted } from 'vue';
import useCourse from '../composables/useCourseAdmin';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const store = useAuthStore()
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