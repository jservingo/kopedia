<template>
    <div class ="container-unit-page">
        <RouterLink class="link-unit-page" :to="`/guest/page/${page._id}`">{{ page.title }}</RouterLink>
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