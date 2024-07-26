<template>
    <div class ="container">
        <div>{{ title }}</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["title"]);
</script>

<style>
.container {
    display: block;
}
</style>