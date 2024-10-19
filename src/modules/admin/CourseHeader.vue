<template>
    <div class ="container-fluid container-course">
        <div>{{ course.title }}</div>
        <button @click="$emit('add-unit')" class="btn btn-primary">
            Add unit
        </button>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["course"]);
</script>

<style>
.container-course {
    display: block;
    font-size: 22px;
    color: whitesmoke;
}
</style>