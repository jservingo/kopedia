<template>
    <div class ="container-course">
        <div>{{ title }}</div>
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