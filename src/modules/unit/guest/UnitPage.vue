<template>
    <div class ="container-fluid container-unit-page">
        <RouterLink class="link-unit-page link-underline link-underline-opacity-0" :to="`/guest/page/${page.id}`">{{ page.title }}</RouterLink>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { defineProps } from 'vue';
defineProps(["page"]);
</script>

<style>
.container-unit-page {
    display: block;
}
.link-unit-page {
    font-size: 15px;
    color: floralwhite;
    border-bottom: 0;
}
</style>