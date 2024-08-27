<template>
    <div class ="container-image">
        <div>{{ url }}</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["url"]);
</script>

<style scoped>
.container-image {
    display: block;
    font-size: 15px;
}
</style>