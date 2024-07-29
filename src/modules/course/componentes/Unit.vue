<template>
    <div class ="container-unit">
        <div>{{ unit.title }}</div>
        <Page v-for="(page,index) in unit.pages" :page="page" :index="index"></Page>
    </div>
</template>

<script setup>
import Page from './Page.vue'
import { defineProps } from 'vue';
defineProps(["unit"]);
</script>

<style>
.container-unit {
    display: block;
    font-size: 17px;
    color:cadetblue;
}
</style>