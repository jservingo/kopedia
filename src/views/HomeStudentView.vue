<template>
    <div class ="container-home">
        <Header :username="info.username"></Header>
        <CourseBox v-for="(subscription,index) in info.subscriptions" :subscription="subscription" :index="index"></CourseBox>
    </div>
</template>

<script setup>
import Header from '../modules/home/student/Header.vue'
import CourseBox from '../modules/home/student/CourseBox.vue'
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
}
</style>