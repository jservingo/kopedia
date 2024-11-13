<template>
    <div class ="container-fluid container-unit">
        <div>{{ unit.title }}</div>
        <button @click="$emit('add-page')" class="btn btn-primary">
            Add page
        </button>
        <button @click="$emit('show-clipboard')" class="btn btn-primary">
            Show clipboard
        </button>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
defineProps(["unit"]);
</script>

<style>
.container-unit {
    display: block;
    font-size: 22px;
    color: whitesmoke;
}
</style>