<template>
    <div class ="container-fluid container-unit-page">
        <RouterLink class="link-unit-page link-underline link-underline-opacity-0" :to="`/guest/page/${titleSlug}/${page.id}`">{{ page.title }} - UnitPage</RouterLink>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { defineProps, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
import slugify from '@sindresorhus/slugify';

const props = defineProps(["page"]);

//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);
const titleSlug = computed(() => { return slugify(props.page.title)})
</script>

<style>
.container-unit-page {
    display: block;
    padding-bottom: 6px;
}
.link-unit-page {
    font-size: 18px;
    color: floralwhite;
    border-bottom: 0;
    line-height: 20px !important;
}
.link-unit-page:hover {
  color: rgb(30, 30, 255);;
}
</style>