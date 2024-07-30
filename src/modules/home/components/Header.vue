<template>
    <div class ="container-home-header">
        <div>Kopedia: {{ username }}</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["username"]);
</script>

<style>
.container-home-header {
    display: block;
    font-size: 22px;
    color: whitesmoke;
}
</style>