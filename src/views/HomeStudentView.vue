<template>
    <div v-if="info.subscriptions" class ="container-fluid container-home">
        <Header></Header>
        <CourseBox v-for="(subscription,index) in info.subscriptions" :subscription="subscription" :index="index"></CourseBox>
    </div>
</template>

<script setup>
import Header from '../modules/student/HomeHeader.vue'
import CourseBox from '../modules/student/HomeCourse.vue'
import { ref, onMounted } from 'vue';
import useHome from '../composables/useHomeStudent';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/authStore';

//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);
//console.log(token.value);
const { info, getInfo } = useHome()

onMounted(() => {
    getInfo(token.value)
})
</script>

<style>
.container-home {
    display: block;
    color:floralwhite;
}
</style>