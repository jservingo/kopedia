<template>
    <div class ="container-audio">
        <div>{{ item.url }}</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["item"]);
</script>

<style>
.container-audio {
    display: block;
    font-size: 15px;
    color: floralwhite;
}
</style>