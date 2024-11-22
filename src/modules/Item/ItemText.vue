<template>
    <div class="container-text">
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
    font-size: 14px;
    color: floralwhite;
    line-height: 16px !important;
    margin-bottom: 4px;
}
</style>