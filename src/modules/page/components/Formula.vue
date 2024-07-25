<template>
    <div class ="container">
        <div>{{ formula }}</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["formula"]);
</script>

<style>
.container {
    display: block;
}
</style>