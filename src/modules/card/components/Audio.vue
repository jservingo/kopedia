<template>
    <div class ="container-audio">
        <div>{{ url }}</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["url"]);
</script>

<style>
.container-audio {
    display: block;
    font-size: 15px;
}
</style>