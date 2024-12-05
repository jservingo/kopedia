<template>
    <div class ="container-header">
        <div class ="container-fluid container-page-header">
            <div>{{ title }} - PageHeader</div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["title"]);
</script>

<style>
.container-header {
    padding-top: 6px;
    padding-bottom: 6px;
}
.container-page-header {
    display: block;
    font-size: 22px;
    color: whitesmoke;
    line-height: 24px !important;
}
</style>