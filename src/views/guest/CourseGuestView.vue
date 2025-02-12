<template>
    <div v-if="course" class ="container-fluid container-course">
        <Header :course="course"
            @suscribirse="handleSuscribirse">
        </Header>
        <Unit v-for="(unit,index) in course.units" :unit="unit" :index="index"
            :display_this="display_this"
            @display-unit="displayUnit">
        </Unit>
    </div>
</template>

<script setup>
import Header from '@/components/guest/CourseHeader.vue'
import Unit from '@/components/guest/CourseUnit.vue'
import { ref, onMounted } from 'vue';
import useCourse from '@/composables/guest/useCourseGuest';
import { useRoute, useRouter } from 'vue-router';
import axios from "axios"
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
import alertify from 'alertifyjs';

let display_this = ref(-1)
//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);
//Get id
const route = useRoute()
const id = ref('');
id.value = route.params.id
//Get course
const { course, getCourse } = useCourse()
//console.log(course)
const router = useRouter()

onMounted(() => {
    getCourse(id.value)
})

const displayUnit = (unit) => {
    display_this.value = unit.id 
}

const handleSuscribirse = (course) => { 
    if (isAuthenticated.value) {
        /*
        axios.get(`http://localhost:4000/api/student/subscription/add/${course.id}`, {
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        */
        axios({
            method: "post",
            url: `http://localhost:4000/api/student/subscription/add`, 
            data: {"id":course.id}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            alertify.error("Ya te suscribistes a este curso");
            router.push(`/student/course/${course.id}/course`)
        })
    }
    else {
  		alertify.error("Please login first");
    }
}  
</script>

<style scoped>
.container-course {
    display: block;
}
</style>