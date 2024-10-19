<template>
    <div class ="container-text">
        <div>{{ item.content }}</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["item"]);
</script>

<style scoped>
.container-text {
    display: block;
    font-size: 15px;
    color: floralwhite;
}
</style>