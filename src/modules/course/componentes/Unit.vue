<template>
    <div class ="container">
        <div>{{ unit.title }}</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["unit"]);
</script>

<style>
.container {
    display: block;
}
</style>