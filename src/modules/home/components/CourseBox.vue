<template>
    <div class ="container">
        <div>{{ course.title }}</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["course"]);
</script>

<style>
.container {
    display: block;
}
</style>