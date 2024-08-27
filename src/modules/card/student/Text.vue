<template>
    <div class ="container-text">
        <div>{{ text }}</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["text"]);
</script>

<style scoped>
.container-text {
    display: block;
    font-size: 15px;
}
</style>