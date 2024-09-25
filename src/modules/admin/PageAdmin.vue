<template>
    <div class ="container-fluid container-unit-page">
        <RouterLink class="link-unit-page link-underline link-underline-opacity-0" :to="`/admin/page/${page.id}`">{{ page.title }}</RouterLink>
        <button @click="handleEditPage"
            class="btn">
            Edit
        </button>
        <button @click="handleDeletePage"
            class="btn">
            Delete
        </button>
        PageAdmin
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