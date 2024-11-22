<template>
    <div class ="container-header d-flex">
        <div class ="container-fluid container-course-header">
            <span>{{ title }} - CourseHeader</span>
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
defineProps(["title"]);
</script>

<style>
.container-header {
    padding-top: 6px;
    padding-bottom: 6px;
}
.container-course-header {
    font-size: 18px;
    color: whitesmoke;
    line-height: 20px !important;
}
.container-course-buttons { 
    font-size: 14px;
    color: whitesmoke;
    width: 150px;
}
</style>