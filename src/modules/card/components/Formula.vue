<template>
    <div class ="container">
        <div v-html=formula></div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["formula"]);
</script>

<style scoped>
.container {
    display: block;
}
</style>