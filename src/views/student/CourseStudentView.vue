<template>
    <div v-if="course" class="container-fluid container-course">
        <Unauthorized v-if="auth_error"></Unauthorized>
        <Header v-else :title="course.title"></Header>
        <Unit v-for="(unit,index) in course.units" :unit="unit" :index="index"
            :display_this="display_this"
            @display-unit="displayUnit">
        </Unit>       
    </div>
</template>

<script setup>
import Header from '@/components/student/CourseHeader.vue'
import Unit from '@/components/student/CourseUnit.vue'
import Unauthorized from '@/components/UnauthorizedUser.vue'
import useCourse from '@/composables/student/useCourseStudent';

import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';

let display_this = ref(-1)
//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);
//Get id
const route = useRoute()
const id = ref('');
id.value = route.params.id
//Get course
const { course, auth_error, getCourse } = useCourse()
//console.log(token.value)
//console.log(course)

onMounted(() => {
    getCourse(token.value, id.value)
})

const displayUnit = (unit) => {
    display_this.value = unit.id 
}
</script>

<style scoped>
.container-course {
    display: block;
}
</style>