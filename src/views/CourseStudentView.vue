<template>
    <div v-if="course" class="container-fluid container-course">
        <Header :title="course.title"></Header>
        <Unit v-for="(unit,index) in course.units" :unit="unit" :index="index"></Unit>        
    </div>
</template>

<script setup>
import Header from '../modules/student/CourseHeader.vue'
import Unit from '../modules/student/UnitStudent.vue'
import { ref, onMounted, computed } from 'vue';
import useCourse from '../composables/useCourseStudent';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/authStore';

//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);
//Get id
const route = useRoute()
const id = ref('');
id.value = route.params.id
//Get course
const { course, getCourse } = useCourse()
//console.log(token.value)
//console.log(course)

onMounted(() => {
    getCourse(token.value, id.value)
})
</script>

<style scoped>
.container-course {
    display: block;
}
</style>