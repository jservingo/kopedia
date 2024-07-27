<template>
    <div class ="container">
        <div>{{ text }}</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["text"]);
</script>

<style scoped>
.container {
    display: block;
}
</style>