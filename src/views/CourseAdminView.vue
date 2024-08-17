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
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/authStore';

//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);
//Get id
const route = useRoute()
const id = ref('');
id.value = route.params.id
//console.log("Course id:", id.value);
//Get course
const { course, getCourse } = useCourse()

onMounted(() => {
    getCourse(token.value, id.value)
})
</script>

<style scoped>
.container-course {
    display: block;
}
</style>