<template>
    <div class ="container">
        <div>{{ page.title }}</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["page"]);
</script>

<style>
.container {
    display: block;
}
</style>