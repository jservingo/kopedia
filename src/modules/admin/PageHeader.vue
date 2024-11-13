<template>
    <div class ="container-fluid container-page-header">
        <div>{{ page.title }}</div>
        <button @click="$emit('add-card')" class="btn btn-primary">
            Add card
        </button>
        <button @click="$emit('show-clipboard')" class="btn btn-primary">
            Show clipboard
        </button>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["page"]);
</script>

<style>
.container-page-header {
    display: block;
    font-size: 22px;
    color: whitesmoke;
}
</style>