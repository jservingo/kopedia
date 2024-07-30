<template>
    <div class ="container-unit-page">
        <div >{{ page.title }}</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["page"]);
</script>

<style>
.container-unit-page {
    display: block;
    font-size: 15px;
    color: var(--color-text);
}
</style>