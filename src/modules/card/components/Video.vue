<template>
    <div class ="container-video">
        <div>{{ url }}</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["url"]);
</script>

<style>
.container-video {
    display: block;
    font-size: 15px;
}
</style>