<template>
    <div class ="container-header d-flex">
        <div class ="container-fluid container-course-header">
            <span>{{ course.title }}</span>
        </div>
        <div class ="container-fluid container-course-buttons ml-auto">
            <button class="btn btn-primary" @click="handleSuscribete">
                Suscríbete
            </button>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore.js';
import alertify from 'alertifyjs';

const emit = defineEmits(['suscribirse']) 
const props = defineProps(["course"]);
const store = useAuthStore();
const { isAuthenticated, user, token } = storeToRefs(store);

const handleSuscribete = () => {
    if (isAuthenticated.value) {
        emit("suscribirse",props.course)
    }
    else {
  		alertify.error("Please login first");
    }    
}
</script>

<style>
.container-header {
    padding-top: 6px;
    padding-bottom: 6px;
}
.container-course-header {
    font-size: 22px;
    color: whitesmoke;
    line-height: 24px !important;
}
.container-course-buttons { 
    font-size: 14px;
    color: whitesmoke;
    width: 150px;
}
</style>