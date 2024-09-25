<template>
    <div class ="container-text">
        <div>{{ text }}</div>
        <button @click="handleEditCard"
            class="btn">
            Edit
        </button>
        <button @click="handleDeleteCard"
            class="btn">
            Delete
        </button>
        ItemText
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["text"]);
</script>

<style scoped>
.container-text {
    display: block;
    font-size: 15px;
}
</style>