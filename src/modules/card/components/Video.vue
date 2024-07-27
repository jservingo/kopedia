<template>
    <div class ="container">
        <div>{{ url }}</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["url"]);
</script>

<style scoped>
.container {
    display: block;
}
</style>