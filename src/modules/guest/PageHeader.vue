<template>
    <div class ="container-fluid container-page-header">
        <div>{{ title }} </div>
    </div>
    PageHeader
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["title"]);
</script>

<style>
.container-page-header {
    display: block;
    font-size: 22px;
    color: whitesmoke;
}
</style>