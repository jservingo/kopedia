<template>
    <div class ="container">
        <div>{{ username }}</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["username"]);
</script>

<style>
.container {
    display: block;
}
</style>