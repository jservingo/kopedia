<template>
    <div class ="container-fluid container-course">
        <div>{{ title }}</div>
        <button @click="handleEditCourse"
            class="btn btn-primary">
            Add unit
        </button>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["title"]);
</script>

<style>
.container-course {
    display: block;
    font-size: 22px;
    color: whitesmoke;
}
</style>