<template>
    <div class ="container-fluid container-card-header">
        <div>Card {{ card.id }}</div>
        <button @click="$emit('add-item')" class="btn btn-primary">
            Add item
        </button>
        <button @click="$emit('show-clipboard')" class="btn btn-primary">
            Show clipboard
        </button>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["card"]);
</script>

<style>
.container-card-header {
    display: block;
    font-size: 22px;
    color: whitesmoke;
}
</style>