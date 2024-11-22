<template>
    <div class ="container-fluid container-unit-page">
        <RouterLink class="link-unit-page link-underline link-underline-opacity-0" :to="`/guest/page/${page.id}`">{{ page.title }} - UnitPage</RouterLink>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { defineProps } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';

defineProps(["page"]);

//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);
</script>

<style>
.container-unit-page {
    display: block;
    padding-bottom: 6px;
}
.link-unit-page {
    font-size: 14px;
    color: floralwhite;
    border-bottom: 0;
    line-height: 15px !important;
}
</style>